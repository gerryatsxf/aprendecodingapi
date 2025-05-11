import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import 'dotenv/config';
import * as path from 'path';
import { FreeSlotService } from '../free-slot/free-slot.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBooking } from './entities/booking.interface';
import CreateBookingResponseDto from './dto/create-booking.response';
import CreateBookingRequestDto from './dto/create-booking-request.dto';
import { ISession } from '../session/entities/session.interface';
import { SessionService } from '../session/session.service';
import { UpdateSessionRequestDto } from '../session/dto/update-session-request.dto';
import { EncryptionService } from '../encryption/encryption.service';
import { sha512 } from 'hash36';
import { GuestFreeSlotDto } from '../availability/dto/guest-free-slot.dto';
import { PaymentStatusEnum } from '../payment/payment-status.enum';
import { GetBookingStatusResponse } from './dto/get-booking-status-response';

@Injectable()
export class BookingService {
  constructor(
    private readonly httpService: HttpService,
    private readonly freeSlotService: FreeSlotService,
    private readonly sessionService: SessionService,
    private readonly encryptionService: EncryptionService,
    @InjectModel('Booking') private readonly bookingModel: Model<IBooking>,
  ) {}

  async requestBooking(
    bookRequest: CreateBookingRequestDto,
    sessionInfo: ISession,
  ): Promise<CreateBookingResponseDto> {
    // Check if booking is valid
    await this.runBookingValidations(bookRequest, sessionInfo);

    // Store booking in DB
    const { paymentExpirationTime, booking } = await this.saveBooking(
      bookRequest,
      sessionInfo,
    );

    // Generate client reference id and payment link
    const { paymentLink, clientReferenceId } =
      this.getPaymentUtils(sessionInfo);

    // Update session with relevant booking data
    await this.updateAssociatedSession(sessionInfo, clientReferenceId);

    const bookingResponse = new CreateBookingResponseDto();
    bookingResponse.bookingReservationExpiresTimestamp =
      booking.paymentExpirationTimestamp;
    bookingResponse.paymentLink = paymentLink;
    bookingResponse.bookingReservationDuration = paymentExpirationTime;
    return bookingResponse;
  }

  async updateAssociatedSession(
    sessionInfo: ISession,
    clientReferenceId: string,
  ): Promise<void> {
    const updateSession = new UpdateSessionRequestDto();
    updateSession.status = 'processing';
    updateSession.processingTimestamp = new Date().getTime();
    updateSession.clientReferenceId = clientReferenceId;
    await this.sessionService.update(sessionInfo.id, updateSession);
  }

  async getBookingBySessionId(sessionId: string): Promise<IBooking> {
    const booking = await this.bookingModel.findOne({ sessionId });
    if (!booking) {
      throw new BadRequestException('Booking not found');
    }
    return booking;
  }

  async runBookingValidations(
    bookRequest: CreateBookingRequestDto,
    sessionInfo: ISession,
  ) {
    // Check if slot is not free
    const freeSlotsData = await this.freeSlotService.getFreeSlots();
    const isSlotFree = freeSlotsData.freeSlots.some(
      (slot: GuestFreeSlotDto) =>
        slot.meetingStartTime === bookRequest.timestamp,
    );
    if (!isSlotFree) {
      // REJECT if slot is not free
      throw new BadRequestException(
        'Time slot is already busy at requested time',
      );
    }

    // Check if valid booking exists already for requested time
    const booking: IBooking = await this.bookingModel.findOne({
      bookingStartTimestamp: bookRequest.timestamp,
    });

    if (booking && booking.status == PaymentStatusEnum.Paid) {
      // REJECT if found booking is paid
      throw new BadRequestException(
        'Confirmed booking already exists at requested time slot',
      );
    } else if (booking && booking.status == PaymentStatusEnum.Pending) {
      if (booking.paymentExpirationTimestamp <= new Date().getTime()) {
        // REJECT if found booking is still waiting for payment
        throw new BadRequestException(
          'Pending booking already exists at requested time slot',
        );
      } else {
        // Don't reject if found booking expiration time is overdue, and update its status to stale
        await this.bookingModel.findByIdAndUpdate(booking.id, {
          status: PaymentStatusEnum.Stale,
        });
        // Update session status of found stale booking
        await this.sessionService
          .findOne(booking.sessionId)
          .then(async (session) => {
            const updateSession = new UpdateSessionRequestDto();
            updateSession.status = 'processed';
            await this.sessionService.update(session.id, updateSession);
          });
      }
    }

    // Check session status
    if (sessionInfo.status !== 'lead') {
      // REJECT if customer/session is not a lead
      throw new BadRequestException('Customer is no longer a lead');
    }
  }

  async saveBooking(
    bookRequest: CreateBookingRequestDto,
    sessionInfo: ISession,
  ) {
    const meetingDurationTime = 50 * 60; // 50 minutes in seconds
    const paymentExpirationTime = 5 * 60; // 5 minutes in seconds
    const newBooking: Partial<IBooking> = {
      meetingStartTimestamp: bookRequest.timestamp,
      meetingEndTimestamp: bookRequest.timestamp + meetingDurationTime,
      sessionId: sessionInfo.id,
      status: PaymentStatusEnum.Pending,
      type: bookRequest.type,
      paymentExpirationTimestamp:
        Math.ceil(new Date().getTime() / 1000) + paymentExpirationTime,
      guestTimezone: sessionInfo.timezone,
    };
    const booking = new this.bookingModel(newBooking);
    await booking.save();

    return { meetingDurationTime, paymentExpirationTime, booking };
  }

  getPaymentUtils(sessionInfo: ISession) {
    const clientReferenceId = sha512(sessionInfo.id);
    const stripeLinkTest = 'https://buy.stripe.com/test_14k3eK7Px9Xl3YYeUU';
    // const stripeLinkProd = 'https://buy.stripe.com/9AQeYIcUO4Wl3YYeUW';
    return {
      paymentLink: new URL(
        path.join(`?client_reference_id=${clientReferenceId}`),
        stripeLinkTest,
      ).toString(),
      clientReferenceId,
    };
  }

  async getBookingStatus(sessionInfo: ISession) {
    const sessionId = sessionInfo.id;
    console.log(sessionInfo)
    let booking: IBooking = await this.getBookingBySessionId(sessionId);
    if (!booking) {
      throw new BadRequestException('Booking not found');
    }
    if (booking.status == PaymentStatusEnum.Pending) {
      if (
        booking.paymentExpirationTimestamp <
        Math.floor(new Date().getTime() / 1000)
      ) {
        booking = await this.bookingModel.findByIdAndUpdate(
          booking.id,
          {
            status: PaymentStatusEnum.Stale,
          },
          { new: true },
        );
      }
    }

    const response = {} as GetBookingStatusResponse;
    response.bookingStatus = booking.status;
    response.sessionStatus = sessionInfo.status;
    return response;
  }

  async updateBookingStatus(bookingId: string, status: string) {
    return this.bookingModel.findByIdAndUpdate(bookingId, { status: status });
  }
}
