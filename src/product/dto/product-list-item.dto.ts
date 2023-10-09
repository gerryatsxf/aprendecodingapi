import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from './product.dto';

export class ProductListItemDto {
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
  default_price: string;

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
  package_dimensions: Record<string, any>;

  @ApiProperty()
  shippable: boolean; // Assuming 'shippable' is a boolean

  @ApiProperty()
  statement_descriptor: string;

  @ApiProperty()
  tax_code: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  unit_label: string;

  @ApiProperty()
  updated: number;

  @ApiProperty()
  url: string;

  static parseProduct(productListItem: ProductListItemDto): ProductDto {
    const product = new ProductDto();
    product.id = productListItem.id;
    product.object = productListItem.object;
    product.active = productListItem.active;
    product.attributes = productListItem.attributes;
    product.created = productListItem.created;
    product.defaultPrice = productListItem.default_price;
    product.description = productListItem.description;
    product.features = productListItem.features;
    product.images = productListItem.images;
    product.livemode = productListItem.livemode;
    product.metadata = productListItem.metadata;
    product.name = productListItem.name;
    product.packageDimensions = productListItem.package_dimensions;
    product.shippable = productListItem.shippable;
    product.statementDescriptor = productListItem.statement_descriptor;
    product.taxCode = productListItem.tax_code;
    product.type = productListItem.type;
    product.unitLabel = productListItem.unit_label;
    product.updated = productListItem.updated;
    product.url = productListItem.url;
    return product;
  }
}
