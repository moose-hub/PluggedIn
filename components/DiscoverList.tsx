"use client";
import useSWR from "swr";
import fetchSongs from "@/utils/fetchSongs";
import { Database } from "@/types_db";
import Image from "next/image";
import useCurrentSong from "@/stores/useCurrentSong";
import { FaHeartCircleCheck, FaHeartCircleXmark } from "react-icons/fa6";

type Song = Database["public"]["Tables"]["songs"]["Row"];

const DiscoverList = () => {
  const { data: songList, error } = useSWR<Song[] | undefined>(
    "songs",
    fetchSongs,
  );
  const setCurrentSong = useCurrentSong((state) => state.setCurrentSong);

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

  if (error) return <div>Failed to load song list</div>;

  if (!songList)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className="flex flex-col items-center overflow-x-hidden overflow-y-scroll scroll-smooth h-[100vh] max-w-full">
      {songList?.map((song, index) => (
        <div
          key={index}
          className="relative flex flex-col items-center p-4 w-full max-w-md"
        >
          <div className="absolute inset-0 -z-10 flex justify-center items-center w-full h-full">
            <Image
              src={
                `https://fpaeregzmenbrqdcpbra.supabase.co/storage/v1/object/public/images/${song.image_path}` ||
                ""
              }
              alt={song.title || ""}
              fill
              className="object-cover blur-lg"
            />
          </div>
          <div className="relative z-10 flex flex-col items-center bg-white bg-opacity-80 p-4 rounded-lg shadow-lg">
            <h2 className="font-bold text-lg text-center mb-1">{song.title}</h2>
            <p className="text-sm text-gray-700 text-center mb-4">
              {song.author}
            </p>
            <Image
              src={
                `https://fpaeregzmenbrqdcpbra.supabase.co/storage/v1/object/public/images/${song.image_path}` ||
                ""
              }
              alt={song.title || ""}
              width={300}
              height={300}
              className="rounded-lg mb-4"
            />
            <div className="flex items-center justify-between min-w-full">
              <button onClick={() => alert("Track Disliked")}>
                <FaHeartCircleXmark className="text-6xl text-rose-400 p-2 hover:bg-slate-50 transition-colors rounded-full" />
              </button>
              <button
                className="bg-pi-purple-main py-2 px-6 rounded-full text-white"
                onClick={() => handlePlay(song)}
              >
                Play
              </button>
              <button onClick={() => alert("Track Liked")}>
                <FaHeartCircleCheck className="text-6xl text-green-400 p-2 hover:bg-slate-50 transition-colors rounded-full" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiscoverList;
