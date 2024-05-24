"use client";
import useSWR from "swr";
import fetchUserLikedSongs from "../../../utils/fetchUserLikedSongs";
import { Database } from "@/types_db";
import Image from "next/image";
import { useState } from "react";
import { FaHeartCircleCheck, FaHeartCircleXmark } from "react-icons/fa6";
type Song = Database["public"]["Tables"]["songs"]["Row"];
const UserLikedSongs = () => {
  const { data: songList, error } = useSWR<Song[] | undefined>(
    "userLikedSongs",
    fetchUserLikedSongs,
  );
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const handlePlay = (song: Song) => {
    setCurrentSong(song);
  };
  if (error) return <div>Failed to load liked songs: {error.message}</div>;
  if (!songList)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  return (
    <div>
      <h2 className="text-2xl mx-4 font-bold">Liked Songs</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] p-4">
        {songList?.map((song, index) => (
          <div
            key={index}
            className="flex flex-col items-start p-4 rounded-md hover:cursor-pointer hover:bg-white transition-colors max-w-48"
            onClick={() => handlePlay(song)}
          >
            <Image
              src={
                `https://fpaeregzmenbrqdcpbra.supabase.co/storage/v1/object/public/images/${song.image_path}` ||
                ""
              }
              alt={song.title || ""}
              width={150}
              height={150}
              className="aspect-square rounded-md"
            />
            <div className="flex flex-col mt-2 w-full">
              <p className="text-left font-bold text-nowrap text-ellipsis max-w-[150px] overflow-hidden">
                {song.title}
              </p>
              <p className="text-left text-black/80">{song.author}</p>
            </div>
          </div>
        ))}
      </div>
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4">
          <h3 className="text-xl font-bold">{currentSong.title}</h3>
          <p className="text-lg">{currentSong.author}</p>
        </div>
      )}
    </div>
  );
};
export default UserLikedSongs;
