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
    <div className="absolute top-0 left-0 w-full bg-gray-900 flex justify-between items-center z-20 h-12 md:h-14 shadow-lg">
      {/* Left Side: Info and Credits Buttons */}
      <div className="flex space-x-3 ml-4">
        <NavButton
          btnText="?"
          onClick={() => onShowContent('info')}
          className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-3 py-2"
        />
        <NavButton
          btnText="Crediti"
          onClick={() => onShowContent('credits')}
          className="bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-full px-3 py-2 opacity-70"
        />
      </div>

      {/* Right Side: Play/Pause and Fullscreen Buttons */}
      <div className="flex h-full space-x-3 mr-4">
        <button
          className={`flex items-center justify-center h-full w-36 transition-colors duration-200 rounded-lg shadow-md ${
            autoSwitch
              ? 'bg-gray-600 cursor-not-allowed'
              : isRotating
              ? 'bg-red-600 hover:bg-red-500'
              : 'bg-green-600 hover:bg-green-500'
          }`}
          onClick={() => toggleRotation(!isRotating)}
          aria-label={isRotating ? 'Stop Autorotation' : 'Start Autorotation'}
          disabled={autoSwitch}
        >
          <img
            src={isRotating ? pauseIcon : playIcon}
            alt={isRotating ? 'Stop Autorotation' : 'Start Autorotation'}
            className="w-6 h-6"
          />
        </button>
        <button
          className="bg-yellow-600 text-gray-800 flex items-center justify-center hover:bg-yellow-500 transition-colors duration-200 h-full w-14 rounded-lg shadow-md"
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
