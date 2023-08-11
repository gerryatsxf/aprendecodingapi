import * as mongoose from 'mongoose';

export interface IMeeting extends mongoose.Document {
  _links: any;
  _id: string;
  meetingStartTimestamp: number;
  meetingEndTimestamp: number;
  sessionId: string;
  status: 'pending' | 'confirmed' | 'cancelled'; // Add other statuses if needed
  type: 'tutoring' | 'consultancy';
  bookingReservationExpiresTimestamp: number;

  guestTimezone: string;
}
