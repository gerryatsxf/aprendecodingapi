import { Injectable } from '@nestjs/common';
import { AddToCartRequestDto } from './dto/add-to-cart-request.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ProductService } from 'src/product/product.service';
import { CreateCheckoutSessionRequestDto } from './dto/create-checkout-session-request.dto';

@Injectable()
export class CheckoutSessionService {

    constructor(
        private readonly httpService: HttpService,
        private readonly productService: ProductService
      ) {}
  async createCheckoutSession(request: CreateCheckoutSessionRequestDto) {

    const headersRequest = {
        'Content-Type': 'application/json', // afaik this one is not needed
        'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
    };



    const payload = {
        // success_url: 'https://example.com/success',
        line_items: [
          {price: `price_H5ggYwtDq4fbrJ`, quantity: 2},
        ],
        mode: 'payment',
      }
      const { data } = await firstValueFrom(
        this.httpService.post(`${process.env.STRIPE_API_URL}/v1/checkout/sessions`, { headers: headersRequest, body: payload }).pipe(
          catchError((error: AxiosError) => {
            console.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
      );

    return data;
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  // update(id: number, updateCartDto: UpdateCartDto) {
  //   return `This action updates a #${id} cart`;
  // }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
