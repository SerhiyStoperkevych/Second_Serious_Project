// types.ts
export interface CartItem {
    _id: string;
    name: string;
    price: number;
    description: string;
    category?: string;
    quantity: number;
    inStock: number;
}

export interface CartContextType {
    cart: CartItem[];
    total: number;
    rating: number;
    review: string;
    qua: { [itemId: string]: number }; // Change qua to be an object with itemId keys
    addToCart: (item: CartItem) => void;
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
    setRating: React.Dispatch<React.SetStateAction<number>>;
    setReview: React.Dispatch<React.SetStateAction<string>>;
    setQua: React.Dispatch<React.SetStateAction<{ [itemId: string]: number }>>; // Update qua setter type
  }