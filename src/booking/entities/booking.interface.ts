import * as mongoose from 'mongoose';

export interface IBooking extends mongoose.Document {
  _links: any;
  _id: string;
  meetingStartTimestamp: number;
  meetingEndTimestamp: number;
  sessionId: string;
  status: 'pending' | 'paid' | 'stale'; // Add other statuses if needed
  type: 'tutoring' | 'consultancy';
  paymentExpirationTimestamp: number;

  guestTimezone: string;
}
