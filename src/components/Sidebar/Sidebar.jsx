import Stat from "../Stat/Stat.jsx";
import { useState } from "react";
import useGameManager from "@/store/useGameManager.js";
import SidebarMovie from "./SidebarMovie.jsx";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pastMovies = useGameManager((state) => state.pastMovies);

  return (
    <div className="sidebar">
      <span className={`sidebar-handle ${open ? "open" : ""}`}>
        Movies : {pastMovies.length}{" "}
        {open ? (
          <IoIosArrowDropleftCircle
            size={40}
            className="SidebarArrow"
            onClick={() => setOpen(!open)}
          />
        ) : (
          <IoIosArrowDroprightCircle
            size={40}
            className="SidebarArrow"
            onClick={() => setOpen(!open)}
          />
        )}
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
