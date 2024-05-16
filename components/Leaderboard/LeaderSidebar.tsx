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
            className="block p-3 text-4xl font-bold tracking-normal text-gray-950/50 rounded-lg transition duration-150 ease-in-out w-full transform hover:text-gray-950 hover:bg-gray-100 text-center"
            aria-label="Link to leaderboard page"
          >
            <MdLeaderboard className="inline-block mr-2 h-8 w-8" /> Leaderboard
          </Link>
        </nav>
      </header>
      {/* Scrollable Container for Leaderboard */}
      <div className="flex-grow overflow-auto">
        <Leaderboard />
      </div>
      <footer className="mt-auto"></footer>
    </aside>
  );
};

export default LeaderSidebar;
