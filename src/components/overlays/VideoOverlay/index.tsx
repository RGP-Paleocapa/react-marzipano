import React, { useRef, useEffect, useCallback, useState } from 'react';
import VideoPlayer from './VideoPlayer';

interface VideoOverlayProps {
  videoLink: string;
  onClose: () => void;
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({ videoLink, onClose }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const resetVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setProgress(0);
      setIsPlaying(false);
    }
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 'r':
          resetVideo();
          break;
        case ' ':
        case 'p':
          event.preventDefault();
          togglePlayPause();
          break;
        case 'x':
          onClose();
          break;
        default:
          break;
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const updateProgress = (newProgress: number) => {
    setProgress(newProgress);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-20">
      <div ref={containerRef} className="relative w-full h-full max-w-5xl max-h-full flex items-center justify-center p-4 bg-black">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-600 text-white rounded-full w-14 h-14 flex items-center justify-center z-40"
          aria-label="Close video"
        >
          X
        </button>
        <VideoPlayer
          videoLink={videoLink}
          videoRef={videoRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          progress={progress}
          updateProgress={updateProgress}
          togglePlayPause={togglePlayPause}
          resetVideo={resetVideo}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default VideoOverlay;
