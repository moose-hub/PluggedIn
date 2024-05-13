import { UserDetails } from "@/types";
import { User } from "@supabase/supabase-js";
import { createContext } from "react";
import { createClient } from "@/utils/supabase/server";

const supabase = createClient();
const sessionContext = await supabase.auth.getSession();

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = async (props: Props) => {
  const {
    data: { session: Session },
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = sessionContext;
};
