import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface VideoControlButtonProps {
  onClick: () => void;
  icon: IconDefinition;
  label: string;
  color: string;
  isMobile: boolean;
}

const VideoControlButton: React.FC<VideoControlButtonProps> = ({ onClick, icon, label, color, isMobile }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={label}
      className={`flex items-center justify-center text-white rounded-lg shadow-lg hover:bg-opacity-80 transform transition-transform duration-150 ease-in-out ${
        isMobile ? 'p-2' : 'px-4 py-2'
      } ${color}`}
    >
      <FontAwesomeIcon icon={icon} className={isMobile ? '' : 'mr-2'} />
      {!isMobile && label}
    </button>
  );
};

export default VideoControlButton;
