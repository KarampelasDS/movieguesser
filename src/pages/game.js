import Clapper from "@/components/Clapper/Clapper";
import Search from "@/components/Search/Search";
import { useEffect, useState } from "react";

export default function Game() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (movies.length > 0) {
      console.log("Fetched Movies: ", movies);
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
    console.log("Picking a random movie...");
  }

  return (
    <div className="game-page">
      <h1>Which movie is this?</h1>
      <Clapper title="Mpeos" genre="Action Thriller" year="2004" />
      <Search />
    </div>
  );
}
