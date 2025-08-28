import Image from "next/image";
import { DM_Mono } from "next/font/google";
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["300", "400", "500"] });
import { FaCirclePlay } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import useGameManager from "@/store/useGameManager";

export default function MovieOverview(props) {
  const setShowOverview = useGameManager((state) => state.setShowOverview);
  return (
    <div className="movie-overview-wrapper">
      <div className={`movie-overview-container ${dmMono.className}`}>
        <div className="movie-overview-content">
          <div className="movie-overview-image-container">
            <img width={300} height={450} src={props.image} />
          </div>
          <div className="movie-overview-content-container">
            <h2>
              {props.title}({props.year})
            </h2>
            <p>{props.description}</p>
          </div>
        </div>
        <div className="movie-overview-controls">
          <button>
            <a href={props.link} target="_blank">
              Watch Now <FaCirclePlay size={50} />
            </a>
          </button>
          <button onClick={() => setShowOverview(false)}>
            Close <IoMdCloseCircle size={70} />
          </button>
        </div>
      </div>
    </div>
  );
}
