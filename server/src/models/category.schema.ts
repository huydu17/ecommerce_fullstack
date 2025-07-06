import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  totalProducts: { type: Number, default: 0 },
  attributes: [{ key: { type: String }, value: [{ type: String }] }]
});
categorySchema.index({ description: 1 });
const Category = mongoose.model('Category', categorySchema);
export { Category };
