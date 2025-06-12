import { useEffect, useRef, useState } from "react";

export const useAudioLogic = (introAudio: string | null) => {
  const [ready, setReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !introAudio) return;

    audio.src = `./assets/audio/${introAudio}`;
    const handleCanPlay = () => {
      setReady(true);
    };

    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.load();

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlay);
    };
  }, [introAudio]);

  return { audioRef, ready };
};
