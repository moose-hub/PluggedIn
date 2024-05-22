"use client";
import { useEffect } from "react";
import useSWR from "swr";
import { Database } from "@/types_db";
import Image from "next/image";
import useCurrentSong from "@/stores/useCurrentSong";
import { FaHeartCircleCheck, FaHeartCircleXmark } from "react-icons/fa6";
import { useSongs } from "@/hooks/useSongs";

type Song = Database["public"]["Tables"]["songs"]["Row"];

const DiscoverList = () => {
  const { songs: songList, error, isLoading } = useSongs();
  const { currentSong, setCurrentSong } = useCurrentSong();

  const handlePlay = async (song: Song) => {
    await fetch("/api/current-song", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ song }),
    });
    setCurrentSong(song);
  };

  useEffect(() => {
    if (songList && songList.length > 0) {
      const randomNum = Math.floor(Math.random() * songList.length);
      handlePlay(songList[randomNum]);
    }
  }, [songList]);

  if (error) return <div>Failed to load song list</div>;

  if (isLoading && !currentSong)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className="flex flex-col items-center overflow-x-hidden overflow-y-scroll scroll-smooth h-[100vh] max-w-full p-4 snap-y snap-mandatory">
      <div className="relative flex flex-col items-center p-8 w-full max-w-2xl mb-8 snap-start">
        <div className="absolute inset-0 -z-10 flex justify-center items-center w-full h-full">
          {currentSong?.image_path && (
            <Image
              src={`https://fpaeregzmenbrqdcpbra.supabase.co/storage/v1/object/public/images/${currentSong.image_path}`}
              alt={currentSong.title || "Current Song"}
              className="object-cover blur-md rounded-lg"
              width={100}
              height={100}
            />
          )}
        </div>
        <div className="relative z-10 flex flex-col p-8 rounded-lg">
          <h2 className="font-bold text-2xl mb-2">{currentSong?.title}</h2>
          <p className="text-lg mb-4">{currentSong?.author}</p>
          {currentSong?.image_path && (
            <Image
              src={`https://fpaeregzmenbrqdcpbra.supabase.co/storage/v1/object/public/images/${currentSong.image_path}`}
              alt={currentSong.title || "Current Song"}
              width={400}
              height={400}
              className="rounded-lg mb-6"
            />
          )}
          <div className="flex items-center justify-between w-full">
            <button onClick={() => alert("Track Disliked")}>
              <FaHeartCircleXmark className="text-7xl text-white p-2 hover:bg-slate-50 transition-colors rounded-full hover:text-rose-400" />
            </button>
            <button onClick={() => alert("Track Liked")}>
              <FaHeartCircleCheck className="text-7xl text-green-400 p-2 hover:bg-slate-50 transition-colors rounded-full" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverList;
