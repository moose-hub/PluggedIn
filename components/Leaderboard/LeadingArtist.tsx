import { FunctionComponent } from "react";
import Image from "next/image";

type LeadingArtistProps = {
  index: number;
  image: string;
  name: string;
  author: string;
  numberOfSwipes: number;
};

const LeadingArtist: FunctionComponent<LeadingArtistProps> = ({
  index,
  image,
  name,
  author,
  numberOfSwipes,
}) => {
  return (
    <div
      id={`leader-container-${index}`}
      className="flex space-x-4 p-4 rounded-lg"
    >
      <div
        id="avatar-container"
        className={`
        rounded-[.5rem]
        ${
          index === 0
            ? "border-2 border-solid border-pi-purple-main shadow-md shadow-pi-purple-main"
            : index === 1
              ? "border-2 border-solid border-pi-purple-main shadow-md shadow-pi-purple-main/70"
              : index === 2
                ? "border-2 border-solid border-pi-purple-main shadow-md shadow-pi-purple-main/40"
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
        <div id="author-name" className="text-sm text-gray-700">
          {author}
        </div>
        <div id="swipe-number-container" className="text-sm text-gray-500">
          {numberOfSwipes}
        </div>
      </div>
    </div>
  );
};

export default LeadingArtist;
