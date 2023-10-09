import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  object: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty({ type: [String] }) // Assuming 'attributes' is an array of strings
  attributes: string[];

  @ApiProperty()
  created: number;

  @ApiProperty()
  defaultPrice: string; // Changed to camelCase

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [String] }) // Assuming 'features' is an array of strings
  features: string[];

  @ApiProperty({ type: [String] }) // Assuming 'images' is an array of strings
  images: string[];

  @ApiProperty()
  livemode: boolean;

  @ApiProperty({ type: 'object' }) // Assuming 'metadata' is an object
  metadata: Record<string, any>;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: 'object' }) // Assuming 'package_dimensions' is an object
  packageDimensions: Record<string, any>; // Changed to camelCase

  @ApiProperty()
  shippable: boolean; // Assuming 'shippable' is a boolean

  @ApiProperty()
  statementDescriptor: string; // Changed to camelCase

  @ApiProperty()
  taxCode: string; // Changed to camelCase

  @ApiProperty()
  type: string;

  @ApiProperty()
  unitLabel: string; // Changed to camelCase

  @ApiProperty()
  updated: number;

  @ApiProperty()
  url: string;
}
