"use client";
import { useEffect } from "react";
import { Database } from "@/types_db";
import Image from "next/image";
import { FaHeartCircleCheck, FaHeartCircleXmark } from "react-icons/fa6";
import { createClient } from "@/utils/supabase/component";

import { currentSong as useCurrentSong } from "@/hooks/useCurrentSong";
import { useAuth } from "@/hooks/useAuth";
import { useSongs } from "@/hooks/useSongs";

const supabase = createClient();

type Song = Database["public"]["Tables"]["songs"]["Row"];

const DiscoverList = () => {
  const { user } = useAuth();
  const { songs: songList, error, isLoading } = useSongs();
  const { currentSong, setCurrentSong } = useCurrentSong();

  const handlePlay = async (song: Song) => {
    setCurrentSong(song);
  };

  const playRandomSong = () => {
    if (songList && songList.length > 0) {
      const randomNum = Math.floor(Math.random() * songList.length);
      handlePlay(songList[randomNum]);
    }
  };

  const handleLike = async (song: Song) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("liked_songs")
        .insert({ user_id: user.id, song_id: song.id });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error("Error liking song:", error);
    }
  };

  useEffect(() => {
    if (songList && songList.length > 0) {
      playRandomSong();
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
    <div className="flex flex-col items-center overflow-x-hidden overflow-y-scroll scroll-smooth h-[100vh] w-full p-4 snap-y snap-mandatory">
      <div className="relative flex flex-col items-center p-8 w-full max-w-2xl h-[600px] mb-4 snap-start border-4 border-gray-300 rounded-lg shadow-xl">
        <div className="absolute top-4 left-4 text-left p-2 rounded-lg">
          <h2 className="font-bold text-2xl">{currentSong?.title}</h2>
          <p className="text-lg">{currentSong?.author}</p>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          {currentSong?.image_path && (
            <div className="flex justify-center items-center w-[300px] h-[300px]">
              <Image
                src={`https://fpaeregzmenbrqdcpbra.supabase.co/storage/v1/object/public/images/${currentSong.image_path}`}
                alt={currentSong.title || "Current Song"}
                width={300}
                height={300}
                className="rounded-lg object-cover"
              />
            </div>
          )}
        </div>
        <div className="absolute bottom-4 flex items-center justify-center w-full space-x-32 z-10">
          <button onClick={playRandomSong}>
            <FaHeartCircleXmark className="text-7xl text-white p-2 hover:bg-slate-50 transition-colors rounded-full hover:text-rose-400" />
          </button>
          <button
            onClick={() => {
              if (currentSong) {
                handleLike(currentSong);
                playRandomSong();
              }
            }}
          >
            <FaHeartCircleCheck className="text-7xl text-green-400 p-2 hover:bg-slate-50 transition-colors rounded-full" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscoverList;
