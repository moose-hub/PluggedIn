import { createClient } from "@/utils/supabase/component";
import { Database } from "@/types_db";

const supabase = createClient();

type Song = Database["public"]["Tables"]["songs"]["Row"];

type LeaderboardEntry = {
  song: Song;
  like_count: number;
};

export const fetchLeaderboardData = async (): Promise<LeaderboardEntry[]> => {
  try {
    // Fetch all songs
    const { data: songs, error: songsError } = await supabase
      .from("songs")
      .select("*");

    if (songsError) {
      throw new Error(songsError.message);
    }

    if (!songs || songs.length === 0) {
      return [];
    }

    // Fetch likes for all songs
    const { data: likes, error: likesError } = await supabase
      .from("liked_songs")
      .select("song_id");

    if (likesError) {
      throw new Error(likesError.message);
    }

    // Count likes for each song
    const likeCounts = likes.reduce(
      (acc, like) => {
        acc[like.song_id] = (acc[like.song_id] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>,
    );

    // Merge songs with their like counts
    const leaderboard: LeaderboardEntry[] = songs.map((song) => ({
      song,
      like_count: likeCounts[song.id] || 0,
    }));

    // Sort by like_count in descending order
    leaderboard.sort((a, b) => b.like_count - a.like_count);

    return leaderboard;
  } catch (error) {
    console.error("Error fetching leaderboard data", error);
    return [];
  }
};
