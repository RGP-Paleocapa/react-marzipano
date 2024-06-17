import React from 'react';

interface NavbarProps {
  onToggleAutorotation: () => void;
  isAutorotating: boolean;
  onToggleFullscreen: () => void;
  onShowInfo: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleAutorotation, isAutorotating, onToggleFullscreen, onShowInfo }) => {
  return (
    <div className="absolute top-0 left-0 w-full bg-gray-800 flex justify-between items-center z-10 p-4">
      <button
        className="bg-blue-800 text-white w-10 h-10 flex items-center justify-center hover:opacity-80"
        onClick={onShowInfo}
      >
        i
      </button>
      <div className="flex space-x-4">
        <button className="bg-green-800 text-white px-4 py-2 hover:opacity-80" onClick={onToggleAutorotation}>
          {isAutorotating ? 'Stop Autorotation' : 'Start Autorotation'}
        </button>
        <button className="bg-red-800 text-white px-4 py-2 hover:opacity-80" onClick={onToggleFullscreen}>
          Toggle Fullscreen
        </button>
      </div>
    </div>
  );
};

export default Navbar;
