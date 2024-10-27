import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRedo, faSearchPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons';

interface VideoOverlayProps {
  videoLink: string;
  onClose: () => void;
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({ videoLink, onClose }) => {
  const baseUrl = "assets/videos";
  const isYouTubeLink = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\\s]{11})/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : '';
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [longPressTimeout, setLongPressTimeout] = useState<NodeJS.Timeout | null>(null);

  // Handle progress update
  const updateProgress = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((currentTime / duration) * 100);
    }
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Reset video
  const resetVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause(); // Pause the video if it's playing
      videoRef.current.currentTime = 0;
      setProgress(0);
      setIsPlaying(false);
    }
  };

  // Seek video
  const seekVideo = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (videoRef.current) {
      const rect = event.currentTarget.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const newTime = (offsetX / rect.width) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
  };

  // Close overlay if clicked outside the video container
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

  // Handle keyboard events for play/pause and exit
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose(); // Exit the video overlay
    } else if (event.key === ' ') {
      event.preventDefault(); // Prevent scrolling
      togglePlayPause(); // Toggle play/pause
    } else if (event.key.toLowerCase() === 'r') {
      resetVideo(); // Reset video
    }
  }, [onClose, togglePlayPause]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Toggle zoom
  const toggleZoom = () => {
    setIsZoomed(prev => !prev);
  };

  // Handle long press to close the overlay
  const handleLongPressStart = () => {
    const timeout = setTimeout(() => {
      onClose();
    }, 500); // 500ms for long press
    setLongPressTimeout(timeout);
  };

  const handleLongPressEnd = () => {
    if (longPressTimeout) {
      clearTimeout(longPressTimeout);
      setLongPressTimeout(null);
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-20 transition-opacity duration-300 ease-in-out ${isZoomed ? 'overflow-hidden' : ''}`}>
      <div
        ref={containerRef}
        className={`relative w-full h-full max-w-5xl max-h-full flex items-center justify-center p-4 ${isZoomed ? 'transform scale-125' : ''}`}
        onTouchStart={handleLongPressStart}
        onTouchEnd={handleLongPressEnd}
        onMouseDown={handleLongPressStart} // For desktop long press
        onMouseUp={handleLongPressEnd} // For desktop long press
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-600 text-white rounded-full w-14 h-14 flex items-center justify-center z-40"
          aria-label="Close video"
        >
          X
        </button>
        <div className="w-full h-auto aspect-w-16 aspect-h-9 max-w-full max-h-full bg-gray-800 rounded-lg overflow-hidden relative">
          {isYouTubeLink(videoLink) ? (
            <iframe
              className="w-full h-full"
              src={getYouTubeEmbedUrl(videoLink)}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ border: 0 }}
            ></iframe>
          ) : (
            <video
              ref={videoRef}
              controls={false}
              className="w-full h-full"
              onClick={togglePlayPause}
              onTimeUpdate={updateProgress}
            >
              <source src={`${baseUrl}/${encodeURIComponent(videoLink)}`} type="video/mp4" />
              <source src={`${baseUrl}/${encodeURIComponent(videoLink.replace('.mp4', '.webm'))}`} type="video/webm" />
              <source src={`${baseUrl}/${encodeURIComponent(videoLink.replace('.mp4', '.ogv'))}`} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          )}
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-600 cursor-pointer" onClick={seekVideo}>
            <div className="h-full bg-red-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Control Buttons Outside the Video Box */}
        <div className="absolute bottom-8 flex justify-center space-x-4 z-50">
          <button
            onClick={togglePlayPause}
            className={`flex items-center justify-center bg-${isPlaying ? 'red-500' : 'green-500'} text-white px-6 py-2 rounded-lg shadow-lg hover:bg-opacity-80 transform transition-transform duration-150 ease-in-out`}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            style={{ minWidth: '100px' }} // Keeps button width consistent
          >
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="mr-2" />
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={resetVideo}
            className="flex items-center justify-center bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-opacity-80 transform transition-transform duration-150 ease-in-out"
            aria-label="Reset video"
            style={{ minWidth: '100px' }} // Keeps button width consistent
          >
            <FontAwesomeIcon icon={faRedo} className="mr-2" />
            Reset
          </button>
          {/* Zoom Button */}
          <button
            onClick={toggleZoom}
            className="flex items-center justify-center bg-gray-700 text-white rounded-lg p-2 shadow-lg hover:bg-opacity-80 transform transition-transform duration-150 ease-in-out"
            aria-label={isZoomed ? 'Zoom Out' : 'Zoom In'}
          >
            <FontAwesomeIcon icon={isZoomed ? faSearchMinus : faSearchPlus} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoOverlay;
