// import useSWR from "swr";
// import { createClient } from "@/utils/supabase/component";
// import { useAuth } from "./useAuth";
// import { Database } from "@/types_db"

// type User = Database["public"]["Tables"]["users"]["Row"];
// type UserInsert = Database["public"]["Tables"]["users"]["Insert"];

// const supabase = createClient();

// const fetchUserData = async (id: string): Promise<User | null> => {
//   const { data, error } = await supabase
//     .from<User, UserInsert>("users")
//     .select("*")
//     .eq("id", id)
//     .single();

//   if (error) {
//     throw new Error(error.message);
//   }

//   return data || null;
// };

// export const useUserData = () => {
//   const { user } = useAuth();
//   const { data, error } = useSWR<User | null, Error>(user ? user.id : null, fetchUserData);

//   return {
//     userData: data || null,
//     loading: !error && !data,
//     error,
//   };
// };

import useSWR from "swr";
import { createClient } from "@/utils/supabase/component";
import { Database } from "@/types_db";
import fetchUserLikedSongs from "@/utils/fetchUserLikedSongs";

type User = Database["public"]["Tables"]["users"]["Row"];
type UserInsert = Database["public"]["Tables"]["users"]["Insert"];

const supabase = createClient();

const fetchUserData = async (id: string) => {
  const { data, error } = await supabase
    .from("users_view")
    .select("id, username, description, avatar_url")
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data[0] || null;
};

export const useUserData = (id: string) => {
  const { data, error } = useSWR(id ? id : null, fetchUserData);
  const { data: songData, error: songError } = useSWR(
    id ? id : null,
    fetchUserLikedSongs,
  );

  return {
    userData: data || null,
    songData: songData,
    loading: !error && !data && !songError,
    error,
  };
};
