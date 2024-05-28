import { createClient } from "@/utils/supabase/component";

const getUserData = async () => {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.getUser();
    const user = data;
    if (error) {
      throw new Error(error.message);
    }
    return user;
  } catch (error) {
    console.error("Error fetching user data", error);
  }
};
