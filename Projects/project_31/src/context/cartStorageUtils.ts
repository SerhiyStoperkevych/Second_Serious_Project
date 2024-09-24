// cartStorageUtils.ts
import { CartItem } from './types';

const CART_STORAGE_KEY = 'cartItems';
const TOTAL_STORAGE_KEY = 'cartTotal';
const RATING_STORAGE_KEY = 'cartRating';
const REVIEW_STORAGE_KEY = 'cartReview';

// Default values in case of no data
const defaultCart = {
    cart: [] as CartItem[],
    total: 0,
    rating: 0,
    review: '',
};

export const getStoredCart = () => {
    if (typeof window === 'undefined') {
        return defaultCart; // server-side
    }

    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    const storedTotal = localStorage.getItem(TOTAL_STORAGE_KEY);
    const storedRating = localStorage.getItem(RATING_STORAGE_KEY);
    const storedReview = localStorage.getItem(REVIEW_STORAGE_KEY);

    return {
        cart: storedCart ? JSON.parse(storedCart) : defaultCart.cart,
        total: storedTotal ? Number(storedTotal) : defaultCart.total,
        rating: storedRating ? Number(storedRating) : defaultCart.rating,
        review: storedReview || defaultCart.review,
    };
};

export const storeCartData = ({ cart, total, rating, review }: { cart: CartItem[], total: number, rating: number, review: string }) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        localStorage.setItem(TOTAL_STORAGE_KEY, total.toString());
        localStorage.setItem(RATING_STORAGE_KEY, rating.toString());
        localStorage.setItem(REVIEW_STORAGE_KEY, review);
    }
};
