import React, { useState } from "react";

const Likes: React.FC = () => {
  const [showLikes, setShowLikes] = useState<boolean>(false);

  const handleToggle = (): void => {
    setShowLikes(!showLikes);
  };

  return (
    <div className="container" style={{ display: "inline" }}>
      <button
        onClick={handleToggle}
        className="mt-4 bg-pi-main text-black font-bold py-2 px-4 rounded transform transition duration-150 ease-in-out hover:scale-105"
      >
        Likes
      </button>

      {showLikes && <h1>👇🏽Reviews will show up under this line 👇🏽</h1>}
    </div>
  );
};

export default Likes;
