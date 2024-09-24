'use client';

import { useContext, useState, useEffect, createContext, ReactNode } from 'react';
import { getStoredCart, storeCartData } from './cartStorageUtils';
import { CartItem, CartContextType } from './types';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [qua, setQua] = useState<{ [itemId: string]: number }>({});

  useEffect(() => {
    const { cart, total, rating, review } = getStoredCart();
    setCart(cart);
    setTotal(total);
    setRating(rating);
    setReview(review);
  
    const defaultQua = cart.reduce((acc: { [itemId: string]: number }, item: CartItem) => {
      acc[item._id] = 1; // Initialize quantity for each item
      return acc;
    }, {} as { [itemId: string]: number });
  
    setQua(defaultQua);
  }, []);

  useEffect(() => {
    storeCartData({ cart, total, rating, review });
  }, [cart, total, rating, review]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
        const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);
        if (existingItem) {
            return prevCart.map((cartItem) =>
                cartItem._id === item._id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 } // Increment quantity
                    : cartItem
              );
          } else {
              return [...prevCart, { ...item, quantity: 1 }]; // Set quantity to 1 for new items
          }
      });
      setTotal((prevTotal) => prevTotal + item.price); // Update total
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, total, setTotal, rating, setRating, review, setReview, addToCart, qua, setQua }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
