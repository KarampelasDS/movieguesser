import Button from "@/components/Button/Button";
import Image from "next/image";

export default function Menu() {
  const StartGame = () => {
    window.location.href = "/";
  };

  return (
    <div className="MenuWrapper">
      <div className="LogoWrapper">
        <Image
          id="MainLogo"
          src="/menu/WholeLogo.png"
          width={800}
          height={200}
        />
      </div>
      <div className="MenuButtons">
        <Button text="Start Game" onClick={() => StartGame()} />
        <Button text="How to Play" />
      </div>
    </div>
  );
}
