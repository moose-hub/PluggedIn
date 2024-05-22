import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useSongs = () => {
  const { data, error } = useSWR("/api/songs", fetcher);

  return {
    songs: data?.songs,
    isLoading: !error && !data,
    error: error,
  };
};
