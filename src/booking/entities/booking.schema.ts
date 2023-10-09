import * as mongoose from 'mongoose';
import { PaymentStatusEnum } from '../../payment/payment-status.enum';

export const BookingSchema = new mongoose.Schema({
  meetingStartTimestamp: {
    type: Number,
    required: true,
    description: 'The start timestamp of the meeting',
  },
  meetingEndTimestamp: {
    type: Number,
    required: true,
    description: 'The end timestamp of the meeting',
  },
  sessionId: {
    type: String,
    required: true,
    description: 'The session ID related to the booking',
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(PaymentStatusEnum), // Add other statuses if needed
    description: 'The status of the booking',
  },
  type: {
    type: String,
    required: true,
    enum: ['tutoring', 'consultancy'],
    description: 'The type of booking',
  },
  paymentExpirationTimestamp: {
    type: Number,
    required: true,
    description: 'The expiration timestamp of the payment for the booking',
  },
  guestTimezone: {
    type: String,
    required: true,
    description: 'The timezone of the guest',
  },
});
