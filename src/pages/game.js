import Clapper from "@/components/Clapper/Clapper";
import GuessAttempt from "@/components/GuessAttempt/GuessAttempt";
import Search from "@/components/Search/Search";
import useGameManager from "@/store/useGameManager";
import { useEffect, useState } from "react";
import MovieOverview from "@/components/MovieOverview/MovieOverview";
import Results from "@/components/Results/Results";
import Stat from "@/components/Stat/Stat";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function Game() {
  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState();
  const [outOfMovies, setOutOfMovies] = useState(false);

  const attempts = useGameManager((state) => state.currentAttempts);
  const setAttempts = useGameManager((state) => state.setAttempts);
  const decreaseAttempt = useGameManager((state) => state.decreaseAttempts);
  const guesses = useGameManager((state) => state.guessesList);
  const showOverview = useGameManager((state) => state.showOverview);
  const setShowOverview = useGameManager((state) => state.setShowOverview);
  const gameResult = useGameManager((state) => state.gameResult);
  const setGameResult = useGameManager((state) => state.setGameResult);
  const resetGame = useGameManager((state) => state.resetGame);
  const resetGuessesList = useGameManager((state) => state.resetGuessesList);
  const resetMovie = useGameManager((state) => state.resetMovie);

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
      const res = await fetch("/api/fetchMovie");
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setAllMovies(data);
      setMovies(data);
      console.log("Fetched Movies:", data);
      if (data.length > 0) RandomMovie(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

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

      <Clapper
        image={currentMovie ? currentMovie.poster : "/placeholder-image.png"}
        title={currentMovie ? currentMovie.title : "Loading..."}
        genre={currentMovie ? currentMovie.genre : "Loading..."}
        year={currentMovie ? currentMovie.year : "Loading..."}
        badDescription={currentMovie ? currentMovie.baddesc : "Loading..."}
        reveal={attempts}
      />

      {(gameResult === "Win" || movies.length === 0) && (
        <button onClick={NextMovie}>Next</button>
      )}

      <p className="attempts-counter">
        You have <span>{attempts}</span> attempts left!
      </p>

      {attempts > 0 && <Search />}

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
        />
      )}
      {gameResult === "Lose" && <Results restartGame={restartGame} />}
    </div>
  );
}
