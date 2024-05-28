import { createClient } from "@/utils/supabase/component";
import { Database } from "@/types_db";

const supabase = createClient();

type Song = Database["public"]["Tables"]["songs"]["Row"];

export const fetchLikedSongs = async (userId: string): Promise<Song[]> => {
  try {
    const { data, error } = await supabase
      .from("liked_songs")
      .select(
        `
        song_id,
        songs (
          id,
          created_at,
          title,
          song_path,
          image_path,
          author,
          user_id
        )
      `,
      )
      .eq("user_id", userId);

    if (error) {
      throw new Error(error.message);
    }

    // Filter out any null entries and map to the required type
    return data
      .map((entry) => entry.songs)
      .filter((song): song is Song => song !== null);
  } catch (error) {
    console.error("Error fetching liked songs:", error);
    return [];
  }
};
