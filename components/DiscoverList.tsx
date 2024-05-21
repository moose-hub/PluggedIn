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
    <div className="flex flex-col items-center overflow-x-hidden overflow-y-scroll scroll-smooth h-[100vh] max-w-full p-4 snap-y snap-mandatory">
      {songList?.map((song, index) => (
        <div
          key={index}
          className="relative flex flex-col items-center p-8 w-full max-w-2xl mb-8 snap-start"
        >
          <div className="absolute inset-0 -z-10 flex justify-center items-center w-[90%] h-[90%]">
            <Image
              src={
                `https://fpaeregzmenbrqdcpbra.supabase.co/storage/v1/object/public/images/${song.image_path}` ||
                ""
              }
              alt={song.title || ""}
              fill
              className="object-cover blur-md rounded-lg"
            />
          </div>
          <div className="relative z-10 flex flex-col items-center text-white p-8 rounded-lg shadow-lg">
            <h2 className="font-bold text-2xl text-center mb-2">
              {song.title}
            </h2>
            <p className="text-lg text-gray-200 text-center mb-4">
              {song.author}
            </p>
            <Image
              src={
                `https://fpaeregzmenbrqdcpbra.supabase.co/storage/v1/object/public/images/${song.image_path}` ||
                ""
              }
              alt={song.title || ""}
              width={400}
              height={400}
              className="rounded-lg mb-6"
            />
            <div className="flex items-center justify-between w-full">
              <button onClick={() => alert("Track Disliked")}>
                <FaHeartCircleXmark className="text-7xl text-rose-400 p-2 hover:bg-slate-50 transition-colors rounded-full" />
              </button>
              <button
                className="bg-pi-purple-main py-3 px-8 rounded-full text-white text-lg"
                onClick={() => handlePlay(song)}
              >
                Play
              </button>
              <button onClick={() => alert("Track Liked")}>
                <FaHeartCircleCheck className="text-7xl text-green-400 p-2 hover:bg-slate-50 transition-colors rounded-full" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiscoverList;
