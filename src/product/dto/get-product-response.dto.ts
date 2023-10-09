import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from './product.dto';

export class GetProductResponseDto {
  @ApiProperty({ type: ProductDto })
  product: ProductDto;
}
