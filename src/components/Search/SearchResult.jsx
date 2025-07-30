export default function SearchResult(props) {
  return (
    <div className="search-results-container">
      <div className="search-results">
        <div className="search-results-image">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="search-results-details">
          {props.title}
          <br />({props.year})
        </div>
      </div>
    </div>
  );
}
