import { useState } from "react";
import { PiSpeakerHighFill, PiSpeakerSlashFill } from "react-icons/pi";
import useGameManager from "@/store/useGameManager";

export default function SoundToggle() {
  const setAllowSound = useGameManager((state) => state.setAllowSound);
  const allowSound = useGameManager((state) => state.allowSound);
  return (
    <div className="SoundToggle" onClick={() => setAllowSound(!allowSound)}>
      {allowSound ? (
        <PiSpeakerHighFill size={50} />
      ) : (
        <PiSpeakerSlashFill color="#ff4c4c" size={50} />
      )}
    </div>
  );
}
