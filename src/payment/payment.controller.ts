import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, RawBodyRequest } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/success')
  paymentSuccess(
    @Req() request: RawBodyRequest<Request>,
    @Res() response: Response) {

    const stripeSignature = request.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_PAYMENT_SUCCESS_WEBHOOK_SECRET_KEY

    return this.paymentService.paymentSuccess(request.rawBody, stripeSignature, endpointSecret, response)
    
  }

}
