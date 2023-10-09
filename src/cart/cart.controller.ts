import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddToCartRequestDto } from './dto/add-to-cart-request.dto';
import { SessionInfo } from 'src/session/decorators/session-info.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  addToCart(
    @Body() addToCartRequestDto: AddToCartRequestDto,
    @SessionInfo() sessionInfo,
  ) {
    return this.cartService.addProduct(addToCartRequestDto, sessionInfo);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('cartLineItem/:cartLineItemId/remove') // removes the cart line item altogether and all products in it
  @ApiBearerAuth()
  removeCartLineItemFromCart(
    @Param('cartLineItemId') cartLineItemId: string,
    @SessionInfo() sessionInfo,
  ) {
    return this.cartService.removeCartLineItem(cartLineItemId, sessionInfo);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('product/:productId/remove') // removes the cart line item altogether and all products in it
  @ApiBearerAuth()
  removeProductItemsFromCart(
    @Param('productId') productId: string,
    @Body() addToCartRequestDto: AddToCartRequestDto,
    @SessionInfo() sessionInfo,
  ) {
    return this.cartService.removeProductItemsFromCart(
      productId,
      addToCartRequestDto.quantity,
      sessionInfo,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  getCart(@SessionInfo() sessionInfo) {
    return this.cartService.getCartBySessionId(sessionInfo.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartService.update(+id, updateCartDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
