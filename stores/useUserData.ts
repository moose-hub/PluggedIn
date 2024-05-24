import { create } from "zustand";
import { User } from "@supabase/supabase-js";

interface UserDataStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserDataStore = create<UserDataStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
