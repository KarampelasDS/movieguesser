import { create } from "zustand";
import { persist } from "zustand/middleware";

const useGameManager = create(
  persist(
    (set, get) => ({
      allowSound: true,
      setAllowSound: (newSound) => {
        set({ allowSound: newSound });
      },
      playConfetti: () => {
        var confettiAudio = new Audio("/sounds/confetti.mp3");
        confettiAudio.play();
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      playChalk: () => {
        var num = Math.floor(Math.random() * 4) + 1;
        var chalkAudio = new Audio(`/sounds/chalk/chalk${num}.mp3`);
        chalkAudio.play();
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
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

      setAttempts: (newAttempts) => set({ currentAttempts: newAttempts }),
      guessesList: [],
      resetGuessesList: () => set({ guessesList: [] }),
      addGuess: (guess) =>
        set((state) => ({
          canClick: false,
          guessesList: [...state.guessesList, guess],
        })),
      decreaseAttempts: () =>
        set((state) => ({
          currentAttempts: state.currentAttempts - 1,
        })),
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
          if (get().allowSound) {
            get().playConfetti();
          }
          const newScore = get().currentScore + 1;
          get().setCurrentScore(newScore); // auto-updates highScore
          get().addGuess({ title, year, image, correct: true });
          get().setAttempts(0);
          get().addPastMovie(get().currentMovie);
        } else {
          if (get().allowSound) {
            get().playChalk();
          }
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
