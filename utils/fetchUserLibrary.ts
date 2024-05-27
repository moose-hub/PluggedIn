import { createClient } from "./supabase/component";
import { Database } from "../types_db";

const supabase = createClient();

type Song = Database["public"]["Tables"]["songs"]["Row"];

const fetchUserLibrary = async (userId: string): Promise<Song[]> => {
  try {
    const { data: librarySongs, error: librarySongsError } = await supabase
      .from("songs")
      .select("*")
      .eq("user_id", userId);
    if (librarySongsError) {
      throw new Error(librarySongsError.message);
    }
    return librarySongs || [];
  } catch (error) {
    console.error("Error fetching user liked songs", error);
    return [];
  }
};

export default fetchUserLibrary;
