import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useUserSongs = (uuid: string) => {
  const { data, error } = useSWR(
    uuid ? `/api/songs/user?uuid=${uuid}` : null,
    fetcher,
  );

  return {
    songs: data?.songs,
    isLoading: !error && !data,
    error: error,
  };
};
