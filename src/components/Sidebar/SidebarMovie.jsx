import useGameManager from "@/store/useGameManager";
import { BsInfoCircleFill } from "react-icons/bs";
import MovieOverview from "../MovieOverview/MovieOverview";

export default function SidebarMovie({ movie }) {
  const setShowOverviewSidebar = useGameManager(
    (state) => state.setShowOverviewSidebar
  );
  const showOverviewSidebar = useGameManager(
    (state) => state.showOverviewSidebar
  );
  return (
    <div className="SidebarMovieContainer">
      <div className="SidebarMoviePoster">
        <img src={movie.poster} />
      </div>
      <div className="SidebarMovieContent">
        {movie.title}
        <br />({movie.year})
      </div>
      <BsInfoCircleFill
        className="MovieInfoSidebar"
        style={{ cursor: "pointer" }}
        color="#ff4c4c"
        onClick={() => {
          setShowOverviewSidebar(movie.id);
        }}
        size={30}
      />
      {showOverviewSidebar == movie.id && (
        <MovieOverview
          title={movie.title}
          year={movie.year}
          description={movie.overview}
          image={movie.poster}
          link={movie.watchurl}
          closeOverview={() => setShowOverviewSidebar(0)}
        />
      )}
    </div>
  );
}
