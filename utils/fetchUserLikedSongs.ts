import { createClient } from "./supabase/component";
import { Database } from "../types_db";

const supabase = createClient();
type Song = Database["public"]["Tables"]["songs"]["Row"];

const fetchUserLikedSongs = async (id: string): Promise<Song[]> => {
  console.log("running fetch user liked songs");
  try {
    const { data: likedSongs, error: likedSongsError } = await supabase
      .from("liked_songs")
      .select(
        `
        song_id,
        songs (
          id,
          title,
          author,
          image_path,
          song_path
        )
      `,
      )
      .eq("user_id", id);
    if (likedSongsError) {
      throw new Error(likedSongsError.message);
    }

    const songs = likedSongs
      .map((entry: any) => entry.songs)
      .filter((song) => song !== null);
    return songs;
  } catch (error) {
    console.error("Error fetching user liked songs", error);
    return [];
  }
};

export default fetchUserLikedSongs;
