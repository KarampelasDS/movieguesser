import { create } from "zustand";
import { persist } from "zustand/middleware";

const useGameManager = create(
  persist(
    (set, get) => ({
      currentMovie: "loading...",
      currentAttempts: 3,
      setCurrentMovie: (newMovie) => set({ currentMovie: newMovie }),
      showOverview: false,
      showOverviewSidebar: 0,
      currentScore: 0,
      highScore: 0, // 🏆 persisted manually
      setCurrentScore: (newScore) => {
        set((state) => {
          const newHigh = Math.max(newScore, state.highScore);

          // persist highScore in localStorage manually
          if (typeof window !== "undefined" && newHigh > state.highScore) {
            localStorage.setItem("highScore", newHigh);
          }

          return { currentScore: newScore, highScore: newHigh };
        });
      },
      pastMovies: [],
      addPastMovie: (movie) =>
        set((state) => ({ pastMovies: [...state.pastMovies, movie] })),
      setShowOverview: (newState) => set({ showOverview: newState }),
      setShowOverviewSidebar: (newState) =>
        set({ showOverviewSidebar: newState }),
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
        console.log(get().currentMovie);
        if (guess == get().currentMovie.tmdb_id) {
          get().setGameResult("Win");
          const newScore = get().currentScore + 1;
          get().setCurrentScore(newScore); // auto-updates highScore
          get().addGuess({ title, year, image, correct: true });
          get().setAttempts(0);
          get().addPastMovie(get().currentMovie);
        } else {
          get().addGuess({ title, year, image, correct: false });
          get().decreaseAttempts();
        }
      },

      // 🔹 Manually hydrate highScore after mount
      hydrateHighScore: () => {
        if (typeof window !== "undefined") {
          const savedHigh = parseInt(localStorage.getItem("highScore")) || 0;
          set({ highScore: savedHigh });
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
