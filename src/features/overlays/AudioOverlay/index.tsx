import { useAudioPlayer } from "@hooks";
import AudioControls from "./AudioControls";
import AudioTimeline from "./AudioTimeline";
import AudioVolume from "./AudioVolume";

interface AudioOverlayProps {
  introAudio: string | null;
}

const AudioOverlay: React.FC<AudioOverlayProps> = ({ introAudio }) => {
  const {
    audioRef,
    audioInvisible,
    isMuted,
    isPlaying,
    progress,
    // handleVolumeChange,
    handleTimeUpdate,
    togglePlay,
    toggleMute,
    handleSeek,
  } = useAudioPlayer(introAudio);

  if (audioInvisible || !introAudio) return null;

  return (
    <>
      <audio
        ref={audioRef}
        hidden
        autoPlay
        muted={isMuted}
        controls={false}
        // onVolumeChange={handleVolumeChange}
        onTimeUpdate={handleTimeUpdate}
        >
        <source src={`./assets/audio/${introAudio}`} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div
        id="audio-overlay"
        className="
          fixed z-50 px-4 py-2 rounded-md shadow-md
          bg-white/90 backdrop-blur-md border border-gray-300
          flex items-center justify-between gap-3
          w-full md:w-[500px]
          bottom-auto top-2 md:top-auto md:bottom-2
          left-1/2 transform -translate-x-1/2
        "
      >
        <AudioControls isPlaying={isPlaying} onToggle={togglePlay} />
        <AudioTimeline progress={progress} onSeek={handleSeek} />
        <AudioVolume isMuted={isMuted} onToggle={toggleMute} />
      </div>
    </>
  );
};

export default AudioOverlay;
