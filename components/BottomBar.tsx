"use client";

import { FaHeart } from "react-icons/fa";
import { FaHouse, FaMagnifyingGlass } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import Link from "next/link";
import Logo from "./Logo";
import { MdLeaderboard } from "react-icons/md";
import { PiMusicNotesPlusFill } from "react-icons/pi";
import UserSpotlight from "./UserSpotlight";
import { usePathname } from "next/navigation";
import useAuthModal from "@/stores/useAuthModal";
import useUploadModal from "@/stores/useUploadModal";
import useSWR from "swr";
import { createClient } from "@/utils/supabase/component";

const supabase = createClient();

const fetchUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

const BottomBar = () => {
  const pathName = usePathname();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { data: user, error } = useSWR("user", fetchUser);
  const profileLink = `/profile/${user?.id}`;

  const menuList = [
    {
      name: "Home",
      icon: <FaHouse className="inline-block mr-2 h-6 w-6" />,
      href: "/",
      aria: "Link to home page",
    },
    {
      name: "Discover",
      icon: <FaMagnifyingGlass className="inline-block mr-2 h-6 w-6" />,
      href: "/discover",
      aria: "Link to discover page",
    },
    {
      name: "Upload Track",
      icon: <PiMusicNotesPlusFill className="inline-block mr-2 h-6 w-6" />,
      href: "",
      aria: "Link to upload music",
    },
    {
      name: "Leaderboard",
      icon: <MdLeaderboard className="inline-block mr-2 h-6 w-6" />,
      href: "/leaderboard",
      aria: "Link to leaderboard page",
    },
    {
      name: "Profile",
      icon: <IoPersonSharp className="inline-block mr-2 h-6 w-6" />,
      href: profileLink,
      aria: "Link to profile",
    },
  ];

  const handleUploadClick = () => {
    if (!user) {
      return authModal.onOpen();
    } else {
      return uploadModal.onOpen();
    }
  };

  const handleLoginClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
  };

  if (error) {
    return <div>Error loading user data.</div>;
  }
  return (
    <nav className="flex bg-white fixed bottom-0 left-0 z-50 w-[100vw] justify-around items-center h-16 lg:hidden">
      {menuList.map((item) => (
        <div
          key={item.href}
          className={`flex items-center justify-center h-full w-full ${pathName === item.href ? "text-pi-purple-main" : "text-gray-500"} hover:text-pi-purple-main transition duration-150 ease-in-out`}
        >
          {item.name === "Upload Track" ? (
            <button onClick={handleUploadClick} aria-label={item.aria}>
              {item.icon}
            </button>
          ) : item.name === "Profile" ? (
            <button onClick={handleLoginClick} aria-label={item.aria}>
              {item.icon}
            </button>
          ) : (
            <Link href={item.href} aria-label={item.aria}>
              {item.icon}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default BottomBar;
