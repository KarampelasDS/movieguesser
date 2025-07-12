import Clapper from "@/components/Clapper";
import { useEffect } from "react";

async function FetchMovies() {
  try {
    const res = await fetch("/api/fetchMovie");
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

export default function Game() {
  useEffect(() => {
    FetchMovies();
  }, []);
  return <Clapper title="Mpeos" genre="Action Thriller" year="2004" />;
}
