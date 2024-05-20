import { create } from "zustand";
import { User } from "@supabase/supabase-js";

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  resetUser: () => void;
}

const useUser = create<UserStore>((set) => {
  return {
    user: null,
    setUser: (user: User) => set({ user }),
    resetUser: () => set({ user: null }),
  };
});

export default useUser;
