import Link from "next/link";
import { MdLeaderboard } from "react-icons/md";
import Leaderboard from "./Leaderboard";

const LeaderSidebar = () => {
  return (
    <aside
      className="
        sidebar 
        z-40 
        bg-white 
        p-4 
        flex flex-col 
        shadow-lg"
      aria-label="leaderboard sidebar"
    >
      <header>
        <nav>
          <Link
            href="/leaderboards"
            className="text-3xl flex items-center gap-2 font-bold p-4"
            aria-label="Leaderboard sidebar title"
          >
            <MdLeaderboard className="flex items-start" />
            Leaderboard
          </Link>
        </nav>
      </header>
      <div className="overflow-hidden">
        <Leaderboard />
      </div>
    </aside>
  );
};

export default LeaderSidebar;
