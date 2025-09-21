import { useState } from "react";
import Button from "@/components/Button/Button";
import KofiButton from "@/components/KofiButton/KofiButton";
import Image from "next/image";

export default function Menu() {
  const [logoLoaded, setLogoLoaded] = useState(false);

  const LoadPage = (url) => {
    window.location.href = `/${url}`;
  };

  return (
    <div className="MenuWrapper">
      <div className="LogoWrapper">
        <Image
          id="MainLogo"
          src="/menu/WholeLogo.png"
          width={4394}
          height={2135}
          onLoad={() => setLogoLoaded(true)}
          className={logoLoaded ? "animate" : ""}
          priority
        />
      </div>
      <div className="MenuButtons">
        <Button text="Start Game" onClick={() => LoadPage("game")} size={46} />
        <Button
          text="How to Play"
          onClick={() => LoadPage("instructions")}
          size={46}
        />
      </div>
      <KofiButton />
    </div>
  );
}
