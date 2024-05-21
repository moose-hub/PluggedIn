import { BsImageFill } from "react-icons/bs";
import { TrackSpotlightProps } from "@/models/interfaces/musicPlayer";
import { useEffect, useState } from "react";
import useCurrentSong from "@/stores/useCurrentSong";
import Image from "next/image";

export default function TrackSpotlight({ audioRef }: TrackSpotlightProps) {
  const currentSong = useCurrentSong((state) => state.currentSong);

  return (
    <div className="flex items-center gap-4">
      {currentSong?.image_path ? (
        <Image
          src={
            `https://fpaeregzmenbrqdcpbra.supabase.co/storage/v1/object/public/images/${currentSong?.image_path}` ||
            ""
          }
          alt={currentSong?.title || ""}
          width={50}
          height={100}
          className="aspect-square rounded-md"
        />
      ) : (
        <BsImageFill />
      )}
      <div>
        <p className="font-semibold">{currentSong?.title}</p>
        <p className="text-sm">{currentSong?.author}</p>
      </div>
    </div>
  );
}
