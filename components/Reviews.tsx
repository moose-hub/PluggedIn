import React, { useState } from "react";

const Review: React.FC = () => {
  const [showReview, setShowReview] = useState<boolean>(false);

  const handleToggle = (): void => {
    setShowReview(!showReview);
  };

  return (
    <div className="container" style={{ display: "inline" }}>
      <button
        onClick={handleToggle}
        className="mt-4 bg-pi-main text-black font-bold py-2 px-4 rounded transform transition duration-150 ease-in-out hover:scale-105"
      >
        Reviews
      </button>
      <div className="mt-4 h-1 bg-gray-300 w-full">
        {showReview && <h1>👇🏽Reviews will show up under this line 👇🏽</h1>}
      </div>
    </div>
  );
};

export default Review;
