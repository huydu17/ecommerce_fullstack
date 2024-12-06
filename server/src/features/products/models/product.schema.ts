import mongoose, { Types } from 'mongoose';
import { IProductDocument } from '../interfaces/product.interface';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: Types.ObjectId, ref: 'Category' },
    price: { type: Number, required: true },
    totalQty: { type: Number, required: true },
    totalSold: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    attributes: [{ key: { type: String }, value: { type: String } }],
    reviews: [{ type: Types.ObjectId, ref: 'Review', default: [] }],
    images: [
      {
        url: { type: String },
        public_id: { type: String }
      }
    ]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

productSchema.virtual('isSoldOut').get(function (this: IProductDocument) {
  return this.totalSold >= this.totalQty;
});

const Product = mongoose.model('Product', productSchema);
productSchema.index({ name: 'text', description: 'text' }, { name: 'TextIndex' });
productSchema.index({ 'attributes.key': 1, 'attributes.value': 1 });
export { Product };
