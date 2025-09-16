import Clapper from "@/components/Clapper/Clapper";
import GuessAttempt from "@/components/GuessAttempt/GuessAttempt";
import Search from "@/components/Search/Search";
import useGameManager from "@/store/useGameManager";
import { useEffect, useState, useRef } from "react";
import MovieOverview from "@/components/MovieOverview/MovieOverview";
import Results from "@/components/Results/Results";
import Stat from "@/components/Stat/Stat";
import Sidebar from "@/components/Sidebar/Sidebar";
import Button from "@/components/Button/Button";

export default function Game() {
  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState();
  const [outOfMovies, setOutOfMovies] = useState(false);
  const [loading, setLoading] = useState(true);
  const maxRetries = 5;
  const attemptsRef = useRef(0);

  const attempts = useGameManager((state) => state.currentAttempts);
  const setAttempts = useGameManager((state) => state.setAttempts);
  const decreaseAttempt = useGameManager((state) => state.decreaseAttempts);
  const guesses = useGameManager((state) => state.guessesList);
  const showOverview = useGameManager((state) => state.showOverview);
  const setShowOverview = useGameManager((state) => state.setShowOverview);
  const gameResult = useGameManager((state) => state.gameResult);
  const setGameResult = useGameManager((state) => state.setGameResult);
  const [showResults, setShowResults] = useState(false);
  const resetGame = useGameManager((state) => state.resetGame);
  const resetGuessesList = useGameManager((state) => state.resetGuessesList);
  const resetMovie = useGameManager((state) => state.resetMovie);
  const [networkError, setNetworkError] = useState(false);

  const pastMovies = useGameManager((state) => state.pastMovies);
  const addPastMovie = useGameManager((state) => state.addPastMovie);

  const hydrateHighScore = useGameManager((state) => state.hydrateHighScore);
  const highScore = useGameManager((state) => state.highScore);
  const currentScore = useGameManager((state) => state.currentScore);

  // Fetch movies on mount
  useEffect(() => {
    hydrateHighScore();
    FetchMovies();
  }, []);

  async function FetchMovies() {
    try {
      if (!loading) {
        setLoading(true);
      }
      const res = await fetch("/api/fetchMovie");
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setAllMovies(data);
      setMovies(data);
      if (data.length > 0) RandomMovie(data);
      setLoading(false);
      setNetworkError(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setNetworkError(true);
    }
  }

  useEffect(() => {
    if (networkError) {
      const retry = setTimeout(() => {
        FetchMovies();
      }, 2000); // retry after 2s

      return () => clearTimeout(retry);
    }
  }, [networkError]);

  function RandomMovie(sourceMovies = movies) {
    if (sourceMovies.length === 0) {
      setOutOfMovies(true);
      setCurrentMovie(null);
      return;
    }
    const randomIndex = Math.floor(Math.random() * sourceMovies.length);
    const movie = sourceMovies[randomIndex];

    setCurrentMovie(movie);
    useGameManager.getState().setCurrentMovie(movie);
    setMovies((prev) => prev.filter((_, i) => i !== randomIndex));
    console.log("Random Movie Selected:", movie);
  }

  useEffect(() => {
    if (attempts === 0 && gameResult !== "Win") {
      setGameResult("Lose");
    }
  }, [attempts, gameResult, setGameResult]);

  function NextMovie() {
    if (movies.length === 0) {
      setOutOfMovies(true);
      return;
    }
    resetMovie();
    RandomMovie();
    setAttempts(3);
    setShowOverview(false);
    setGameResult("");
    resetGuessesList();
  }

  function restartGame() {
    setCurrentMovie(undefined);
    resetGame();
    setOutOfMovies(false);
    FetchMovies();
  }

  if (outOfMovies) {
    return (
      <div className="game-page">
        <h1>You have gone through all the movies!</h1>
        <p>Final Score: {currentScore}</p>
        <p>Highest Score: {highScore}</p>
        <button onClick={restartGame}>Restart</button>
      </div>
    );
  }

  return (
    <div className="game-page">
      <Sidebar />
      <Stat
        title="Score"
        value={currentScore}
        right={true}
        subvalue={highScore}
        subvaluetitle="Highest"
      />

      {gameResult === "Win" ? (
        <h1>Great guess!</h1>
      ) : gameResult === "Lose" ? (
        <h1>Better luck next time!</h1>
      ) : (
        <h1>Which Movie is this?</h1>
      )}

      {networkError && (
        <div style={{ color: "red", textAlign: "center" }}>
          <p>Network error occurred while fetching movies. Retrying...</p>
        </div>
      )}

      <Clapper
        image={currentMovie ? currentMovie.poster : "/placeholder-image.png"}
        title={currentMovie ? currentMovie.title : "Loading..."}
        genre={currentMovie ? currentMovie.genre : "Loading..."}
        year={currentMovie ? currentMovie.year : "Loading..."}
        badDescription={currentMovie ? currentMovie.baddesc : "Loading..."}
        reveal={attempts}
      />

      {(gameResult === "Win" || movies.length === 0) && !loading && (
        <Button text="Next Movie" onClick={NextMovie} />
      )}

      {gameResult === "Lose" && (
        <Button text="End Run" onClick={() => setShowResults(true)} />
      )}

      {gameResult != "Win" && (
        <p className="attempts-counter">
          You have <span>{attempts}</span> attempts left!
        </p>
      )}

      {loading && (
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {attempts > 0 && !loading && <Search />}

      <div>
        {[...guesses].reverse().map((guess, index) => (
          <GuessAttempt
            key={index}
            title={guess.title}
            year={guess.year}
            image={guess.image}
            correct={guess.correct}
          />
        ))}
      </div>

      {showOverview && currentMovie && (
        <MovieOverview
          title={currentMovie.title}
          year={currentMovie.year}
          description={currentMovie.overview}
          image={currentMovie.poster}
          link={currentMovie.watchurl}
          closeOverview={() => setShowOverview(false)}
        />
      )}
      {showResults == true && (
        <Results restartGame={restartGame} showResults={setShowResults} />
      )}
    </div>
  );
}
