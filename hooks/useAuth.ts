import useSWR from "swr";
import useUser from "@/stores/useUser";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return response.json();
};

export const useAuth = () => {
  const { data, error, isLoading } = useSWR("/api/auth/route.ts", fetcher, {
    onSuccess: (data) => {
      useUser.setState({ user: data });
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
