import React from 'react';
import RatingCheck from './RatingCheck';

interface ReviewCheckProps {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setNewReviews: React.Dispatch<React.SetStateAction<{ review: string; rating: number }[]>>;
  setNumRatings: React.Dispatch<React.SetStateAction<number>>;
  userRating: number;
  setUserRating: React.Dispatch<React.SetStateAction<number>>;
  review: string;
  setReview: React.Dispatch<React.SetStateAction<string>>;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  numRatings: number;
  newReviews: { review: string; rating: number }[];
  rating: number;
}

const forbiddenWords = ['spam', 'fake', 'offensive'];

const ReviewCheck: React.FC<ReviewCheckProps> = ({
  setError,
  setNewReviews,
  setNumRatings,
  userRating,
  setUserRating,
  review,
  setReview,
  setRating,
  numRatings,
  newReviews,
  rating,
}) => {
  const isValidReview = (review: string): boolean => {
    for (const word of forbiddenWords) {
      if (review.toLowerCase().includes(word)) {
        setError(`Your review contains inappropriate content: "${word}".`);
        return false;
      }
    }
    if (review.length < 10) {
      setError('Your review is too short. Please write at least 10 characters.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleReviewAndRating = () => {
    if (!review.trim()) {
      setError('Review cannot be empty.');
      return;
    }
    if (userRating < 1 || userRating > 5) {
      setError('Rating must be between 1 and 5.');
      return;
    }
    if (!isValidReview(review)) {
      return;
    }

    setNewReviews([...newReviews, { review, rating: userRating }]);
    setReview('');
    setError(null);

    const newAverageRating = (rating * numRatings + userRating) / (numRatings + 1);
    setRating(newAverageRating);
    setNumRatings((prevNum) => prevNum + 1);
    setUserRating(0);
  };

  return (
    <div>
      <RatingCheck userRating={userRating} setUserRating={setUserRating} />
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="w-full border p-2 mb-4"
        placeholder="Write your review"
      />
      <button
        onClick={handleReviewAndRating}
        className="mb-4 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
      >
        Add Review and Rating
      </button>
    </div>
  );
};

export default ReviewCheck;
