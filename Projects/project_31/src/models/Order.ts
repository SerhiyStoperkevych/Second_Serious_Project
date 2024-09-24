import mongoose, { Document, Schema } from 'mongoose';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order extends Document {
  userId: string;
  cartItems: CartItem[];
  totalAmount: number;
  createdAt: Date;
}

const OrderSchema: Schema = new Schema({
  userId: { type: String, required: true },
  cartItems: [
    {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const OrderModel = mongoose.models.Order || mongoose.model<Order>('Order', OrderSchema);

export default OrderModel;
