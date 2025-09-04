import useGameManager from "@/store/useGameManager";

export default function Results(props) {
  const score = useGameManager((state) => state.currentScore);
  return (
    <div className="resultsScreen">
      <div>
        <div className="background">
          <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnF1a3pwM2w1Y2xrMXhqb2Joc3pyNTl0NTA3a3FvdHMzaWFsbTc1NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5qFqDCWilnDBYERCMF/giphy.gif" />
        </div>
        <div className="resultsCard">
          <span>You scored:</span>
          <h2>{score}</h2>
          <span>damn lol</span>
          <button
            onClick={() => {
              props.restartGame();
              props.showResults(false);
            }}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}
