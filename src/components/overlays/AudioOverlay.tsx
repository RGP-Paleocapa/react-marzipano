import { useEffect, useRef, useState } from "react";

interface AudioOverlayProps {
  introAudio: string | null;
}

const AudioOverlay: React.FC<AudioOverlayProps> = ({ introAudio }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setMuted] = useState<boolean>(false);

  
  useEffect(() => {
    if (audioRef.current && introAudio) {
      audioRef.current.src = `./assets/audio/${introAudio}`;
      audioRef.current.play().catch(err => console.error("Error playing audio:", err));
    }
  }, [introAudio]);

  const handleVolumeChange = () => {
    if (audioRef.current) {
      setMuted(audioRef.current.muted);
    }
  }

  return introAudio ? (
  <div>
    <div className="w-1/5 h-2/5 bg-transparent absolute left-0 bottom-14">
    {/* sostituire transparent con green-600 per vedere il greenscreen verde */}

    </div>
    <audio
      ref={audioRef}
      muted={isMuted}
      controls
      onVolumeChange={handleVolumeChange}
      className="custom-audio">
      <source src={`./assets/audio${introAudio}`} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  </div>
  ) : null;
};

export default AudioOverlay;
