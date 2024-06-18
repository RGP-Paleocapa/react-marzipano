import React from 'react';
import infoImage from '@/assets/icons/info.png';
import playIcon from '@/assets/icons/play.png';
import pauseIcon from '@/assets/icons/pause.png';
import fullscreenIcon from '@/assets/icons/fullscreen.png';

interface NavbarProps {
  onToggleAutorotation: () => void;
  isAutorotating: boolean;
  onToggleFullscreen: () => void;
  onShowInfo: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleAutorotation, isAutorotating, onToggleFullscreen, onShowInfo }) => {
  return (
    <div className="absolute top-0 left-0 w-full bg-gray-800 flex justify-between items-center z-10 h-12">
      <button
        className="bg-blue-800 text-white flex items-center justify-center hover:bg-blue-700 transition-colors duration-200 ease-in-out h-full w-12"
        onClick={onShowInfo}
        aria-label="Show Information"
      >
        <img src={infoImage} alt="Info" className="w-6 h-6" />
      </button>
      <div className="flex h-full space-x-2">
        <button
          className={`text-white flex items-center justify-center h-full w-36 transition-colors duration-200 ease-in-out ${isAutorotating ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'}`}
          onClick={onToggleAutorotation}
          aria-label={isAutorotating ? 'Stop Autorotation' : 'Start Autorotation'}
        >
          <img src={isAutorotating ? pauseIcon : playIcon} alt={isAutorotating ? 'Stop Autorotation' : 'Start Autorotation'} className="w-6 h-6" />
        </button>
        <button
          className="bg-yellow-600 text-gray-800 flex items-center justify-center hover:bg-yellow-500 transition-colors duration-200 ease-in-out h-full w-12"
          onClick={onToggleFullscreen}
          aria-label="Toggle Fullscreen"
        >
          <img src={fullscreenIcon} alt="Toggle Fullscreen" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
