import { Document, ObjectId } from 'mongoose';

export interface IReviewDocuments extends Document {
  _id: ObjectId | string;
  productId: Object | string;
  content: string;
  rating: number;
  user: IUser;
}

export interface IReviewPayload {
  content: string;
  rating: number;
}

interface IUser {
  _id: ObjectId | string;
  name: string;
}
