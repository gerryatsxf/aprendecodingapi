import * as mongoose from 'mongoose';

export const MeetingSchema = new mongoose.Schema({
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
    description: 'The session ID related to the meeting',
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'confirmed', 'cancelled'], // Add other statuses if needed
    description: 'The status of the meeting',
  },
  type: {
    type: String,
    required: true,
    enum: ['tutoring', 'consultancy'],
    description: 'The type of meeting',
  },
  bookingReservationExpiresTimestamp: {
    type: Number,
    required: true,
    description: 'The expiration timestamp of the meeting',
  },
  guestTimezone: {
    type: String,
    required: true,
    description: 'The timezone of the guest',
  },
});
