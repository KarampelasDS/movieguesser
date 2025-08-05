import { create } from "zustand";

const useGameManager = create((set) => ({
  currentMovie: "loading...",
  resetMovie: () => set((state) => ({ currentMovie: "" })),
  setCurrentMovie: (newMovie) => set({ currentMovie: newMovie }),
}));

export default useGameManager;
