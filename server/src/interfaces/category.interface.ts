import { Document, ObjectId } from 'mongoose';

export interface IAttributeData {
  key: string;
  value: string;
  categoryChoosen: string;
}

export interface ICategoryDocument extends Document {
  _id: string | ObjectId;
  name: string;
  description: string;
  icon: string;
  totalProducts?: number;
  attributes: IAttribute[];
}

export interface IAttribute {
  key: string;
  value: string;
}

export interface ICategoryPayload {
  name: string;
  description: string;
  icon: string;
}
