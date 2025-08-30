import useGameManager from "@/store/useGameManager";
import { BsInfoCircleFill } from "react-icons/bs";
import { Courier_Prime, Roboto_Condensed } from "next/font/google";
import Image from "next/image";
const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const robotoCondensed = Roboto_Condensed({
  weight: ["500"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

import localFont from "next/font/local";
import { useEffect, useState } from "react";

const chalktastic = localFont({
  src: "../../../public/fonts/chalktastic/Chalktastic.ttf",
  display: "swap",
});

export default function MovieAttribute(props) {
  const guessesList = useGameManager((state) => state.guessesList);
  const [AttributeAttempts, setAttributeAttempts] = useState(props.attempts);
  const setShowOverview = useGameManager((state) => state.setShowOverview);
  const gameResult = useGameManager((state) => state.gameResult);

  useEffect(() => {
    if (guessesList.length > 0) {
      setAttributeAttempts((prev) => prev - 1);
    }
  }, [guessesList]);

  useEffect(() => {
    setAttributeAttempts(props.attempts);
  }, [gameResult]);

  return (
    <div className={`MovieAttribute ${robotoCondensed.className}`}>
      <span id={props.year ? "Year" : ""}>{props.title}</span>
      <div className="AttributeField">
        {props.attributeRevealed ? (
          <p className={`AttributeValue  ${chalktastic.className}`}>
            {props.content}
            {props.info && (
              <BsInfoCircleFill
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowOverview(true);
                }}
              />
            )}
          </p>
        ) : (
          <div className={`AttributeHidden ${courierPrime.className}`}>
            <Image
              className="scribbles"
              width={1000}
              height={1000}
              src="/Scribbles.png"
            />

            {props.noattempts == true ? null : AttributeAttempts > 1 ? (
              <span>in {AttributeAttempts} Guesses</span>
            ) : (
              <span>in 1 Guess</span>
            )}
          </div>
        )}
        <div className="AttributeLine"></div>
      </div>
    </div>
  );
}
