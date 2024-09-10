'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/types/Product';
import { useCart } from '@/context/CartContext';
import BackButton from './BackButton';
import AddToCart from './AddToCart';
// List of forbidden words
const forbiddenWords = ['spam', 'fake', 'offensive'];

interface ProductClientProps {
  product: Product;
}

const ProductClient: React.FC<ProductClientProps> = ({ product }) => {
  const { rating, setRating, review, setReview } = useCart();
  const [userRating, setUserRating] = useState<number>(0);
  const [numRatings, setNumRatings] = useState<number>(0);
  const [newReviews, setNewReviews] = useState<{ review: string; rating: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Moderation check for spam/inappropriate content
  const isValidReview = (review: string): boolean => {
    // Check for forbidden words
    for (const word of forbiddenWords) {
      if (review.toLowerCase().includes(word)) {
        setError(`Your review contains inappropriate content: "${word}".`);
        return false;
      }
    }

    // Check review length
    if (review.length < 10) {
      setError('Your review is too short. Please write at least 10 characters.');
      return false;
    }

    // Clear error if validation passes
    setError(null);
    return true;
  };

  // Handle rating and review submission
  const handleReviewAndRating = () => {
    // Ensure the review is not empty and rating is valid
    if (!review.trim() || userRating < 1 || userRating > 5) {
      alert('Please provide a valid review and a rating between 1 and 5');
      return;
    }

    // Validate review content
    if (!isValidReview(review)) {
      return;
    }

    // Add the new review and rating to the array
    setNewReviews([...newReviews, { review, rating: userRating }]);

    // Reset the review input
    setReview('');

    // Calculate new average rating
    const newAverageRating = (rating * numRatings + userRating) / (numRatings + 1);
    setRating(newAverageRating);
    setNumRatings((prevNum) => prevNum + 1);

    // Reset user rating
    setUserRating(0);
  };

  // Convert Product to CartItem for adding to cart

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.name}</h1>
        <h2 className="text-lg font-semibold text-gray-600 mb-6">{product.description}</h2>
        <p className="text-xl font-semibold text-gray-800">${product.price.toFixed(2)}</p>
        
        {/* Rating Section */}
        <h3 className="text-lg font-semibold mb-4">Average Rating: {rating.toFixed(1)} ({numRatings} ratings)</h3>

        {/* User Rating Input */}
        <input
          type="number"
          value={userRating}
          onChange={(e) => setUserRating(Number(e.target.value))}
          className="border p-2 mb-4"
          min={1}
          max={5}
          placeholder="Rate (1-5)"
        />

        {/* User Review Input */}
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full border p-2 mb-4"
          placeholder="Write your review"
        />

        {/* Add Review and Rating Button */}
        <button
          onClick={handleReviewAndRating}
          className="mb-4 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
        >
          Add Review and Rating
        </button>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Display Reviews and Ratings */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Reviews:</h3>
          {newReviews.length > 0 ? (
            newReviews.map((entry, index) => (
              <li key={index} className="mb-2 border-b pb-2">
                <h1>Rating: {entry.rating}</h1>
                <p>Comment: {entry.review}</p>
              </li>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>

          <AddToCart product={product}/>

        {/* Back Button */}
        <BackButton/>
      </div>
    </div>
  );
};

export default ProductClient;
