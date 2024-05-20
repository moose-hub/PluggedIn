// components/LikedContent.tsx
import React from "react";
import CoverItem from "./CoverItem";
import { covers } from "@/components/Profile/Likes/mockData";

const LikedContent: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {covers.map((cover) => (
        <CoverItem key={cover.key} cover={cover} />
      ))}
    </div>
  );
};

export default LikedContent;
