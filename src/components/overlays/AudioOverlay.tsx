import { useState, useEffect } from "react";
import map from "@/assets/images/image.jpg";
import Dot from "../hotspots/Dot";
import { useViewStore } from "@/context/useViewerStore";

interface AudioOverlayProps {
  introAudio: string;
}

const AudioOverlay: React.FC<AudioOverlayProps> = ({ introAudio }) => {
  const locationAudio = "/assets/audio/" + introAudio;
  return (
    <audio autoPlay controls className="absolute left-0 bottom-0 z-50">
      <source src={locationAudio} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioOverlay;
