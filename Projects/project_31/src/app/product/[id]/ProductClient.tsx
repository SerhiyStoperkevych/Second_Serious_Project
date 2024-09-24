'use client';

import React, { useState } from 'react';
import { Product } from '@/types/Product';
import { useCart } from '@/context/CartContext';
import BackButton from './BackButton';
import AddToCart from './AddToCart';
import ReviewRating from './ReviewRating';
import ReviewCheck from './ReviewCheck';

interface ProductClientProps {
  product: Product;
}

const ProductClient: React.FC<ProductClientProps> = ({ product }) => {
  const { rating, setRating, review, setReview } = useCart();
  const [userRating, setUserRating] = useState<number>(0);
  const [numRatings, setNumRatings] = useState<number>(0);
  const [newReviews, setNewReviews] = useState<{ review: string; rating: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.name}</h1>
        <h2 className="text-lg font-semibold text-gray-600 mb-6">{product.description}</h2>
        <p className="text-xl font-semibold text-gray-800">${product.price.toFixed(2)}</p>

        <h3 className="text-lg font-semibold mb-4">
          Average Rating: {rating.toFixed(1)} ({numRatings} ratings)
        </h3>

        <ReviewCheck
          setError={setError}
          setNewReviews={setNewReviews}
          setNumRatings={setNumRatings}
          userRating={userRating}
          setUserRating={setUserRating}
          setRating={setRating}
          review={review}
          setReview={setReview}
          numRatings={numRatings}
          newReviews={newReviews}
          rating={rating}
        />

        {error && <p className="text-red-500">{error}</p>}

        <ReviewRating newReviews={newReviews} />

        <AddToCart product={product} />

        <BackButton />
      </div>
    </div>
  );
};

export default ProductClient;
