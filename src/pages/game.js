import Image from "next/image";

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
              <div className={`MovieAttribute ${robotoCondensed.className}`}>
                <span>TITLE</span>
                <div className="AttributeField">
                  <p
                    className={`AttributeValue ${courierPrime.className} ${chalktastic.className}`}
                  >
                    Jurassic Park
                  </p>
                  <div className="AttributeLine"></div>
                </div>
              </div>
              <div className={`MovieAttribute ${robotoCondensed.className}`}>
                <span>GENRE</span>
                <div className="AttributeField">
                  <p
                    className={`AttributeValue ${courierPrime.className} ${chalktastic.className}`}
                  >
                    Action
                  </p>
                  <div className="AttributeLine"></div>
                </div>
              </div>
              <div className={`MovieAttribute ${robotoCondensed.className}`}>
                <span id="Year">RELEASE YEAR</span>
                <div className="AttributeField">
                  <p
                    className={`AttributeValue ${courierPrime.className} ${chalktastic.className}`}
                  >
                    1993
                  </p>
                  <div className="AttributeLine"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
