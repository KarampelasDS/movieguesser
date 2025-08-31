import Clapper from "@/components/Clapper/Clapper";
import GuessAttempt from "@/components/GuessAttempt/GuessAttempt";
import Search from "@/components/Search/Search";
import useGameManager from "@/store/useGameManager";
import { useEffect, useState } from "react";
import MovieOverview from "@/components/MovieOverview/MovieOverview";
import Results from "@/components/Results/Results";
import Stat from "@/components/Stat/Stat";

export default function Game() {
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const attempts = useGameManager((state) => state.currentAttempts);
  const setAttempts = useGameManager((state) => state.setAttempts);
  const zustandCurrentMovie = useGameManager((state) => state.currentMovie);
  const decreaseAttempt = useGameManager((state) => state.decreaseAttempts);
  const guesses = useGameManager((state) => state.guessesList);
  const showOverview = useGameManager((state) => state.showOverview);
  const setShowOverview = useGameManager((state) => state.setShowOverview);
  const gameResult = useGameManager((state) => state.gameResult);
  const setGameResult = useGameManager((state) => state.setGameResult);
  const resetGame = useGameManager((state) => state.resetGame);
  const resetGuessesList = useGameManager((state) => state.resetGuessesList);
  const resetMovie = useGameManager((state) => state.resetMovie);

  useEffect(() => {
    if (movies.length > 0) {
      console.log("Fetched Movies: ", movies);
      RandomMovie();
      return;
    }
    FetchMovies();
    console.log("Fetching movies...");
  }, [movies]);

  async function FetchMovies() {
    try {
      const res = await fetch("/api/fetchMovie");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  function RandomMovie() {
    if (movies.length === 0) return;
    const randomIndex = Math.floor(Math.random() * movies.length);
    setCurrentMovie(movies[randomIndex]);
    useGameManager.getState().setCurrentMovie(movies[randomIndex].tmdb_id);
    console.log("Random Movie Selected: ", movies[randomIndex]);
  }

  if (attempts == 0 && gameResult !== "Win") {
    setGameResult("Lose");
  }

  async function NextMovie() {
    resetMovie();
    RandomMovie();
    setAttempts(3);
    setShowOverview(false);
    setGameResult("");
    resetGuessesList();
  }

  return (
    <div className="game-page">
      <Stat
        title="Score"
        value={useGameManager((state) => state.currentScore)}
      />
      {gameResult === "Win" ? (
        <h1>Great guess!</h1>
      ) : gameResult === "Lose" ? (
        <h1>Better luck next time!</h1>
      ) : (
        <h1>Which Movie is this?</h1>
      )}
      {/*<p>Current Movie: {zustandCurrentMovie}</p>
      <p>Current attempts: {attempts}</p>
      <button onClick={() => decreaseAttempt()}>Reveal</button>*/}
      <Clapper
        image={currentMovie ? currentMovie.poster : "/placeholder-image.png"}
        title={currentMovie ? currentMovie.title : "Loading..."}
        genre={currentMovie ? currentMovie.genre : "Loading..."}
        year={currentMovie ? currentMovie.year : "Loading..."}
        badDescription={currentMovie ? currentMovie.baddesc : "Loading..."}
        reveal={attempts}
      />
      {gameResult == "Win" && <button onClick={() => NextMovie()}>Next</button>}
      <p className="attempts-counter">
        You have <span>{attempts}</span> attempts left!
      </p>
      {attempts > 0 && <Search />}
      <div>
        {[...guesses].reverse().map((guess, index) => {
          return (
            <GuessAttempt
              title={guess.title}
              year={guess.year}
              image={guess.image}
              correct={guess.correct}
              key={index}
            />
          );
        })}
      </div>
      {showOverview && (
        <MovieOverview
          title={currentMovie.title}
          year={currentMovie.year}
          description={currentMovie.overview}
          image={currentMovie.poster}
          link={currentMovie.watchurl}
        />
      )}
      {gameResult == "Lose" && <Results fetchNewMovie={RandomMovie} />}
    </div>
  );
}
