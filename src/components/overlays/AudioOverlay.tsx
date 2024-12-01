import { useEffect } from "react";

interface AudioOverlayProps {
  introAudio: string | null;
}

const AudioOverlay: React.FC<AudioOverlayProps> = ({ introAudio }) => {
  const locationAudio = "/assets/audio/" + introAudio;

  useEffect(() => {}, [introAudio]);

  return introAudio ? (
    <audio autoPlay controls className="absolute left-0 bottom-0 z-50">
      <source src={locationAudio} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  ) : null;
};

export default AudioOverlay;
