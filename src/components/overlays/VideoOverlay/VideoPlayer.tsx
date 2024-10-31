import React, { useEffect, useRef } from 'react';
import VideoControls from './VideoControls';

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
      const volumeStep = 0.1; // volume adjustment step
      switch (event.key) {
        case 'ArrowRight':
          videoRef.current.currentTime = Math.min(videoRef.current.currentTime + step, videoRef.current.duration);
          break;
        case 'ArrowLeft':
          videoRef.current.currentTime = Math.max(videoRef.current.currentTime - step, 0);
          break;
        case 'ArrowUp':
          videoRef.current.volume = Math.min(videoRef.current.volume + volumeStep, 1);
          break;
        case 'ArrowDown':
          videoRef.current.volume = Math.max(videoRef.current.volume - volumeStep, 0);
          break;
        case 'r':
          resetVideo();
          break;
        case ' ':
        case 'p':
          event.preventDefault(); // Prevent scrolling
          togglePlayPause();
          break;
        case 'x':
          onClose();
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
    <div
      className="relative w-auto h-full aspect-w-16 aspect-h-9 max-w-full max-h-full bg-gray-800 rounded-lg overflow-hidden"
      onMouseDown={startHoldToClose}
      onTouchStart={startHoldToClose}
      onMouseUp={cancelHoldToClose}
      onTouchEnd={cancelHoldToClose}
      onMouseLeave={cancelHoldToClose} // Cancels if mouse leaves the container
    >
      <video
        ref={videoRef}
        controls={false}
        className="object-contain w-full h-full pb-2"
        onClick={togglePlayPause}
        onTimeUpdate={handleTimeUpdate}
      >
        <source src={`${baseUrl}/${encodeURIComponent(videoLink)}`} type="video/mp4" />
      </video>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-600 cursor-pointer" onClick={event => {
        const rect = event.currentTarget.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        if (videoRef.current) {
          const newTime = (offsetX / rect.width) * videoRef.current.duration;
          videoRef.current.currentTime = newTime;
        }
      }}>
        <div className="h-full bg-red-500" style={{ width: `${progress}%` }}></div>
      </div>
      <VideoControls isPlaying={isPlaying} togglePlayPause={togglePlayPause} resetVideo={resetVideo} />
    </div>
  );
};

export default VideoPlayer;
