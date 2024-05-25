import Link from "next/link";
import { MdLeaderboard } from "react-icons/md";
import Leaderboard from "./Leaderboard";

interface LeaderSidebarProps {
  className?: string;
}

const LeaderSidebar: React.FC<LeaderSidebarProps> = ({ className }) => {
  return (
    <aside
      className={`z-40 bg-white hidden lg:flex flex-col shadow-lg ${className}`}
      aria-label="leaderboard sidebar"
    >
      <header>
        <nav>
          <Link
            href="/leaderboard"
            className="text-3xl flex items-center gap-2 font-bold p-4"
            aria-label="Leaderboard sidebar title"
          >
            <MdLeaderboard className="flex items-start" />
            Leaderboard
          </Link>
        </nav>
      </header>
      <div className="overflow-y-auto flex-1">
        <Leaderboard />
      </div>
    </aside>
  );
};

export default LeaderSidebar;
