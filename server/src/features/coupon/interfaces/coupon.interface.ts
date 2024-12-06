import mongoose, { Document } from 'mongoose';

export interface ICouponDocument extends Document {
  code: string;
  startDate: Date;
  endDate: Date;
  discount: number;
  user: mongoose.Types.ObjectId | string;
}

export interface ICouponPayload {
  code: string;
  startDate: Date;
  endDate: Date;
  discount: number;
}
