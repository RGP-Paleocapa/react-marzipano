import { useEffect, useRef } from "react";

interface AudioOverlayProps {
  introAudio: string | null;
}

const AudioOverlay: React.FC<AudioOverlayProps> = ({ introAudio }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  
  useEffect(() => {
    if (audioRef.current && introAudio) {
      audioRef.current.src = `./assets/audio/${introAudio}`;
      audioRef.current.play().catch(err => console.error("Error playing audio:", err));
    }
  }, [introAudio]);

  return introAudio ? (
  <div className="w-1/4">
    <div className="w-1/5 h-2/5 bg-transparent absolute left-0 bottom-14">
    {/* sostituire transparent con green-600 per vedere il greenscreen verde */}

    </div>
    <audio
      ref={audioRef}
      controls
      className="absolute left-0 bottom-20 lg:left-1/2 lg:bottom-1 lg:-translate-x-1/2 z-10 lg:z-20">
      <source src={`./assets/audio${introAudio}`} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  </div>
  ) : null;
};

export default AudioOverlay;
