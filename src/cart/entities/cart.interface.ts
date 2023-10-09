import * as mongoose from 'mongoose';
import { ICartLineItem } from './cart-line-item.interface';

export interface ICart extends mongoose.Document {
  _links: any;
  _id: string;
  items: ICartLineItem[];
  sessionId: string;
  itemCount: number;
  total: number; // with taxes
  subtotal: number; // before taxes
  creationTimestamp: number;
}
