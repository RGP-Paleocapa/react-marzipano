import { useCallback, useEffect, useRef, useState } from "react";

export const useAudioUI = (audioRef: React.RefObject<HTMLAudioElement>, ready: boolean) => {
  const [isMuted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const lastProgressRef = useRef(0);

  useEffect(() => {
    const savedMuted = localStorage.getItem("isMuted");
    setMuted(savedMuted === "false" ? false : true);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      audioRef.current.autoplay = true;
      audioRef.current.load();
    }
  }, [isMuted]);

useEffect(() => {
  const interval = setInterval(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    setIsPlaying(!audio.paused);

    clearInterval(interval); // once it's set up, stop
  }, 100);

  return () => clearInterval(interval);
}, [ready, audioRef.current]);


  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    const newMuted = !audioRef.current.muted;
    audioRef.current.muted = newMuted;
    setMuted(newMuted);
    localStorage.setItem("isMuted", JSON.stringify(newMuted));
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current.pause();
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (!audioRef.current) return;
    const { currentTime, duration } = audioRef.current;
    const percentage = (currentTime / (duration || 1)) * 100;

    if (Math.abs(percentage - lastProgressRef.current) > 1) {
      lastProgressRef.current = percentage;
      setProgress(percentage);
    }
  }, []);

  const handleSeek = useCallback((value: number) => {
    if (audioRef.current) {
      const duration = audioRef.current.duration || 1;
      audioRef.current.currentTime = (value / 100) * duration;
    }
  }, []);

  return {
    isMuted,
    isPlaying,
    progress,
    toggleMute,
    togglePlay,
    handleTimeUpdate,
    handleSeek,
  };
};
