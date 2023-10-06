import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from './product.dto';


export class GetProductListResultDto {
  @ApiProperty()
  object: string;

  @ApiProperty({ type: [ProductDto] })
  data: ProductDto[];

  @ApiProperty()
  has_more: boolean;

  @ApiProperty()
  url: string;
}
