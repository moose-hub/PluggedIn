import { Leader, leaders } from "./leaderModel";

import { FunctionComponent } from "react";
import Image from "next/image";

const LeadingArtist: FunctionComponent<Leader> = ({
  index,
  image,
  name,
  numberOfSwipes,
}) => {
  return (
    <div
      id={`leader-container-${index}`}
      className="flex space-x-4 p-4 rounded-lg "
    >
      <div
        id="avatar-container"
        className={`
        rounded-[.5rem]
        ${
          index === 0
            ? "border-2 border-solid border-pi-purple-main shadow-md shadow-pi-purple-main"
            : index === 1
              ? "border-2 border-solid border-pi-purple-shadow shadow-md shadow-pi-purple-shadow"
              : index === 2
                ? "border-2 border-solid border-pi-purple-dark shadow-md shadow-pi-purple-dark"
                : ""
        }`}
      >
        <Image
          className="min-w-[70px] rounded-md aspect-square object-cover"
          src={image}
          alt="Profile Image"
          width={70}
          height={70}
        />
      </div>
      <div>
        <div
          id="artist-name"
          className="text-xl font-semibold text-nowrap text-ellipsis"
        >
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
