import useSWR from "swr";
import useUser from "@/stores/useUser";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 401) {
      return null;
    }
    throw new Error("An error occurred while fetching the data.");
  }
  return response.json();
};

export const useAuth = () => {
  const { data, error, isLoading } = useSWR("/api/auth", fetcher, {
    onSuccess: (data) => {
      if (data) {
        useUser.setState({ user: data.user });
      } else {
        useUser.setState({ user: null });
      }
    },
  });

  const user = useUser((state) => state.user);

  const signOut = async () => {
    const response = await fetch("/api/auth/signout", {
      method: "POST",
    });

    if (response.ok) {
      useUser.getState().resetUser();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error whilst signing out");
    }
  };

  return {
    user,
    isLoading,
    error,
    signOut,
  };
};
