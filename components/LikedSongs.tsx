import { useEffect, useState } from "react";
import { Database } from "../types_db";
import fetchUserLikedSongs from "../utils/fetchUserLikedSongs";
import { useAuth } from "../hooks/useAuth";
import { currentSong as useCurrentSong } from "../hooks/useCurrentSong";
import Image from "next/image";
import { FaHeart, FaTimes } from "react-icons/fa";
import { createClient } from "../utils/supabase/component";

const supabase = createClient();

type Song = Database["public"]["Tables"]["songs"]["Row"];

const LikedSongs = () => {
  const { user } = useAuth();
  const { currentSong, setCurrentSong } = useCurrentSong();
  const [likedSongs, setLikedSongs] = useState<Song[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      if (user) {
        try {
          const songs = await fetchUserLikedSongs(user?.id || "");
          setLikedSongs(songs);
          if (songs.length > 0) {
            setCurrentSong(songs[0]);
          }
        } catch (error) {
          console.error("Error fetching liked songs:", error);
        }
      }
    };
    fetchSongs();
  }, [user, setCurrentSong]);

  const handlePlay = async (song: Song) => {
    try {
      await fetch("/api/current-song", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ song }),
      });
      setCurrentSong(song);
    } catch (error) {
      console.error("Error playing song:", error);
    }
  };

  const playRandomSong = () => {
    if (likedSongs && likedSongs.length > 0) {
      const randomNum = Math.floor(Math.random() * likedSongs.length);
      handlePlay(likedSongs[randomNum]);
    }
  };

  const handleLike = async (song: Song) => {
    if (!user) return;
    try {
      // Check if the like already exists
      const { data, error: selectError } = await supabase
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", song.id)
        .single();

      if (selectError && selectError.code !== "PGRST116") {
        throw new Error(selectError.message);
      }

      if (data) {
        console.log("Song already liked");
        return;
      }

      // Insert a new like if it doesn't exist
      const { error: insertError } = await supabase
        .from("liked_songs")
        .insert({ user_id: user.id, song_id: song.id });

      if (insertError) {
        throw new Error(insertError.message);
      }
    } catch (error) {
      console.error("Error liking song:", error);
    }
  };

  if (!currentSong) {
    return <div>Loading...</div>; // or return null if you prefer to show nothing while loading
  }

  const imageUrl = currentSong?.image_path
    ? `https://fpaeregzmenbrqdcpbra.supabase.co/storage/v1/object/public/images/${currentSong.image_path}`
    : "";

  return (
    <div className="relative z-10 mb-32 flex flex-col items-center justify-center h-[90vh] w-[90vw] max-w-md max-h-[90vh] p-4 bg-black bg-opacity-50 rounded-lg">
      {currentSong?.image_path && (
        <Image
          src={imageUrl}
          alt={currentSong.title || "Current Song"}
          width={300}
          height={300}
          className="rounded-lg object-cover mb-6"
        />
      )}
      <div className="text-center text-white">
        <h2 className="text-2xl font-bold mb-2">{currentSong?.title}</h2>
        <p className="text-lg">{currentSong?.author}</p>
      </div>
      <div className="absolute bottom-10 flex space-x-10">
        <button
          className="text-5xl text-white p-4 bg-gray-900 bg-opacity-50 rounded-full"
          onClick={playRandomSong}
        >
          <FaTimes />
        </button>
        <button
          className="text-5xl text-white p-4 bg-red-500 rounded-full"
          onClick={() => {
            if (currentSong) {
              handleLike(currentSong);
              playRandomSong();
            }
          }}
        >
          <FaHeart />
        </button>
      </div>
    </div>
  );
};

export default LikedSongs;
