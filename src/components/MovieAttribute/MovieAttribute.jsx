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
  src: "../../../public/fonts/chalktastic/Chalktastic.ttf",
  display: "swap",
});

export default function MovieAttribute(props){

    return(<div className={`MovieAttribute ${robotoCondensed.className}`}>
         <span id={props.year?"Year":""} >{props.title}</span>
         <div className="AttributeField">
                  <p
                    className={`AttributeValue ${courierPrime.className} ${chalktastic.className}`}
                  >
                    {props.content}
                  </p>
                  <div className="AttributeLine"></div>
        </div>
        </div>
    );
}