import React, { useRef, useEffect, useCallback } from 'react';
import VideoPlayer from './VideoPlayer';
// import VideoControls from './VideoControls';

interface VideoOverlayProps {
  videoLink: string;
  onClose: () => void;
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({ videoLink, onClose }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

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

        <VideoPlayer videoLink={videoLink} />
      </div>
    </div>
  );
};

export default VideoOverlay;
