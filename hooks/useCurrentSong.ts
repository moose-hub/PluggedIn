import useSWR from "swr";
import useUser from "@/stores/useUser";
import useAuthModal from "@/stores/useAuthModal";
import useCurrentSong from "@/stores/useCurrentSong";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error || "An error occurred while fetching the data.",
    );
  }
  return response.json();
};

export const currentSong = () => {
  const { user } = useUser();
  const authModal = useAuthModal();
  const {
    data: currentSong,
    error,
    mutate,
  } = useSWR("/api/current-song", fetcher);

  const setCurrentSong = async (song: any) => {
    if (!user) {
      authModal.onOpen();
      return;
    }

    try {
      const response = await fetch("/api/current-song", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ song }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error setting the current song.");
      }

      const updatedSong = await response.json();
      useCurrentSong.setState({ currentSong: updatedSong });
      mutate();
    } catch (error) {
      console.error("Error setting current song:", error);
    }
  };

  return {
    currentSong,
    error,
    setCurrentSong,
  };
};
