import { useEffect } from "react";

interface AudioOverlayProps {
  introAudio: string | null;
}

const AudioOverlay: React.FC<AudioOverlayProps> = ({ introAudio }) => {
  const locationAudio = `./assets/audio/${introAudio}`;

  useEffect(() => {}, [introAudio]);

  return introAudio ? (
  <div>
    <div className="w-1/5 h-2/5 bg-transparent absolute left-0 bottom-14 z-100">
    {/* sostituire transparent con green-600 per vedere il greenscreen verde */}

    </div>
    <audio autoPlay controls className="absolute left-0 bottom-0 z-50">
    <source src={locationAudio} type="audio/mpeg" />
    Your browser does not support the audio element.
    </audio>
  </div>

  ) : null;
};

export default AudioOverlay;
