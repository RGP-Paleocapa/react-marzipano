import React from 'react';
import infoImage from '@/assets/icons/info.png';
import playIcon from '@/assets/icons/play.png';
import pauseIcon from '@/assets/icons/pause.png';
import fullscreenIcon from '@/assets/icons/fullscreen.png';
// import AutomaticButton from '@/components/layout/header/AutomaticButton';
import { useSceneStore } from '@/context/useSceneStore';
import { useViewStore } from '@/context/useViewerStore';

interface NavbarProps {
  onToggleFullscreen: () => void;
  onShowInfo: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleFullscreen, onShowInfo }) => {

  const { autoSwitch } = useSceneStore();
  const { isRotating, toggleRotation } = useViewStore();

  return (
    <div className="absolute top-0 left-0 w-full bg-gray-800 flex justify-between items-center z-10 h-10 md:h-12">
      <button
        className="bg-blue-800 text-white flex items-center justify-center hover:bg-blue-700 transition-colors duration-200 ease-in-out h-full w-12"
        onClick={onShowInfo}
        aria-label="Show Information"
      >
        <img src={infoImage} alt="Info" className="w-6 h-6" />
      </button>
      <div className="flex h-full space-x-2">
        {/* <AutomaticButton /> */}
        <button
          className={`text-white flex items-center justify-center h-full w-36 transition-colors duration-200 ease-in-out ${autoSwitch ? `bg-gray-600` : isRotating ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'}`}
          onClick={() => toggleRotation(!isRotating)}
          aria-label={isRotating ? 'Stop Autorotation' : 'Start Autorotation'}
          disabled={autoSwitch}
        >
          <img src={isRotating ? pauseIcon : playIcon} alt={isRotating ? 'Stop Autorotation' : 'Start Autorotation'} className="w-6 h-6" />
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
