import Leaderboard from "@/components/Leaderboard/Leaderboard";
import Link from "next/link";
import { MdLeaderboard } from "react-icons/md";

const LeaderboardMobile = () => {
  return (
    <>
      <div className="flex overflow-y-auto flex-1 h-screen">
        <div className="w-full max-w-7xl">
          <Leaderboard />
        </div>
      </div>
    </>
  );
};

export default LeaderboardMobile;
