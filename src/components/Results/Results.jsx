import useGameManager from "@/store/useGameManager";
import Button from "../Button/Button";

export default function Results(props) {
  const score = useGameManager((state) => state.currentScore);

  const badGifList = [
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXMydzJwMnc1N3I4M3M4ZWZ0ZHN0MXRyemc4ZTBtOWFraTJyaG03NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1jARfPtdz7eE0/giphy.gif",
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGo1dW05OGt5M3duY2JoNGc2NnhmZXV6dmlub3RsbmVlbmt1MXI2eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3gNvP95OSz7RnRP6t0/giphy.gif",
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXB1bjd6aTFmdGxoNmZjNWZrdjF5NGh4MndzeXFzbGRmbHhzMDhsZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QU3wuP8Q8rOBwYfzD0/giphy.gif",
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2NzemI3dWJ0eGIzeTJmdHo0MTVobXRzbHd4enJ1ZTJzNmkxNDJpcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1QhmDy91F9veMRLpvK/giphy.gif",
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2lmdWxoaTk1NWFqZnhldW15ODMzcHBqaDJqYm9tY2p2N3lpbXBjcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8OlT82jKm6Ugg/giphy.gif",
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3k5NHU3bG0yMzgwdmQ1YWVqbmU1aHE5bXJtcDVzdHVidXplNThqaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/80TEu4wOBdPLG/giphy.gif",
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2F4OXViZjE3ZGd4NXBnazV1cjduY2toNjR3b2xuajAxZHd2cm13ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5pMGZHSqfvGT5mnTwx/giphy.gif",
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWl2MTVsMmc4eW4xcWoxam9wM3VsOHIweXhvd3pwMmppdWtvMmlraiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dB12mOQb99BwDlM83I/giphy.gif",
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTM1NnBvaDdlZ29zYW00Y25nbTg2M2t1dGVicjNsMnl6cnVob3VlYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dvUdxxPWaHwmDdM8P6/giphy.gif",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmg5enU1Y2R2cHQ2MWxtMzF1MXQwODllZmV1NXJnM3N1c2Y3eDAyMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cdqwNuGaUg3Qs/giphy.gif",
  ];

  const medGifList = [
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHR3eXF6aWprdHg0dnJzYTIzZDVjbDc1M3M1eHlkeTJ2eHg4bmVtdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nTE6nHdPzsO26VbrYh/giphy.gif",
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcW15MDQ1eXloN2w5ZGl4MmpkanFpaWlqdDlsdTBoZDlkY2ozZXhldiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUNd9G6KgAoXeWcMJq/giphy.gif",
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDg5NHdwNTNkemlwdWVmdTcyaWV2ZHg4MmE3bDh1djY1MHYydnUzayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7kwEUNbQUZS3m/giphy.gif",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHVycTZyZnlhMGE2Mmw1amh6ZGJmbGQzMzJrY3hod3F4aWthYWpyMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7bu2PMhUljurpnWM/giphy.gif",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjkxcTJlbGEzZ25yeHBkOTNycXB5NjhxeDhhbHVxN2Y5NnBrZGM1eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/10Yq4LbQdyALNiPf6t/giphy.gif",
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXJ2NmtrOTJwNWpzaGlyYjdvZjhpNTNtMHZxNXRkM3piemRhd3ZybCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ynqAfGe0yO0lZZWAyz/giphy.gif",
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNm9tcTg3bmc3eGNmcndtaWE0eXJjZjFybHU4anhuaWc0cm1vOThvbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/AtWWuv9p7w9r5rj0Av/giphy.gif",
  ];

  const goodGifList = [
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjRlOTluNTM0aG42amc1c203aWduZWdsbW96cjRudmVhZXM4bWR0MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/oyLZc4i0HlosQSfnse/giphy.gif",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWN6cjdxYXJ2ZDRjbHcxa2d5dGM0M3gzM295djJxY2ptemxpYm0xaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT77XWum9yH7zNkFW0/giphy.gif",
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjRlMzFhNG56Z21tY3ZoZjhsMHR0MWo3OG9hMjZ2OWNndWJqMzNhOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xThtar0e9kO3WkwQ1O/giphy.gif",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExc29zOHc4czJibHFsZWVlcmh6amZwdmE0aXE5d3V5azZrbmo1NXczeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0MYDGA3Du1hBR4xG/giphy.gif",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTVtM2gwcmwzZW1teW9zZTd3ZjMzYm0ybXR3cTVkbGhjdHdiODV2cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/artj92V8o75VPL7AeQ/giphy.gif",
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnVraWc0MHRjNHE4dnFwbHgya2J4MngyYjdyMTFycjZmdHZ2YmFscSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vmon3eAOp1WfK/giphy.gif",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGw3cXl6eDFlODB0M3ZrZ2RhcG94NHE3eHJya3YycDB0OHJiaDkzdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/t3sZxY5zS5B0z5zMIz/giphy.gif",
  ];

  const badTextList = [
    "Damn lol",
    "That's embarassing",
    "Oh well...",
    "Yikes",
    "LMFAO",
    "Maybe try again?",
    "Make sure no one saw that",
    "I wouldn't brag about that",
  ];
  const medTextList = [
    "Meh",
    "That's actually not that bad",
    "Not bad",
    "You can do better",
    "I guess that's not horrible",
    "Could be worse I guess",
    "Not horrible",
    "Kinda ok",
  ];
  const goodTextList = [
    "Wow",
    "You sure know your movies",
    "That's impressive!",
    "I'm surprised",
    "You did a damn fine job",
    "Well done!",
    "Wowzers",
    "Great job!",
    "That's a pleasant surprise",
  ];

  const badScore = 4;
  const medScore = 6;

  const verdict =
    score < badScore ? badGifList : score < medScore ? medGifList : goodGifList;
  const verdictText =
    score < badScore
      ? badTextList
      : score < medScore
      ? medTextList
      : goodTextList;

  return (
    <div className="resultsScreen">
      <div>
        <div className="background">
          <img src={verdict[Math.floor(Math.random() * verdict.length)]} />
        </div>
        <div className="resultsCard">
          <span>You scored:</span>
          <h2>{score}</h2>
          <span>
            {verdictText[Math.floor(Math.random() * verdictText.length)]}
          </span>
          <Button
            text="Play Again"
            onClick={() => {
              props.restartGame();
              props.showResults(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
