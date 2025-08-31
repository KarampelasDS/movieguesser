import { create } from "zustand";
import { persist } from "zustand/middleware";

const useGameManager = create(
  persist(
    (set, get) => ({
      currentMovie: "loading...",
      currentAttempts: 3,
      setCurrentMovie: (newMovie) => set({ currentMovie: newMovie }),
      showOverview: false,
      currentScore: 0,
      setCurrentScore: (newScore) => set({ currentScore: newScore }),
      pastMovies: [],
      addPastMovie: (movie) =>
        set((state) => ({ pastMovies: [...state.pastMovies, movie] })),
      setShowOverview: (newState) => set({ showOverview: newState }),
      resetMovie: () => set({ currentMovie: "loading..." }),
      decreaseAttempts: () =>
        set((state) => ({ currentAttempts: state.currentAttempts - 1 })),
      setAttempts: (newAttempts) => set({ currentAttempts: newAttempts }),
      guessesList: [],
      resetGuessesList: () => set({ guessesList: [] }),
      addGuess: (guess) =>
        set((state) => ({ guessesList: [...state.guessesList, guess] })),
      _hasHydrated: false,
      gameResult: "",
      setGameResult: (result) => set({ gameResult: result }),
      resetGame: () =>
        set({
          currentMovie: "loading...",
          currentAttempts: 3,
          guessesList: [],
          gameResult: "",
          pastMovies: [],
          currentScore: 0,
        }),
      guessMovie: (guess, title, year, image) => {
        if (guess == get().currentMovie) {
          get().setGameResult("Win");
          get().setCurrentScore(get().currentScore + 1);
          console.log("Correct");
          get().addGuess({
            title: title,
            year: year,
            image: image,
            correct: true,
          });
          get().setAttempts(0);
        } else {
          console.log("Wrong");
          get().addGuess({
            title: title,
            year: year,
            image: image,
            correct: false,
          });
          get().decreaseAttempts();
        }
      },
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "game-manager-storage", // storage key
      skipHydration: true,
      onRehydrateStorage: (state) => {
        state.setHasHydrated(true);
        return (state, error) => {
          if (!error) state.setHasHydrated(true);
        };
      },
    }
  )
);

export default useGameManager;
