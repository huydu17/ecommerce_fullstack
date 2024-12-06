import { required } from 'joi';
import mongoose, { Types, model, Model } from 'mongoose';
import { IReviewDocuments } from '../interfaces/review.interface';

const reviewSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    productId: {
      type: Types.ObjectId,
      ref: 'Product',
      required: true
    },
    user: {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      name: { type: String, required: true }
    }
  },
  {
    timestamps: true
  }
);
const Review: Model<IReviewDocuments> = model<IReviewDocuments>('Review', reviewSchema);
export { Review };
