import React from 'react';
import playIcon from '@/assets/icons/play.png';
import pauseIcon from '@/assets/icons/pause.png';
import fullscreenIcon from '@/assets/icons/fullscreen.png';
import { useSceneStore } from '@/context/useSceneStore';
import { useViewStore } from '@/context/useViewerStore';
import NavButton from './NavButton';

interface NavbarProps {
  onToggleFullscreen: () => void;
  onShowContent: (content: 'info' | 'credits') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleFullscreen, onShowContent }) => {
  const { autoSwitch } = useSceneStore();
  const { isRotating, toggleRotation } = useViewStore();

  return (
    <div className="absolute bottom-0 left-0 w-full bg-[rgba(0,0,0,0.5)] hover:bg-[rgba(0,0,0,0.8)] flex justify-between items-center z-20 pl-4 shadow-xl">
      {/* Left Side: Info and Credits Buttons */}
      <div className="flex space-x-4 lg:space-x-10">
        <NavButton
          btnText="Help"
          onClick={() => onShowContent('info')}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white font-semibold rounded-full px-14 py-5 shadow-md transition-all duration-200 transform hover:scale-105"
        />
        <NavButton
          btnText="Crediti"
          onClick={() => onShowContent('credits')}
          className="bg-gray-600 hover:bg-gray-500 text-gray-300 font-semibold rounded-full px-4 py-3 opacity-60 hover:opacity-100 transition-opacity duration-200"
        />
      </div>

      {/* Right Side: Play/Pause and Fullscreen Buttons */}
      <div className="flex h-full space-x-4 lg:space-x-10">
        <button
          className={`flex items-center justify-center h-16 w-16 transition-all duration-300 rounded-full shadow-lg ${
            autoSwitch
              ? 'bg-gray-600 cursor-not-allowed'
              : isRotating
              ? 'bg-red-600 hover:bg-red-500 transform hover:scale-105'
              : 'bg-green-600 hover:bg-green-500 transform hover:scale-105'
          }`}
          onClick={() => toggleRotation(!isRotating)}
          aria-label={isRotating ? 'Stop Autorotation' : 'Start Autorotation'}
          disabled={autoSwitch}
        >
          <img
            src={isRotating ? pauseIcon : playIcon}
            alt={isRotating ? 'Stop Autorotation' : 'Start Autorotation'}
            className="w-8 h-8"
          />
        </button>
        <button
          className="bg-yellow-600 text-gray-800 flex items-center justify-center hover:bg-yellow-500 transition-all duration-200 h-12 w-12 rounded-full shadow-lg transform hover:scale-105"
          onClick={onToggleFullscreen}
          aria-label="Toggle Fullscreen"
        >
          <img src={fullscreenIcon} alt="Toggle Fullscreen" className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
