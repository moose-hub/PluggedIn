import { Cover, covers } from "./coverModel";
import { FunctionComponent } from "react";
import Image from "next/image";

const CoverArt: FunctionComponent<Cover> = ({ image, coverName }) => {
  return (
    <>
      <div id="cover-container" className="rounded-lg ">
        <h3 id="album-name" className="mt-2 text-md font-semibold">
          {coverName}
        </h3>
        <Image
          alt={coverName}
          className="rounded-lg "
          height="250"
          src={image}
          style={{
            aspectRatio: "250/250",
            objectFit: "cover",
            margin: 0,
          }}
          width="250"
        />
      </div>
    </>
  );
};

export default CoverArt;
