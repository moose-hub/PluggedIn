import Leaderboard from "@/components/Leaderboard/Leaderboard";
import Link from "next/link";
import { MdLeaderboard } from "react-icons/md";

const LeaderboardMobile = () => {
  return (
    <>
      <header>
        <nav className="mb-14">
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
      <div className="flex justify-center items-center overflow-y-auto flex-1 h-screen mt-16">
        <div className="w-full max-w-7xl mx-auto p-4">
          <Leaderboard />
        </div>
      </div>
    </>
  );
};

export default LeaderboardMobile;
