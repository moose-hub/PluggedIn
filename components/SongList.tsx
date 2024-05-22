"use client";
import useSWR from "swr";
import fetchSongs from "@/utils/fetchSongs";
import { Database } from "@/types_db";
import Image from "next/image";
import useCurrentSong from "@/stores/useCurrentSong";

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
    <div>
      <h2 className="text-2xl mx-4 font-bold">New Releases</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 p-4">
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
    </div>
  );
};

export default SongList;
