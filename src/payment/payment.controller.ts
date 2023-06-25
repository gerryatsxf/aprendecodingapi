import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, RawBodyRequest } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }


  @Post('/success')
  paymentSuccess(
    @Req() request: RawBodyRequest<Request>,
    @Res() response: Response,
    @Body() paymentPayload: CreatePaymentDto) {

    const stripeSignature = request.headers['stripe-signature'];
    //const stripeSignature = 'sdfs'
    // @ts-ignore
    const endpointSecret = process.env.STRIPE_PAYMENT_SUCCESS_WEBHOOK_SECRET_KEY
    console.log({stripeSignature})
    console.log({endpointSecret})

    return this.paymentService.paymentSuccess(request.rawBody, stripeSignature, endpointSecret, response)
    
  }



  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
