import { useEffect, useRef, useState } from "react";

interface AudioOverlayProps {
  introAudio: string | null;
}

const AudioOverlay: React.FC<AudioOverlayProps> = ({ introAudio }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setMuted] = useState<boolean>(true); // Initially muted

  // Load from localStorage when component mounts
  useEffect(() => {
    const savedMuted = localStorage.getItem("isMuted");

    // Set states from localStorage or default to initial values
    if (savedMuted !== null) {
      setMuted(savedMuted === "true");
    }
  }, []);

  // Handle audio setup
  useEffect(() => {
    if (audioRef.current && introAudio) {
      audioRef.current.src = `./assets/audio/${introAudio}`;
    }
  }, [introAudio]);

  const handleVolumeChange = () => {
    if (audioRef.current) {
      const isCurrentlyMuted = audioRef.current.muted;
      setMuted(isCurrentlyMuted);
      localStorage.setItem("isMuted", JSON.stringify(isCurrentlyMuted)); // Save muted state to localStorage
    }
  };

  return introAudio ? (
    <div>
      <div className="w-1/5 h-2/5 bg-transparent absolute left-0 bottom-14">
        {/* Optionally use a green screen */}
      </div>
      <audio
        ref={audioRef}
        muted={isMuted}
        autoPlay
        controls
        onVolumeChange={handleVolumeChange}
        className="custom-audio">
        <source src={`./assets/audio/${introAudio}`} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  ) : null;
};

export default AudioOverlay;
