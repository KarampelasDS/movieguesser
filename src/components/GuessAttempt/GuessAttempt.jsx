import { IoCheckmark } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

export default function GuessAttempt(props) {
  return (
    <div className="GuessAttempt">
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
          <br />({props.year ? props.year.slice(0, 4) : "N/A"})
        </div>
        <div
          className="GuessResult"
          style={
            props.correct
              ? { backgroundColor: "#1AB16F" }
              : { backgroundColor: "#DF2723" }
          }
        >
          {props.correct ? <IoCheckmark size={90} /> : <RxCross1 size={90} />}
        </div>
      </div>
    </div>
  );
}
