import Stat from "../Stat/Stat.jsx";
import { useState } from "react";
import useGameManager from "@/store/useGameManager.js";
import SidebarMovie from "./SidebarMovie.jsx";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pastMovies = useGameManager((state) => state.pastMovies);
  return (
    <div className="sidebar" onClick={() => setOpen(!open)}>
      <Stat title={"Movies"} value={pastMovies.length} />
      {open && (
        <div className="sidebar-content">
          {pastMovies.map((movie) => {
            return (
              <div key={movie.id}>
                <SidebarMovie movie={movie} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
