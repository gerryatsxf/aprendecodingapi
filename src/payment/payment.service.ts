import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import 'dotenv/config';
import { NotificationService } from 'src/notification/notification.service';
import { SendNotificationRequestDto } from 'src/notification/dto/send-notification-request.dto';
import { plainToInstance } from 'class-transformer';
import { StripeSessionCompletedDto } from './dto/stripe-session-completed.dto';
import { MeetingService } from '../meeting/meeting.service';
import { BookingService } from '../booking/booking.service';
import CreateMeetingRequestDto from '../meeting/dto/create-meeting-request.dto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

@Injectable()
export class PaymentService {
  constructor(
    private notificationService: NotificationService,
    private readonly bookingService: BookingService,
    private readonly meetingService: MeetingService,
  ) {}

  async paymentSuccess(
    request,
    stripeSignature,
    endpointSecret,
    response,
    sessionInfo,
  ) {
    // make sure this event was sent from Stripe
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        request.rawBody,
        stripeSignature,
        endpointSecret,
      );
    } catch (err) {
      response.sendStatus(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the checkout.session.completed event
    switch (event.type) {
      case 'checkout.session.completed':
        // Search for booking reservation in DB
        const booking = await this.bookingService.getBookingBySessionId(
          sessionInfo.id,
        );
        if (!booking) {
          response.sendStatus(400).send(`Booking not found`);
          return;
        }

        // Create meeting
        const createMeeting = new CreateMeetingRequestDto();
        createMeeting.timestamp = booking.meetingStartTimestamp;
        // createMeeting.type = customerEmail;
        // createMeeting.displayName = customerEmail;
        // const meeting = await this.meetingService.createMeeting();

        // Send notification to guest
        const stripeSessionCompleted = plainToInstance(
          StripeSessionCompletedDto,
          event.data.object,
        );
        const customerEmail = stripeSessionCompleted.customer_details.email;
        const notificationRequest = new SendNotificationRequestDto();
        notificationRequest.email = customerEmail;
        notificationRequest.guestName =
          stripeSessionCompleted.customer_details.name;

        await this.notificationService.sendNotification(
          notificationRequest,
          {} as any,
        );
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    response.sendStatus(200);
  }
}
