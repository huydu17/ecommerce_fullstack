import { Document, ObjectId } from 'mongoose';
import { IReviewDocuments } from 'src/features/reviews/interfaces/review.interface';
interface IImage {
  path: string;
}
interface IProductAttribute {
  key: string;
  value: string;
}

export interface IProductDocument extends Document {
  _id: ObjectId;
  name: string;
  shortDescription: string;
  description: string;
  category: string | ObjectId | undefined;
  price: number;
  totalQty: number;
  totalSold: number;
  totalReviews: number;
  averageRating: number;
  attributes: IProductAttribute[];
  reviews: (string | ObjectId | IReviewDocuments)[];
  images: IImage[];
}

export interface IProductPayload {
  name: string;
  shortDescription: string;
  description: string;
  category: string | ObjectId;
  price: number;
  totalQty: number;
  attributes: any;
  images: IImage;
  remainingImages?: any;
}

export interface IProductQueryParams {
  price?: number;
  rating?: string;
  sort?: string;
  attributes?: string;
  page: number;
  limit: number;
  categoryName?: string;
  search?: string;
}
