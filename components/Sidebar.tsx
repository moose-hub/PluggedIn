"use client";
import Link from "next/link";
import { FaMagnifyingGlass, FaHouse } from "react-icons/fa6";
import { PiMusicNotesPlusFill } from "react-icons/pi";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import LoginButton from "./LoginButton";
import { createClient } from "@/utils/supabase/component";
import useSWR from "swr";
import useAuthModal from "@/stores/useAuthModal";
import useUploadModal from "@/stores/useUploadModal";

const supabase = createClient();

const fetchUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
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
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { data: user, error } = useSWR("user", fetchUser);

  const handleClick = () => {
    if (!user) {
      return authModal.onOpen();
    } else {
      return uploadModal.onOpen();
    }
  };

  if (error) {
    return <div>Error loading user data.</div>;
  }

  return (
    <aside
      className={`relative z-40 min-w-80 bg-white p-4 hidden lg:flex flex-col justify-between ${className}`}
      aria-label="Sidebar navigation"
    >
      <header>
        <div className="flex items-center mb-16">
          <Logo />
        </div>
        <nav>
          <ul className="flex flex-col gap-4">
            {menuList.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`block p-3 text-2xl font-bold tracking-normal text-gray-950/50 rounded-lg transition duration-150 ease-in-out w-full transform hover:text-gray-950/100 hover:bg-white ${
                    pathName === item.href ? "bg-white text-gray-900" : ""
                  }`}
                  aria-label={item.aria}
                >
                  {item.name === "Upload Track" ? (
                    <button onClick={handleClick}>
                      {item.icon} {item.name}
                    </button>
                  ) : (
                    <span>
                      {item.icon} {item.name}
                    </span>
                  )}
                </Link>
              </li>
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
