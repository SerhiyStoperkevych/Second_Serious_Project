export interface Product {
  _id: string; // Or ObjectId if using Mongoose
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  inStock: number;
}
