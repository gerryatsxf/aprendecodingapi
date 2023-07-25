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
  authenticityToken: {
    type: String,
    required: false,
  },
});

export interface Session extends mongoose.Document {
  _id: string;
  timestamp: number;
  duration: number;
  status: string;
  authenticityToken: string;
}
