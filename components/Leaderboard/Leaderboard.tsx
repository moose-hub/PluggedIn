"use client";
import { useEffect, useState } from "react";
import { fetchLeaderboardData } from "@/utils/fetchLeaderboardData";
import LeadingArtist from "./LeadingArtist";
import { Database } from "@/types_db";

type Song = Database["public"]["Tables"]["songs"]["Row"];

type LeaderboardEntry = {
  song: Song;
  like_count: number;
};

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLeaderboardData();
        setLeaderboard(data);
      } catch (err) {
        setError("Failed to fetch leaderboard data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const sortedLeaders = leaderboard.map((leader, index) => ({
    song: leader.song,
    numberOfSwipes: leader.like_count,
  }));

  return (
    <div className="flex items-center overflow-hidden">
      <div className="rounded mb-28">
        {sortedLeaders.map((leader, index) => (
          <LeadingArtist
            key={index}
            index={index}
            song={leader.song}
            numberOfSwipes={leader.numberOfSwipes}
          />
        ))}
      </div>
    </div>
  );
}
