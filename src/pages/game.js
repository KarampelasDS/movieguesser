import Clapper from "@/components/Clapper/Clapper";
import GuessAttempt from "@/components/GuessAttempt/GuessAttempt";
import Search from "@/components/Search/Search";
import useGameManager from "@/store/useGameManager";
import { useEffect, useState } from "react";
import MovieOverview from "@/components/MovieOverview/MovieOverview";

export default function Game() {
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const attempts = useGameManager((state) => state.currentAttempts);
  const zustandCurrentMovie = useGameManager((state) => state.currentMovie);
  const decreaseAttempt = useGameManager((state) => state.decreaseAttempts);
  const guesses = useGameManager((state) => state.guessesList);
  const showOverview = useGameManager((state) => state.showOverview);
  const setShowOverview = useGameManager((state) => state.setShowOverview);

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
    console.log("Random Movie Selected: ", movies[randomIndex]);
    useGameManager.getState().setCurrentMovie(movies[randomIndex].tmdb_id);
  }

  return (
    <div className="game-page">
      <h1>Which movie is this?</h1>
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
      <Search />
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
    </div>
  );
}
