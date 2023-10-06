import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [    HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  }),]
})
export class ProductModule {}
