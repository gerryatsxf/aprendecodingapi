import * as mongoose from 'mongoose';
export const SessionSchema = new mongoose.Schema({
  timestamp: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  timezone: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  processingTimestamp: {
    type: Number,
    required: false,
  },
  // authenticityToken: {
  //   type: String,
  //   required: false,
  // },
});
