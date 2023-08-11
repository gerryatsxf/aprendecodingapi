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
import { SessionInfo } from "../session/decorators/session-info.decorator";

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/success')
  paymentSuccess(
    @Req() request: RawBodyRequest<Request>,
    @Res() response: Response,
    @SessionInfo() sessionInfo,
  ) {
    const stripeSignature = request.headers['stripe-signature'];
    const endpointSecret =
      process.env.STRIPE_PAYMENT_SUCCESS_WEBHOOK_SECRET_KEY;

    return this.paymentService.paymentSuccess(
      request,
      stripeSignature,
      endpointSecret,
      response,
      sessionInfo,
    );
  }
}
