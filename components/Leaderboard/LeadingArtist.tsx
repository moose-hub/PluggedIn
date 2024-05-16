import { Leader, leaders } from "./leaderModel";

import { FunctionComponent } from "react";
import Image from "next/image";

// export default function LeadingArtist({image, name, numberOfSwipes}) {
const LeadingArtist: FunctionComponent<Leader> = ({
  image,
  name,
  numberOfSwipes,
}) => {
  return (
    <div id="leader-container" className="flex space-x-4 p-4 rounded-lg ">
      <div id="avatar-container" className="rounded-full ring-2 ring-[#6f42c1]">
        <Image
          className="rounded-full"
          src={image}
          alt="Profile Image"
          width={70}
          height={70}
        />
      </div>
      <div>
        <div id="artist-name" className="text-xl font-semibold ">
          {name}
        </div>
        <div id="swipe-number-container" className="text-sm text-gray-500 ">
          {numberOfSwipes}
        </div>
      </div>
    </div>
  );
};

export default LeadingArtist;
