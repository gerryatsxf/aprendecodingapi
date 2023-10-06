import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { HttpModule } from '@nestjs/axios';
import { ProductModule } from 'src/product/product.module';
import { ProductService } from 'src/product/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CartSchema } from './entities/cart.schema';
import { CartLineItemSchema } from './entities/cart-line-item.schema';
import { SessionSchema } from 'src/session/entities/session.schema';
import { PriceService } from './price.service';

@Module({
  controllers: [CartController],
  providers: [CartService, ProductService, PriceService],
  imports: [    HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  }), ProductModule,
  MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }]),
  MongooseModule.forFeature([{ name: 'CartLineItem', schema: CartLineItemSchema }]),
  // MongooseModule.forFeature([{ name: 'session', schema: SessionSchema }]),
]
})
export class CartModule {}
