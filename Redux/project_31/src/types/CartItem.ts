// /types/CartItem.ts
export interface CartItem {
    _id: string; // Ensure this matches with Product _id if needed
    name: string;
    description: string;
    price: number;
    category: string; // Add this if it's required
  }
  