import Stat from "../Stat/Stat.jsx";
import { useState } from "react";
import useGameManager from "@/store/useGameManager.js";
import SidebarMovie from "./SidebarMovie.jsx";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pastMovies = useGameManager((state) => state.pastMovies);

  return (
    <div className="sidebar">
      <span
        className={`sidebar-handle ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        {open ? "<" : ">"} Movies:{pastMovies.length}
      </span>
      {open && (
        <div className="sidebar-content">
          {pastMovies.length > 0 ? (
            [...pastMovies].reverse().map((movie) => (
              <div key={movie.id}>
                <SidebarMovie movie={movie} />
              </div>
            ))
          ) : (
            <span>No movies guessed yet!</span>
          )}
        </div>
      )}
    </div>
  );
}
