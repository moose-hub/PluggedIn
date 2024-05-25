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
import { useAuth } from "./useAuth";
import { Database } from "@/types_db";

type User = Database["public"]["Tables"]["users"]["Row"];
type UserInsert = Database["public"]["Tables"]["users"]["Insert"];

const supabase = createClient();

const fetchUserData = async (id: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data || null;
};

export const useUserData = () => {
  const { user } = useAuth();
  const { data, error } = useSWR<User | null, Error>(
    user ? user.id : null,
    fetchUserData,
  );

  return {
    userData: data || null,
    loading: !error && !data,
    error,
  };
};
