// components/CoverItem.tsx
import React from "react";
import { Cover } from "@/components/Profile/Likes/mockData";

interface CoverItemProps {
  cover: Cover;
}

interface CoverItemProps {
  cover: Cover;
}

const CoverItem: React.FC<CoverItemProps> = ({ cover }) => {
  let random = Math.floor(Math.random() * 20);
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-4">
      <img
        className="w-full"
        src={`https://i.pravatar.cc/300?img=${random}`}
        alt={cover.coverName}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{cover.coverName}</div>
      </div>
    </div>
  );
};

export default CoverItem;
