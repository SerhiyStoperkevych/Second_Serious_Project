import React from 'react';

interface RatingCheckProps {
  userRating: number;
  setUserRating: React.Dispatch<React.SetStateAction<number>>;
}

const RatingCheck: React.FC<RatingCheckProps> = ({ userRating, setUserRating }) => (
  <div>
    <input
      type="number"
      value={userRating}
      onChange={(e) => setUserRating(Number(e.target.value))}
      className="border p-2 mb-4"
      min={1}
      max={5}
      placeholder="Rate (1-5)"
    />
  </div>
);

export default RatingCheck;
