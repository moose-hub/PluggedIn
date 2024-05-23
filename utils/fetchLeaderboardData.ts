import { createClient } from "@/utils/supabase/component";
import { Database } from "@/types_db";

const supabase = createClient();

type LeaderboardEntry = {
  song_id: number;
  title: string;
  author: string;
  user_id: string;
  like_count: number;
  image_path: string | null;
};

export const fetchLeaderboardData = async (): Promise<LeaderboardEntry[]> => {
  try {
    // Fetch all songs
    const { data: songs, error: songsError } = await supabase
      .from("songs")
      .select("id, title, author, user_id, image_path");

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
      song_id: song.id,
      title: song.title || "Unknown Title",
      author: song.author || "Unknown Author",
      user_id: song.user_id || "Unknown User",
      like_count: likeCounts[song.id] || 0,
      image_path: song.image_path,
    }));

    // Sort by like_count in descending order
    leaderboard.sort((a, b) => b.like_count - a.like_count);

    return leaderboard;
  } catch (error) {
    console.error("Error fetching leaderboard data", error);
    return [];
  }
};
