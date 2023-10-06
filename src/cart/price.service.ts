import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
@Injectable()
export class PriceService {
  constructor(
    private readonly httpService: HttpService
  ) {}

//   async findAll(){
//     const headersRequest = {
//       'Content-Type': 'application/json', // afaik this one is not needed
//       'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
//   };
//     const { data } = await firstValueFrom(
//       this.httpService.get(`${process.env.STRIPE_API_URL}/v1/products`, { headers: headersRequest }).pipe(
//         catchError((error: AxiosError) => {
//           console.error(error.response.data);
//           throw 'An error happened!';
//         }),
//       ),
//     );
//     const response = new GetProductListResponseDto()
//     response.products = data.data.map(item => ProductListItemDto.parseProduct(item))

//     return response;
//   }

  async findOne(id: string) {
    const headersRequest = {
      'Content-Type': 'application/json', // afaik this one is not needed
      'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
    };
    const { data } = await firstValueFrom(
      this.httpService.get(`${process.env.STRIPE_API_URL}/v1/prices/${id}`, { headers: headersRequest }).pipe(
        catchError((error: AxiosError) => {
          console.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    console.log(data)

    // const item = plainToInstance(ProductListItemDto, data)
    // const product = ProductListItemDto.parseProduct(item)
    // const response = new GetProductResponseDto()
    // response.product = product

    return data;
  }

}
