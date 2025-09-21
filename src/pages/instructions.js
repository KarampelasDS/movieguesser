import Button from "@/components/Button/Button";
import KofiButton from "@/components/KofiButton/KofiButton";

export default function Menu() {
  const LoadPage = (url) => {
    window.location.href = `/${url}`;
  };
  return (
    <div className="TextPage">
      <div className="Instructions">
        <h1>How to Play</h1>
        <div className="InstructionSection">
          <p>
            In <strong>MovieGuesser</strong>, you’ll be shown a hilariously bad
            description of a movie.
          </p>
          <img
            className="InstructionScreenshot"
            src="/Instructions/Screenshot_1.png"
          />
          <p>
            Your challenge is to figure out which movie it is, but you only get
            <strong> 3 guesses</strong>.
          </p>
        </div>
        <div className="InstructionSection">
          <p>
            Every wrong guess unlocks <strong>a new hint</strong>, making it
            easier (and sometimes funnier) to narrow down the answer.
          </p>
          <img
            className="InstructionScreenshot"
            src="/Instructions/Screenshot_2.png"
          />
        </div>
        <div className="InstructionSection">
          <p>
            Guess correctly and you will earn <strong>+1 point</strong>, then
            move on to the next movie.
          </p>
          <img
            className="InstructionScreenshot"
            src="/Instructions/Screenshot_3.png"
          />
        </div>
        <div className="InstructionSection">
          <p>
            Each new round <strong>resets your guesses back to 3</strong>,
            giving you a fresh chance to keep your streak alive.
          </p>
          <img
            className="InstructionScreenshot"
            src="/Instructions/Screenshot_4.png"
          />
        </div>
        <div className="InstructionSection">
          <p>
            Every movie you solve is saved to your personal{" "}
            <strong>guessed list</strong>, so you can look back at all your
            victories during the run as well as information about them.
          </p>
          <img
            className="InstructionScreenshot"
            src="/Instructions/Screenshot_5.png"
          />
        </div>
        <div className="InstructionSection">
          <p>
            Run out of guesses and the current movie will be revealed, bringing
            your run to an end and taking you to the
            <strong> results screen</strong>.
          </p>
          <img
            className="InstructionScreenshot"
            src="/Instructions/Screenshot_6.png"
          />
          <p>
            Compete with your friends, beat each other&apos;s high scores and
            prove you&apos;re the ultimate <strong>movie expert</strong>!
          </p>
        </div>
        <Button text="Back" onClick={() => LoadPage("")} size={46} />
      </div>
      <KofiButton />
    </div>
  );
}
