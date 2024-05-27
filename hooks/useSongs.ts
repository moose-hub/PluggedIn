import useSWR from "swr";
import { Database } from "@/types_db";

type Song = Database["public"]["Tables"]["songs"]["Row"];

const fetcher = async (url: string): Promise<Song[]> => {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch songs");
  }

  return data.songs;
};

export const useSongs = () => {
  const { data, error } = useSWR("/api/songs", fetcher);

  return {
    songs: data,
    isLoading: !error && !data,
    error,
  };
};
