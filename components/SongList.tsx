"use client";
import useSWR from "swr";
import fetchSongs from "@/utils/fetchSongs";
import { Database } from "@/types_db";
import Image from "next/image";
import useCurrentSong from "@/hooks/useCurrentSong";

type Song = Database["public"]["Tables"]["songs"]["Row"];

const SongList = () => {
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
    setCurrentSong(song); // Update Zustand state directly
  };

  if (error) return <div>Failed to load song list</div>;

  if (!songList)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className="grid grid-flow-col gap-8">
      {songList?.map((song, index) => (
        <div key={index} className="flex flex-col items-start p-2">
          <Image
            src={
              `https://fpaeregzmenbrqdcpbra.supabase.co/storage/v1/object/public/images/${song.image_path}` ||
              ""
            }
            alt={song.title || ""}
            width={250}
            height={250}
            className="aspect-square rounded-md gap-4 max-w-48"
          />
          <div className="flex flex-col mt-2 min-w-full items-start">
            <p className="text-left font-bold text-nowrap text-ellipsis">
              {song.title}
            </p>
            <p className="text-left text-black/80">{song.author}</p>
            <button
              className="bg-pi-purple-main p-2 min-w-full rounded-md text-white"
              onClick={() => handlePlay(song)}
            >
              Play
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongList;
