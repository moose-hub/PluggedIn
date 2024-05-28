"use client";
import Link from "next/link";
import { FaMagnifyingGlass, FaHouse } from "react-icons/fa6";
import { PiMusicNotesPlusFill } from "react-icons/pi";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import LoginButton from "./LoginButton";
import useUploadModal from "@/stores/useUploadModal";
import { toast } from "sonner";

import { useAuth } from "@/hooks/useAuth";
import useAuthModal from "@/stores/useAuthModal";
import { useEffect, useState } from "react";
import useUser from "@/stores/useUser";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState(1);
  const pathName = usePathname();
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
  ];

  const { user, isLoading, error, signOut } = useAuth();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();

  const handleClick = () => {
    if (!user) {
      return authModal.onOpen();
    } else {
      return uploadModal.onOpen();
    }
  };

  const handleActiveTab = () => {
    if (pathName === "/") {
      setActiveTab(0);
    } else if (pathName === "/discover") {
      setActiveTab(1);
    } else {
      setActiveTab(-1);
    }
  };

  useEffect(() => {
    handleActiveTab();
  }, [activeTab]);

  return (
    <aside
      className={`z-40 bg-pi-offwhite-main p-4 hidden lg:flex flex-col justify-between ${className}`}
      aria-label="Sidebar navigation"
    >
      <header>
        <div className="flex items-center mb-16">
          <Logo />
        </div>
        <nav>
          <ul className="flex flex-col gap-4">
            {menuList.map((item, index) => (
              <Link
                href={item.href}
                className={`
                ${activeTab === index ? "bg-white text-black" : "text-gray-400"}
                block p-3 text-2xl font-bold tracking-normal  rounded-lg transition duration-150 ease-in-out w-full transform hover:text-gray-950/100 hover:bg-white `}
                aria-label={item.aria}
                key={`${index}-${item.name}`}
                onClick={() => handleActiveTab()}
              >
                <li>
                  {item.name === "Upload Track" ? (
                    <button onClick={handleClick}>
                      {item.icon} {item.name}
                    </button>
                  ) : (
                    <span>
                      {item.icon} {item.name}
                    </span>
                  )}
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </header>
      <footer className="mb-28">
        <LoginButton />
      </footer>
    </aside>
  );
};

export default Sidebar;
