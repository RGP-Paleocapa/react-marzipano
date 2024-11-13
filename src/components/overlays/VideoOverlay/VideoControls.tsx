import React from 'react';
import VideoControlButton from './VideoControlButton';
import { faPlay, faPause, faRedo } from '@fortawesome/free-solid-svg-icons';

interface VideoControlsProps {
  isPlaying: boolean;
  togglePlayPause: () => void;
  resetVideo: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({ isPlaying, togglePlayPause, resetVideo }) => {
  return (
    <div>
      {/* Desktop Control Buttons */}
      <div className="absolute z-50 top-4 left-1/2 transform -translate-x-1/2 space-x-4 md:flex hidden">
        <VideoControlButton
          onClick={togglePlayPause}
          icon={isPlaying ? faPause : faPlay}
          label={isPlaying ? 'Pause' : 'Play'}
          color={isPlaying ? 'bg-red-500' : 'bg-green-500'}
          isMobile={false}
        />
        <VideoControlButton
          onClick={resetVideo}
          icon={faRedo}
          label="Reset"
          color="bg-blue-500"
          isMobile={false}
        />
      </div>

      {/* Mobile Control Buttons */}
      <div className="absolute top-4 left-4 flex flex-col space-y-2 z-50 md:hidden">
        <VideoControlButton
          onClick={togglePlayPause}
          icon={isPlaying ? faPause : faPlay}
          label={isPlaying ? 'Pause' : 'Play'}
          color={isPlaying ? 'bg-red-500' : 'bg-green-500'}
          isMobile={true}
        />
        <VideoControlButton
          onClick={resetVideo}
          icon={faRedo}
          label="Reset"
          color="bg-blue-500"
          isMobile={true}
        />
      </div>
    </div>
  );
};

export default VideoControls;
