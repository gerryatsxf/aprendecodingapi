import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import Stripe from 'stripe';
import 'dotenv/config'
import { NotificationService } from 'src/notification/notification.service';
import { SendNotificationRequestDto } from 'src/notification/dto/send-notification-request.dto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});


@Injectable()
export class PaymentService {

  constructor(
    private notificationService: NotificationService
  ){}

  async paymentSuccess(request, stripeSignature, endpointSecret, response){

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.rawBody, stripeSignature, endpointSecret);
    } catch (err) {
      response.sendStatus(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    switch (event.type) {

      case 'checkout.session.completed':
        const sessionCompleted = event.data.object;
        console.log({sessionCompleted})
        const customerEmail = sessionCompleted.customer_details.email
        //const customerName = sessionCompleted.customer_details.name
        const notificationRequest = new SendNotificationRequestDto
        notificationRequest.email = customerEmail
        notificationRequest.guestName = 'My Fren'
        this.notificationService.sendNotification(notificationRequest)
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    response.sendStatus(200);
  }

}
