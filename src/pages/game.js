import Image from "next/image";

import MovieAttribute from "@/components/MovieAttribute/MovieAttribute";

import { Courier_Prime, Roboto_Condensed } from "next/font/google";
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

const chalktastic = localFont({
  src: "../../public/fonts/chalktastic/Chalktastic.ttf",
  display: "swap",
});

export default function Game() {
  return (
    <div className="flex flex-col items-center ">
      <div className="clappper-container">
        <div className="clapper">
          <Image
            width={1090}
            height={80}
            src="/Clapper-Top.png"
            alt="Clapper Top"
          />
          <div className="clapper-content">
            <div className="PosterHolder">TEST</div>
            <div className="MovieContent">
              <div className={`BadDescription ${courierPrime.className}`}>
                <p>
                  “Scientists repeatedly grow chickens that won't stay on their
                  farm.”
                </p>
              </div>
              <MovieAttribute title="TITLE" content="Jurassic Park"/>
              <MovieAttribute title="GENRE" content="Action"/>
              <MovieAttribute title="RELEASE YEAR" year="true" content="1993"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
