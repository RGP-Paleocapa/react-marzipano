import { useState, useRef, useEffect } from "react";
import ReactHowler from "react-howler";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

interface AudioOverlayProps {
  introAudio: string | null;
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

const AudioOverlay: React.FC<AudioOverlayProps> = ({ introAudio }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    const storedMute = localStorage.getItem("audioMuted");
    return storedMute !== null ? storedMute === "true" : true;
  });
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);

  const soundRef = useRef<ReactHowler | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        const seek = soundRef.current?.seek();
        if (typeof seek === "number") setProgress(seek);
      }, 500);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    if (introAudio && introAudio !== currentTrack) {
      soundRef.current?.stop();
      setIsLoaded(false);
      setProgress(0);
      setCurrentTrack(introAudio);
      setIsPlaying(true);
    }
  }, [introAudio, currentTrack]);

  const handlePlayPause = () => {
    if (!isLoaded) return;
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem("audioMuted", newMuted.toString());
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (soundRef.current && isLoaded) {
      soundRef.current.seek(newTime);
      setProgress(newTime);
    }
  };

  if (!introAudio) return null;

  return (
    <>
      <ReactHowler
        src={`./assets/audio/${introAudio}`}
        playing={isPlaying}
        mute={isMuted}
        ref={soundRef}
        onLoad={() => {
          const d = soundRef.current?.duration();
          if (typeof d === "number") setDuration(d);
          setIsLoaded(true);
        }}
        onEnd={() => setIsPlaying(false)}
        html5
      />

      <div
        id="audio-overlay"
        className="
          fixed z-50 px-4 py-2 rounded-md shadow-md
          bg-white/90 backdrop-blur-md border border-gray-300
          flex items-center justify-between gap-4
          w-full lg:w-[500px] 2xl:w-[650px]
          bottom-auto top-2 lg:top-auto lg:bottom-2
          left-1/2 transform -translate-x-1/2
        "
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {/* Play / Pause */}
        <button
          onClick={handlePlayPause}
          className={`text-xl ${
            isLoaded
              ? "text-blue-600 hover:text-blue-800"
              : "text-gray-400 cursor-not-allowed"
          }`}
          disabled={!isLoaded}
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        {/* Timeline with inline time label */}
        <div className="relative flex-grow flex items-center">
          <input
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={progress}
            onChange={handleSeek}
            className="w-full h-8 accent-blue-600"
            disabled={!isLoaded}
          />
          {hovering && (
            <span className="absolute right-1 top-1 text-[10px] text-gray-600 pointer-events-none">
              {formatTime(progress)} / {formatTime(duration)}
            </span>
          )}
        </div>

        {/* Mute */}
        <button
          id="audio-volume"
          onClick={handleMute}
          className={`p-2 rounded-full transition-colors duration-300 ${
            isMuted
              ? "bg-red-100 text-red-600 hover:bg-red-200"
              : "bg-green-100 text-green-600 hover:bg-green-200"
          }`}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      </div>
    </>
  );
};

export default AudioOverlay;
