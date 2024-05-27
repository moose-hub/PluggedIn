"use client";
import { Database } from "@/types_db";
import Image from "next/image";
import Button from "../Button";
import { useState } from "react";
import { BiSolidDonateHeart } from "react-icons/bi";
import SongList from "../SongList";
import UserSongs from "../UserSongs";
import LikedContent from "../Profile/Likes/LikedContent";
import { useAuth } from "@/hooks/useAuth";

type User = Database["public"]["Views"]["users_view"]["Row"];

interface ProfileProps {
  user: User | null;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const { user: userData } = useAuth();
  const [activeTab, setActiveTab] = useState(0);

  const handleClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      <div className="flex flex-col p-4 mx-2">
        <div className="flex flex-col xl:flex-row gap-4 mb-12 z-10">
          {user?.avatar_url !== null && user?.avatar_url !== undefined ? (
            <Image
              src={`https://fpaeregzmenbrqdcpbra.supabase.co/storage/v1/object/public/images/${user?.avatar_url}`}
              alt="User profile picture"
              width={250}
              height={250}
              quality={100}
              className="rounded-full max-h-[250px] w-auto h-auto"
              priority
            />
          ) : (
            <Image
              src={`https://fpaeregzmenbrqdcpbra.supabase.co/storage/v1/object/public/images/image-placeholder-profile.png`}
              alt="placeholder profile picture"
              width={250}
              height={250}
              quality={100}
              className="rounded-full max-h-[250px]"
            />
          )}
          <div className="flex flex-col justify-end mx-4 gap-2">
            <h2 className="xl:text-7xl lg:text-5xl text-4xl font-bold">
              {user?.username ? user?.username : "placeholder"}
            </h2>
            <p className="text-black/80 text-lg text-pretty">
              {user?.description}
            </p>
          </div>
        </div>
        <div>
          <ul className="flex gap-8 text-xl lg:text-2xl font-bold items-center px-4 mb-4">
            <li
              className={`py-2 border-b-2 cursor-pointer ${activeTab === 0 ? "border-pi-purple-main" : "border-transparent transition-colors"}`}
              onClick={() => handleClick(0)}
            >
              Library
            </li>
            <li
              className={`py-2 border-b-2 cursor-pointer ${activeTab === 1 ? "border-pi-purple-main" : "border-transparent transition-colors"}`}
              onClick={() => handleClick(1)}
            >
              My Favourites
            </li>
            <li className="ml-auto">
              <Button className="p-2 flex gap-4 items-baseline font-semibold">
                <BiSolidDonateHeart />
              </Button>
            </li>
          </ul>
        </div>
        <div>{activeTab === 0 ? <UserSongs /> : <LikedContent />}</div>
      </div>
    </>
  );
};

export default Profile;
