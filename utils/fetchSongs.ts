import { createClient } from "@/utils/supabase/component";
import { Database } from "@/types_db";

const supabase = createClient();

const fetchSongs = async () => {
  try {
    const { data, error } = await supabase.from("songs").select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error fetching songs", error);
  }
};

export default fetchSongs;
