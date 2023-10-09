import * as mongoose from 'mongoose';

export interface ICartLineItem extends mongoose.Document {
  _links: any;
  _id: string;
  productId: string;
  productTypeId: number;
  label: string;
  alias: string;
  // itemNumber: string;
  description: string;
  // mediumDescription: string;
  unitPrice: number;
  purchaseUnitPrice: number;
  quantity: number;
  thumbnailImageSrc: string;
  // thumbnailImageWidth: string;
  // thumbnailImageHeight: string;
  // availableQuantity: number;
  // tokenRedemptionQty: number;
  timestampAdded: number;
  permalink: string;
}
