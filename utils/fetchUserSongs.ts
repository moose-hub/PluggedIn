import { createClient } from "./supabase/component";
import { Database } from "../types_db";

const supabase = createClient();

type Song = Database["public"]["Tables"]["songs"]["Row"];

const fetchUserLikedSongs = async (): Promise<Song[]> => {
  try {
    const { data, error: userError } = await supabase.auth.getUser();
    if (userError) {
      throw new Error(userError.message);
    }
    if (!data.user) {
      throw new Error("User is not logged in");
    }
    const userId = data.user.id;
    const { data: likedSongs, error: likedSongsError } = await supabase
      .from("liked_songs")
      .select(
        `
        song_id,
        songs (
          id,
          title,
          author,
          image_path
        )
      `,
      )
      .eq("user_id", userId);
    if (likedSongsError) {
      throw new Error(likedSongsError.message);
    }
    return likedSongs.map((entry: any) => entry.songs);
  } catch (error) {
    console.error("Error fetching user liked songs", error);
    return [];
  }
};

export default fetchUserLikedSongs;
