"use client";
import useSWR from "swr";
import Image from "next/image";

import { currentSong as useCurrentSong } from "@/hooks/useCurrentSong";
import useAuthModal from "@/stores/useAuthModal";
import fetchSongs from "@/utils/fetchSongs";
import { Database } from "@/types_db";

type Song = Database["public"]["Tables"]["songs"]["Row"];

const SongList = () => {
  const { data: songList, error } = useSWR<Song[] | undefined>(
    "songs",
    fetchSongs,
  );

  const { setCurrentSong } = useCurrentSong();

  const handlePlay = async (song: Song) => {
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
    <>
      <div className="p-4">
        <h2 className="text-2xl mx-4 font-bold">All Songs</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] mb-8">
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
    </>
  );
};

export default SongList;
