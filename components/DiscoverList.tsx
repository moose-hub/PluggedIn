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
    <div className="flex flex-col items-center overflow-x-hidden overflow-y-scroll scroll-smooth w-full p-4">
      <div className="relative flex flex-col p-8 gap-4">
        <div className="text-left p-2 rounded-lg">
          <h2 className="font-bold text-2xl max-w-full text-pretty">
            {currentSong?.title}
          </h2>
          <p className="text-lg">{currentSong?.author}</p>
        </div>
        <div className="relative z-10 flex flex-col justify-center h-full w-full">
          {currentSong?.image_path && (
            <div className="flex justify-center w-[300px] h-[300px]">
              <Image
                src={`https://fpaeregzmenbrqdcpbra.supabase.co/storage/v1/object/public/images/${currentSong.image_path}`}
                alt={currentSong.title || "Current Song"}
                width={300}
                height={300}
                className="rounded-lg object-cover shadow-2xl aspect-square"
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between w-full z-10">
          <button onClick={playRandomSong}>
            <FaHeartCircleXmark className="text-7xl text-pi-purple-shadow p-2 hover:bg-slate-50 transition-colors rounded-full hover:text-pi-purple-dark" />
          </button>
          <button
            onClick={() => {
              if (currentSong) {
                handleLike(currentSong);
                playRandomSong();
              }
            }}
          >
            <FaHeartCircleCheck className="text-7xl text-pi-purple-main p-2 hover:bg-slate-50 transition-colors rounded-full" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscoverList;
