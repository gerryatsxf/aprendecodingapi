import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMeetingResultDto } from './dto/create-meeting-result.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map, tap } from 'rxjs';
import { plainToClass } from 'class-transformer';
import 'dotenv/config';
import * as path from 'path';
import { FreeSlotService } from '../free-slot/free-slot.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMeeting } from './entities/meeting.interface';
import CreateBookingResponseDto from './dto/create-booking.response';
import CreateBookingRequestDto from './dto/create-booking-request.dto';
import CreateMeetingRequestDto from './dto/create-meeting-request.dto';
import { ISession } from '../session/entities/session.interface';
import { SessionService } from '../session/session.service';
import { UpdateSessionRequestDto } from '../session/dto/update-session-request.dto';
import { JwtService } from '@nestjs/jwt';
import { EncryptionService } from '../encryption/encryption.service';
import { sha512 } from 'hash36';

@Injectable()
export class MeetingService {
  constructor(
    private readonly httpService: HttpService,
    private readonly freeSlotService: FreeSlotService,
    private readonly sessionService: SessionService,
    private readonly encryptionService: EncryptionService,
    @InjectModel('meeting') private readonly meetingModel: Model<IMeeting>,
  ) {}

  async requestBooking(
    bookRequest: CreateBookingRequestDto,
    sessionInfo: ISession,
  ): Promise<CreateBookingResponseDto> {
    // Check if slot is free
    const freeSlotsData = await this.freeSlotService.getFreeSlots();
    const isSlotFree = freeSlotsData.freeSlots.some(
      (slot) => slot.meetingStartTime === bookRequest.timestamp,
    );
    if (!isSlotFree) {
      throw new Error('Slot is not free');
    }

    // Check if slot hasn't been reserved by someone else
    const reserved = await this.meetingModel.findOne({
      meetingStartTimestamp: bookRequest.timestamp,
    });
    if (reserved) {
      throw new BadRequestException('Slot has been reserved by someone else');
    }

    // Check session status
    console.log(sessionInfo);
    if (sessionInfo.status !== 'lead') {
      throw new BadRequestException('Customer is no longer a lead');
    }

    // Store meeting in DB
    const meetingDuration = 50 * 60; // 50 minutes in seconds
    const bookingReservationTime = 5 * 60; // 5 minutes in seconds
    const newMeeting: Partial<IMeeting> = {
      meetingStartTimestamp: bookRequest.timestamp,
      meetingEndTimestamp: bookRequest.timestamp + meetingDuration,
      sessionId: sessionInfo.id,
      status: 'pending',
      type: bookRequest.type,
      bookingReservationExpiresTimestamp:
        Math.floor(new Date().getTime() / 1000) + bookingReservationTime,
      guestTimezone: sessionInfo.timezone,
    };
    const meeting = new this.meetingModel(newMeeting);
    await meeting.save();

    // Generate client reference id and payment link
    const clientReferenceId = sha512(sessionInfo.id);
    const stripeLinkTest = 'https://buy.stripe.com/test_14k3eK7Px9Xl3YYeUU';
    // const stripeLinkProd = 'https://buy.stripe.com/9AQeYIcUO4Wl3YYeUW';
    const paymentLink = new URL(
      path.join(`?client_reference_id=${clientReferenceId}`),
      stripeLinkTest,
    ).toString();

    // Update session status
    const updateSession = new UpdateSessionRequestDto();
    updateSession.status = 'processing';
    updateSession.processingTimestamp = new Date().getTime();
    updateSession.clientReferenceId = clientReferenceId;
    await this.sessionService.update(sessionInfo.id, updateSession);

    const bookingResponse = new CreateBookingResponseDto();
    bookingResponse.bookingReservationExpiresTimestamp =
      meeting.bookingReservationExpiresTimestamp;
    bookingResponse.paymentLink = paymentLink;
    bookingResponse.bookingReservationDuration = bookingReservationTime;
    return bookingResponse;
  }

  async getMeetingStatus(meetingId: string): Promise<string> {
    const meeting = await this.meetingModel.findById(meetingId);
    if (!meeting) {
      throw new BadRequestException('Meeting not found');
    }
    return meeting.status;
  }
  async getMeetingBySessionId(sessionId: string): Promise<IMeeting> {
    const meeting = await this.meetingModel.findOne({ sessionId });
    if (!meeting) {
      throw new BadRequestException('Meeting not found');
    }
    return meeting;
  }
  async createMeeting(
    meetingRequest: CreateMeetingRequestDto,
  ): Promise<CreateMeetingResultDto> {
    const BASE_URL = process.env.VONAGE_API_BASE_URL;
    const headersRequest = {
      Authorization: `Bearer ${process.env.VONAGE_JWT_365_DAYS}`,
    };
    return firstValueFrom(
      this.httpService
        .post(
          path.join(BASE_URL, 'meetings/rooms'),
          { display_name: meetingRequest.displayName },
          { headers: headersRequest },
        )
        .pipe(
          tap((resp) => console.log(resp)),
          map((resp) => plainToClass(CreateMeetingResultDto, resp.data)),
          tap((data) => console.log(data)),
        ),
    );
  }
}
