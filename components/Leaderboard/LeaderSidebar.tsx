import Link from "next/link";
import { MdLeaderboard } from "react-icons/md";
import Leaderboard from "./Leaderboard";

const LeaderSidebar = () => {
  return (
    <aside
      className="sidebar fixed right-0 top-0 z-40 w-96 h-screen bg-white p-4 flex flex-col shadow-lg"
      aria-label="Sidebar navigation"
    >
      <header>
        <nav>
          <Link
            href="/leaderboards"
            className="text-3xl flex items-center gap-2 font-bold p-4"
            aria-label="Link to leaderboard page"
          >
            <MdLeaderboard className="flex items-start" /> Leaderboard
          </Link>
        </nav>
      </header>
      {/* Scrollable Container for Leaderboard */}
      <div className="overflow-y-scroll scroll">
        <Leaderboard />
      </div>
      <footer className="mt-auto"></footer>
    </aside>
  );
};

export default LeaderSidebar;
