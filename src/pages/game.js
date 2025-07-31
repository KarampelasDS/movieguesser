import Clapper from "@/components/Clapper/Clapper";
import Search from "@/components/Search/Search";
import { useEffect, useState } from "react";

export default function Game() {
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [attempts, setAttempts] = useState(0);

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
  }

  return (
    <div className="game-page">
      <h1>Which movie is this?</h1>
      <Clapper
        image={currentMovie ? currentMovie.poster : "/placeholder-image.png"}
        title={currentMovie ? currentMovie.title : "Loading..."}
        genre={currentMovie ? currentMovie.genre : "Loading..."}
        year={currentMovie ? currentMovie.year : "Loading..."}
        badDescription={currentMovie ? currentMovie.baddesc : "Loading..."}
        reveal={attempts}
      />
      <Search searchlist={movies} />
      <button onClick={() => setAttempts(attempts + 1)}>Reveal</button>
    </div>
  );
}
