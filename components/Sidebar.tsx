"use client";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { FaMagnifyingGlass, FaHouse } from "react-icons/fa6";
import { PiMusicNotesPlusFill } from "react-icons/pi";
import { MdLeaderboard } from "react-icons/md";
import Logo from "./Logo";
import UserSpotlight from "./UserSpotlight";
import { usePathname } from "next/navigation";

const Sidebar = () => {
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
      name: "Likes",
      icon: <FaHeart className="inline-block mr-2 h-6 w-6" />,
      href: "/likes",
      aria: "Link to liked tracks",
    },
    {
      name: "Upload Track",
      icon: <PiMusicNotesPlusFill className="inline-block mr-2 h-6 w-6" />,
      href: "/create-music",
      aria: "Link to upload music",
    },
  ];
  return (
    <aside
      className="sidebar relative z-40 w-96 min-h-screen min-w-80 bg-white p-4 flex flex-col justify-between"
      aria-label="Sidebar navigation"
    >
      <header>
        <div className="flex items-center mb-16">
          <Logo />
        </div>
        <nav>
          <ul className="flex flex-col gap-4 ">
            {menuList.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`block p-3 text-2xl font-bold tracking-normal text-gray-950/50 rounded-lg transition duration-150 ease-in-out w-full transform hover:text-gray-950/100 hover:bg-white ${pathName === item.href ? "bg-white text-gray-950" : ""}`}
                  aria-label={item.aria}
                >
                  {item.icon} {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <footer className="mb-28">
        <UserSpotlight />
      </footer>
    </aside>
  );
};

export default Sidebar;
