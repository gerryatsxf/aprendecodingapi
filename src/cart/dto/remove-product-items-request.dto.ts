import { ApiProperty } from '@nestjs/swagger';

export class RemoveProductItemsFromCart {
  @ApiProperty({
    type: 'number',
    required: true,
  })
  quantity: number;
}
