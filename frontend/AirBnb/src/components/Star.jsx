import React, { useState } from 'react';
import { FaStar } from "react-icons/fa6";

const Star = ({ value = 5, onRate }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex space-x-3">
      {[...Array(value)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hover || rating);

        return (
          <span
            key={index}
            onClick={() => {
              setRating(starValue);
              onRate && onRate(starValue);
            }}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            className="cursor-pointer transition-colors duration-200"
          >
            <FaStar
              className={isFilled ? "text-orange-500" : "text-gray-300"} 
              size={26}
            />
          </span>
        );
      })}
    </div>
  );
};

export default Star;
