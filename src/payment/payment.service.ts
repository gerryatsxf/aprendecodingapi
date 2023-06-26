import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import Stripe from 'stripe';
import 'dotenv/config'
import { NotificationService } from 'src/notification/notification.service';

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
    console.log(request.body)

    try {
      event = stripe.webhooks.constructEvent(request.rawBody, stripeSignature, endpointSecret);
    } catch (err) {
      response.sendStatus(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    // let intent
    // try {
    //   const paymentIntentId = event.data.object.id
    //   console.log({paymentIntentId})
    //   intent = await stripe.paymentIntents.retrieve(event.data.object.id)
    //   console.log({intent})

    // } catch (err){
    //   response.sendStatus(400).send(`SDK Call Error: ${err.message}`);
    //   return;  
    // }
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        break;

      case 'checkout.session.async_payment_succeeded':
        const asyncPaymentSucceeded = event.data.object;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    response.sendStatus(200);
  }

}
