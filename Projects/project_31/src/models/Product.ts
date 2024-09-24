import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  inStock: { type: Number, required: true }
}, { timestamps: true });

const ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default ProductModel;
