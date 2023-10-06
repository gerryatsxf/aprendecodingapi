import { ApiProperty } from '@nestjs/swagger';

export class AddToCartRequestDto {
  @ApiProperty({
    type: String,
    description: 'The ID of the product to add to the cart',
  })
  productId: string;

  @ApiProperty({
    type: Number,
    description: 'The quantity of the product to add to the cart',
    minimum: 1, // Optional: Set minimum value if needed
  })
  quantity: number;
}
