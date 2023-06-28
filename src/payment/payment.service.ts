import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import Stripe from 'stripe';
import 'dotenv/config'
import { NotificationService } from 'src/notification/notification.service';
import { CreateNotificationDto } from 'src/notification/dto/create-notification.dto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});


@Injectable()
export class PaymentService {

  constructor(
    private notificationService: NotificationService
  ){}

  async paymentSuccess(request, stripeSignature, endpointSecret, response){
    const createNotification = new CreateNotificationDto

    createNotification.email = 'test.lps.emails@gmail.com'
    const nylasres = await this.notificationService.create(createNotification)


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
        const customerEmail = sessionCompleted.customer_details.email
        const createNotification = new CreateNotificationDto
        createNotification.email = customerEmail
        const nylasres = await this.notificationService.create(createNotification)
        console.log(nylasres)
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    response.sendStatus(200);
  }

}
