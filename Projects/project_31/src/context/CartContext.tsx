'use client';

import { useContext, useState, useEffect, createContext, ReactNode } from 'react';

interface CartItem {
    _id: string;
    name: string;
    price: number;
    description: string;
    category?: string;
}

interface CartContextType {
    cart: CartItem[];
    total: number;
    rating: number;
    review: string;
    addToCart: (item: CartItem) => void;
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
    setRating: React.Dispatch<React.SetStateAction<number>>;
    setReview: React.Dispatch<React.SetStateAction<string>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'cartItems';
const TOTAL_STORAGE_KEY = 'cartTotal';
const RATING_STORAGE_KEY = 'cartRating';
const REVIEW_STORAGE_KEY = 'cartReview';

// In-memory store for server-side storage
const inMemoryStore = {
    cartItems: [] as CartItem[],
    total: 0,
    rating: 0,
    review: ''
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [rating, setRating] = useState<number>(0);
    const [review, setReview] = useState<string>('');

    useEffect(() => {
        if (typeof window !== 'undefined') {  // Check if window object is available
            const storedCart = localStorage.getItem(CART_STORAGE_KEY);
            const storedTotal = localStorage.getItem(TOTAL_STORAGE_KEY);
            const storedRating = localStorage.getItem(RATING_STORAGE_KEY);
            const storedReview = localStorage.getItem(REVIEW_STORAGE_KEY);
    
            if (storedCart) setCart(JSON.parse(storedCart));
            if (storedTotal) setTotal(Number(storedTotal));
            if (storedRating) setRating(Number(storedRating));
            if (storedReview) setReview(storedReview);
        } else {
            // Load from in-memory store (server-side)
            setCart(inMemoryStore.cartItems);
            setTotal(inMemoryStore.total);
            setRating(inMemoryStore.rating);
            setReview(inMemoryStore.review);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            inMemoryStore.cartItems = cart;
            inMemoryStore.total = total;
            inMemoryStore.rating = rating;
            inMemoryStore.review = review;

            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
            localStorage.setItem(TOTAL_STORAGE_KEY, total.toString());
            localStorage.setItem(RATING_STORAGE_KEY, rating.toString());
            localStorage.setItem(REVIEW_STORAGE_KEY, review);
        }
    }, [cart, total, rating, review]);

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);

            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem._id === item._id ? { ...cartItem, ...item } : cartItem
                );
            } else {
                return [...prevCart, item];
            }
        });
        setTotal((prevTotal) => prevTotal + item.price);
    };

    return (
        <CartContext.Provider value={{ cart, setCart, total, setTotal, rating, setRating, review, setReview, addToCart }}>
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
