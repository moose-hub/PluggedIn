import { createClient } from "@/utils/supabase/component";

const supabase = createClient();

export const checkUsernameExists = async (
  username: string,
): Promise<boolean> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error(error.message);
  }

  return data ? true : false;
};
