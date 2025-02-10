import React, { useRef, useEffect, useCallback, useState } from 'react';
import VideoPlayer from './VideoPlayer';
import IndicatorComponent from './IndicatorComponent';

interface VideoOverlayProps {
  videoLink: string;
  onClose: () => void;
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({ videoLink, onClose }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volumeIndicator, setVolumeIndicator] = useState<'up' | 'down' | 'muted' | null>(null);
  const [playPauseIndicator, setPlayPauseIndicator] = useState<'play' | 'pause' | null>(null);
  const [volumeLevel, setVolumeLevel] = useState<number>(10); // Volume level from 0 to 10
  const [longPressTimeout, setLongPressTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Autoplay failed:', error);
          setIsPlaying(false);
        });
      } else {
        setIsPlaying(true);
      }
    }
  }, []);

  const handleAction = async (
    action: 'play' | 'pause' | 'reset',
    video: HTMLVideoElement
  ): Promise<boolean> => {

    if (!video) return false;

    try {
      if (action === 'play') {
        const playPromise = video.play();
        if (playPromise) await playPromise;
      } else if (action === 'pause') {
        video.pause();
      } else if (action === 'reset') {
        video.pause();
        video.currentTime = 0;
      }
      return true;
    } catch (error) {
      console.error(`Failed to ${action} the video:`, error);
      return false;
    }
  }

  const displayTemporaryIndicator = (setter: React.Dispatch<React.SetStateAction<any>>, value: any) => {
    setter(value);
    setTimeout(() => setter(null), 500); // Display indicator for 500 ms
  };

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

  const togglePlayPause = async () => {
    if (videoRef.current) {
      const isPaused = videoRef.current.paused;
      const success = await handleAction(isPaused ? 'play' : 'pause', videoRef.current);
      if (success) {
        setIsPlaying(true);
        displayTemporaryIndicator(setPlayPauseIndicator, isPaused ? 'play' : 'pause');
      }
    }
  };

  const resetVideo = async () => {
    if (videoRef.current) {
      const success = await handleAction('reset', videoRef.current);
      if (success) {
        setProgress(0);
        setIsPlaying(false);
      }
    }
  };

  const adjustVolume = (direction: 'up' | 'down') => {
    if (videoRef.current) {
      const volumeStep = 1; // Change volume by 1 level (0-10)
      if (direction === 'up') {
        if (volumeLevel < 10) {
          videoRef.current.volume = Math.min(videoRef.current.volume + 0.1, 1);
          setVolumeLevel(prev => Math.min(prev + volumeStep, 10));
          displayTemporaryIndicator(setVolumeIndicator, 'up');
        }
      } else {
        if (volumeLevel > 0) {
          videoRef.current.volume = Math.max(videoRef.current.volume - 0.1, 0);
          setVolumeLevel(prev => Math.max(prev - volumeStep, 0));
          if (videoRef.current.volume === 0) {
            displayTemporaryIndicator(setVolumeIndicator, 'muted');
          } else {
            displayTemporaryIndicator(setVolumeIndicator, 'down');
          }
        }
      }
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
        case 'arrowup':
          adjustVolume('up');
          break;
        case 'arrowdown':
          adjustVolume('down');
          break;
        case 'x':
          onClose();
          break;
        default:
          break;
      }
    },
    [togglePlayPause, adjustVolume, onClose]
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

  const handleLongPressStart = () => {
    const timeout = setTimeout(() => {
      onClose();
    }, 500);
    setLongPressTimeout(timeout);
  }

  const handleLongPressEnd = () => {
    if (longPressTimeout) {
      clearTimeout(longPressTimeout);
      setLongPressTimeout(null);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-30"
      onClick={togglePlayPause}
    >
      <div
        ref={containerRef}
        className="relative h-full w-auto max-w-5xl flex items-center justify-center lg:p-4 bg-black" // bg should not be visible
        onTouchStart={handleLongPressStart}
        onTouchEnd={handleLongPressEnd}
        onMouseDown={handleLongPressStart}
        onMouseUp={handleLongPressEnd}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-600 text-white rounded-full w-14 h-14 flex items-center justify-center z-40"
          aria-label="Close video"
        >
          X
        </button>

        {/* Video Player */}
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

        {/* Volume and Play/Pause Indicator */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-3xl -z-10">
          {volumeIndicator && (
            <IndicatorComponent
              indicatorType="volume"
              volumeParams={{
                volumeIndicator,
                volumeLevel
              }}
            />
            )}
          {playPauseIndicator && (
            <IndicatorComponent
              indicatorType={`playPause`}
              playPauseParams={{
                playPauseIndicator,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoOverlay;
