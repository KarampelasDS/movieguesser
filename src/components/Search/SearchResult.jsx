export default function SearchResult(props) {
  return (
    <div className="search-results-container">
      <div className="search-results">
        <div className="search-results-image">
          <img
            src={`https://image.tmdb.org/t/p/w500${props.image}`}
            alt={props.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/fallback.png";
            }}
          />
        </div>
        <div className="search-results-details ">
          {props.title}
          <br />({props.year})
        </div>
      </div>
    </div>
  );
}
