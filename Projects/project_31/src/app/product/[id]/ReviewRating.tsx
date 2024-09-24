import React from 'react';

interface Review {
  review: string;
  rating: number;
}

interface ReviewRatingProps {
  newReviews: Review[];
}

const ReviewRating: React.FC<ReviewRatingProps> = ({ newReviews }) => (
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
);

export default ReviewRating;
