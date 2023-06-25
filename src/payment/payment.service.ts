import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import Stripe from 'stripe';
import 'dotenv/config'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});


@Injectable()
export class PaymentService {
  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  async paymentSuccess(body, stripeSignature, endpointSecret, response){
    let event;
    //const strBody = JSON.stringify(body)
    const strBody = JSON.stringify(body)
    console.log({body})
    try {
      event = stripe.webhooks.constructEvent(strBody, stripeSignature, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        console.log(paymentIntentSucceeded)
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    response.send(200);
  }

  findAll() {
    return stripe.paymentIntents.list()
    
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
