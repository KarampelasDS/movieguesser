import Button from "@/components/Button/Button";
import Image from "next/image";

export default function Menu() {
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
      <div>
        <Button text="Start Game" />
        <Button text="How to Play" />
      </div>
    </div>
  );
}
