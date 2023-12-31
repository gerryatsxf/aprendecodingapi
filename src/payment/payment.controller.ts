import {
  Controller,
  Post,
  Req,
  Res,
  RawBodyRequest,
  Response,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/success')
  paymentSuccess(
    @Req() request: RawBodyRequest<Request>,
    @Res() response: Response,
  ) {
    const stripeSignature = request.headers['stripe-signature'];
    const endpointSecret =
      process.env.STRIPE_PAYMENT_SUCCESS_WEBHOOK_SECRET_KEY;

    return this.paymentService.paymentSuccess(
      request,
      stripeSignature,
      endpointSecret,
      response,
    );
  }
}
