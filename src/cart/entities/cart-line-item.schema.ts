import * as mongoose from 'mongoose';
export const CartLineItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    description: 'The product ID of the cart item',
  },
  productTypeId: {
    type: String,
    required: true,
    description: 'The product type ID of the cart item',
  },
  label: {
    type: String,
    required: true,
    description: 'The label of the cart item',
  },
  alias: {
    type: String,
    required: true,
    description: 'The alias of the cart item',
  },
  // itemNumber: {
  //   type: String,
  //   required: true,
  //   description: 'The item number of the cart item',
  // },
  description: {
    type: String,
    required: true,
    description: 'The description of the cart item',
  },
  // mediumDescription: {
  //   type: String,
  //   required: true,
  //   description: 'The medium description of the cart item',
  // },
  unitPrice: {
    type: Number,
    required: true,
    description: 'The unit price of the cart item',
  },
  // purchaseUnitPrice: {
  //   type: Number,
  //   required: true,
  //   description: 'The purchase unit price of the cart item',
  // },
  quantity: {
    type: Number,
    required: true,
    description: 'The quantity of the cart item',
  },
  thumbnailImageSrc: {
    type: String,
    required: true,
    description: 'The thumbnail image source URL of the cart item',
  },
  // thumbnailImageWidth: {
  //   type: String,
  //   required: true,
  //   description: 'The width of the thumbnail image of the cart item',
  // },
  // thumbnailImageHeight: {
  //   type: String,
  //   required: true,
  //   description: 'The height of the thumbnail image of the cart item',
  // },
  // availableQuantity: {
  //   type: Number,
  //   required: true,
  //   description: 'The available quantity of the cart item',
  // },
  // tokenRedemptionQty: {
  //   type: Number,
  //   required: true,
  //   description: 'The token redemption quantity of the cart item',
  // },
  timestampAdded: {
    type: Number,
    required: true,
    description: 'The date when the cart item was added',
  },
  permalink: {
    type: String,
    required: true,
    description: 'The permalink of the cart item',
  },
});

// Register the CartLineItem model
mongoose.model('CartLineItem', CartLineItemSchema);