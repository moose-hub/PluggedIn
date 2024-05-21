import { useUserSongs } from "@/hooks/useUserSongs";
import { createClient } from "@/utils/supabase/component";
import useSWR from "swr";

const supabase = createClient();

const fetchSongs = async ({ uuid }: { uuid: string }) => {
  const { songs, isLoading, error } = useUserSongs(uuid);

  console.log(songs);
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
