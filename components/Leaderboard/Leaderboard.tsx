"use client";
import { useEffect, useState } from "react";
import { fetchLeaderboardData } from "@/utils/fetchLeaderboardData"; // Import the function
import LeadingArtist from "./LeadingArtist";

type LeaderboardEntry = {
  song_id: number;
  title: string;
  author: string;
  user_id: string;
  like_count: number;
  image_path: string | null;
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
    index,
    image: `https://fpaeregzmenbrqdcpbra.supabase.co/storage/v1/object/public/images/${leader.image_path}`,
    name: leader.title,
    author: leader.author,
    numberOfSwipes: leader.like_count,
  }));

  return (
    <div className="flex items-center mb-28 overflow-hidden">
      <div className="rounded">
        {sortedLeaders.map((leader) => (
          <LeadingArtist
            key={leader.index}
            index={leader.index}
            image={leader.image}
            name={leader.name}
            author={leader.author}
            numberOfSwipes={leader.numberOfSwipes}
          />
        ))}
      </div>
    </div>
  );
}
