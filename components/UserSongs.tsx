"use client";
import useSWR from "swr";
import fetchUserLibrary from "@/utils/fetchUserSongs";
import { Database } from "@/types_db";
import Image from "next/image";
import { currentSong as useCurrentSong } from "@/hooks/useCurrentSong";
import { FaHeartCircleCheck, FaHeartCircleXmark } from "react-icons/fa6";

type Song = Database["public"]["Tables"]["songs"]["Row"];

const UserSongs = () => {
  const { data: songList, error } = useSWR<Song[] | undefined>(
    "userSongs",
    fetchUserLibrary,
  );
  const { currentSong, setCurrentSong } = useCurrentSong();

  const handlePlay = (song: Song) => {
    setCurrentSong(song);
  };

  if (error) return <div>Failed to load song list: {error.message}</div>;

  if (!songList)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,max-content))]">
        {songList.map((song, index) => (
          <div
            key={index}
            className="flex flex-col items-start p-4 rounded-md hover:cursor-pointer hover:bg-white transition-colors max-w-48"
            onClick={() => handlePlay(song)}
          >
            <Image
              src={`https://fpaeregzmenbrqdcpbra.supabase.co/storage/v1/object/public/images/${song.image_path}`}
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
    </>
  );
};

export default UserSongs;
