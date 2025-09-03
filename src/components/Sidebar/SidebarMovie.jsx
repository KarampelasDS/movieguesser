export default function SidebarMovie({ movie }) {
  return (
    <div className="SidebarMovieContainer">
      <div className="SidebarMoviePoster">
        <img src={movie.poster} />
      </div>
      <div className="SidebarMovieContent">
        {movie.title}
        <br />({movie.year})
      </div>
    </div>
  );
}
