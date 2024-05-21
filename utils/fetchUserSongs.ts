import { createClient } from "@/utils/supabase/component";
import { Database } from "@/types_db";

const supabase = createClient();

const fetchUserSongs = async () => {
  try {
    // Fetch the current user details using the existing session
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      throw new Error(userError.message);
    }

    if (!user) {
      throw new Error("User is not logged in");
    }

    const userId = user.id;

    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error fetching user songs", error);
    return [];
  }
};

export default fetchUserSongs;
