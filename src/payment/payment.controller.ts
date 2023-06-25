import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
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
    @Req() request: Request,
    @Res() response: Response,
    @Body() paymentPayload: CreatePaymentDto) {

    const stripeSignature = request.headers['stripe-signature'];
    //const stripeSignature = 'sdfs'
    // @ts-ignore
    const endpointSecret = paymentPayload.data.object.client_secret
    console.log(stripeSignature)
    console.log(endpointSecret)

    return this.paymentService.paymentSuccess(stripeSignature, paymentPayload, endpointSecret, response)
    
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
