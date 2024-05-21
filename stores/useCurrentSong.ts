import { create } from "zustand";
import { Database } from "@/types_db";

type Song = Database["public"]["Tables"]["songs"]["Row"];

interface CurrentSongState {
  currentSong: Song | null;
  setCurrentSong: (song: Song) => void;
}

const useCurrentSong = create<CurrentSongState>((set) => ({
  currentSong: null,
  setCurrentSong: (song: Song) => set({ currentSong: song }),
}));

export default useCurrentSong;
