import useSWR from "swr";
import { createClient } from "@/utils/supabase/component";
import { useAuth } from "./useAuth";

const supabase = createClient();

const fetchUserData = async (id: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useUserData = () => {
  const { user } = useAuth();
  const { data, error } = useSWR(user ? user.id : null, fetchUserData);

  return {
    userData: data,
    loading: !error && !data,
    error,
  };
};
