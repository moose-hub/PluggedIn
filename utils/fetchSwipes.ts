import { createClient } from "@/utils/supabase/component";

const supabase = createClient();

const fetchSwipeCount = async (userId: string): Promise<number> => {
  try {
    // Fetch the user's song IDs
    const { data: songs, error: songsError } = await supabase
      .from("songs")
      .select("id")
      .eq("user_id", userId);

    if (songsError) {
      throw new Error(songsError.message);
    }

    if (!songs || songs.length === 0) {
      return 0;
    }

    const songIds = songs.map((song) => song.id);

    // Count the number of likes for the user's songs
    const { count, error: likesError } = await supabase
      .from("liked_songs")
      .select("song_id", { count: "exact" })
      .in("song_id", songIds);

    if (likesError) {
      throw new Error(likesError.message);
    }

    return count || 0;
  } catch (error) {
    console.error("Error fetching swipe count", error);
    return 0;
  }
};

export default fetchSwipeCount;
