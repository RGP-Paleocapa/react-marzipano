import { useEffect, useRef, useState } from "react";

export const useAudioLogic = (introAudio: string | null) => {
  const [ready, setReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !introAudio) return;

    audio.src = `./assets/audio/${introAudio}`;
    const handleCanPlay = () => {
      audio.play().catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Playback failed:", err);
        }
        setReady(true);
      });
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.load();

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [introAudio]);

  return { audioRef, ready };
};
