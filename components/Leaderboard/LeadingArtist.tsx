import { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/utils/supabase/component";
import { currentSong as useCurrentSong } from "@/hooks/useCurrentSong";
import { Database } from "@/types_db";

type Song = Database["public"]["Tables"]["songs"]["Row"];

const supabase = createClient();

type LeadingArtistProps = {
  index: number;
  song: Song;
  numberOfSwipes: number;
};

const LeadingArtist: FunctionComponent<LeadingArtistProps> = ({
  index,
  song,
  numberOfSwipes,
}) => {
  const { user, isLoading, error, signOut } = useAuth();
  const [profileId, setProfileId] = useState<string | null>(null);
  const { setCurrentSong } = useCurrentSong();

  useEffect(() => {
    const fetchUserId = async () => {
      if (song.author) {
        const { data, error } = await supabase
          .from("songs")
          .select("user_id")
          .eq("author", song.author);

        if (error) {
          console.error("Error fetching user ID:", error);
        } else if (data && data.length > 0) {
          setProfileId(data[0].user_id);
        } else {
          setProfileId(null);
        }
      }
    };

    fetchUserId();
  }, [song.author]);

  const handlePlay = async (song: Song) => {
    setCurrentSong(song);
  };

  const profileLink = profileId ? `/profile/${profileId}` : "#";

  return (
    <div
      id={`leader-container-${index}`}
      className="flex space-x-4 p-4 rounded-lg"
    >
      <div
        id="avatar-container"
        className={`
        rounded-[.5rem]
        ${
          index === 0
            ? "border-2 border-solid border-pi-purple-main shadow-md shadow-pi-purple-main"
            : index === 1
              ? "border-2 border-solid border-pi-purple-main shadow-md shadow-pi-purple-main/70"
              : index === 2
                ? "border-2 border-solid border-pi-purple-main shadow-md shadow-pi-purple-main/40"
                : ""
        }`}
      >
        <Image
          className="min-w-[70px] rounded-md aspect-square object-cover hover:cursor-pointer"
          src={`https://fpaeregzmenbrqdcpbra.supabase.co/storage/v1/object/public/images/${song.image_path}`}
          alt="Profile Image"
          width={70}
          height={70}
          onClick={() => handlePlay(song)}
        />
      </div>
      <div>
        <div
          id="artist-name"
          className="text-xl font-semibold overflow-hidden max-w-[200px] text-nowrap text-ellipsis"
        >
          {song.title}
        </div>
        <div id="author-name" className="text-sm text-gray-700">
          {profileId ? (
            <Link href={profileLink}>{song.author}</Link>
          ) : (
            <span>{song.author}</span>
          )}
        </div>
        <div id="swipe-number-container" className="text-sm text-gray-500">
          {numberOfSwipes}
        </div>
      </div>
    </div>
  );
};

export default LeadingArtist;
