import * as mongoose from 'mongoose';

export interface ISession extends mongoose.Document {
  _id: string;
  leadId?: string;
  timestamp: number;
  duration: number;
  timezone?: string;

  status?: string;

  processingTimestamp?: number;

  clientReferenceId?: string;
  // authenticityToken: string;
}
