import * as mongoose from 'mongoose';

export const CartSchema = new mongoose.Schema({
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CartLineItem',
      required: true, // Added required property
      description: 'The items associated with the booking', // Added description
    },
  ],
  sessionId: {
    type: String,
    required: true, // Added required property
    description: 'The session ID associated with the booking', // Added description
  },
  itemCount: {
    type: Number,
    required: true, // Added required property
    description: 'The number of items in the booking', // Added description
  },
  total: {
    type: Number,
    required: true, // Added required property
    description: 'The total cost of the booking', // Added description
  },
  subtotal: {
    type: Number,
    required: true, // Added required property
    description: 'The subtotal cost of the booking before taxes', // Added description
  },
  creationTimestamp: {
    type: Number,
    required: true, // Added required property
    description: 'The timestamp when the booking was created', // Added description
  },
});
