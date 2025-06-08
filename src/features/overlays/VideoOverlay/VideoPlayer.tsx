import React, { useEffect, useRef } from 'react';
import VideoControls from './VideoControls';
import ProgressBar from './ProgressBar';

interface VideoPlayerProps {
  videoLink: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  progress: number;
  updateProgress: (progress: number) => void;
  togglePlayPause: () => void;
  resetVideo: () => void;
  onClose: () => void; // Add onClose prop
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoLink,
  videoRef,
  isPlaying,
  setIsPlaying,
  progress,
  updateProgress,
  togglePlayPause,
  resetVideo,
  onClose,
}) => {
  const baseUrl = "assets/videos";
  const holdTimeout = useRef<number | null>(null); // Ref for timeout

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      updateProgress((currentTime / duration) * 100);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onpause = () => setIsPlaying(false);
      videoRef.current.onplay = () => setIsPlaying(true);
    }
  }, [setIsPlaying]);

  // Handle keyboard input for arrow keys
  const handleKeyDown = (event: KeyboardEvent) => {
    if (videoRef.current) {
      const step = 5; // seconds to jump forward or backward
      switch (event.key) {
        case 'ArrowRight':
          videoRef.current.currentTime = Math.min(videoRef.current.currentTime + step, videoRef.current.duration);
          break;
        case 'ArrowLeft':
          videoRef.current.currentTime = Math.max(videoRef.current.currentTime - step, 0);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Mouse or touch hold-to-close functionality
  const startHoldToClose = () => {
    holdTimeout.current = window.setTimeout(onClose, 500); // Hold for 500ms to close
  };

  const cancelHoldToClose = () => {
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
      holdTimeout.current = null;
    }
  };

  return (
    <div className="flex justify-center w-full lg:w-fit h-full lg:min-w-64 bg-gray-800">

    <div
      className="relative w-fit h-full aspect-w-16 aspect-h-9 max-w-full max-h-full bg-inherit overflow-hidden flex flex-col justify-center"
      onMouseDown={startHoldToClose}
      onTouchStart={startHoldToClose}
      onMouseUp={cancelHoldToClose}
      onTouchEnd={cancelHoldToClose}
      onMouseLeave={cancelHoldToClose} // Cancels if mouse leaves the container
      >
      <div>
        <video
          ref={videoRef}
          controls={false}
          className="object-contain w-full h-full"
          // onClick={togglePlayPause}
          onTimeUpdate={handleTimeUpdate}
          >
          <source src={`${baseUrl}/${encodeURIComponent(videoLink)}`} type="video/mp4" />
        </video>

        {/* ProgressBar */}
        <ProgressBar videoRef={videoRef} progress={progress} />
      </div>

      {/* Control Buttons */}
      <VideoControls isPlaying={isPlaying} togglePlayPause={togglePlayPause} resetVideo={resetVideo} />
    </div>
            </div>
  );
};

export default VideoPlayer;
