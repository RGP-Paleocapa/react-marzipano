import React from 'react';

interface NavbarProps {
  // onAlertClick: () => void;
  onToggleAutorotation: () => void;
  isAutorotating: boolean;
  onToggleFullscreen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleAutorotation, isAutorotating, onToggleFullscreen }) => {
  return (
    <div className="absolute top-0 left-0 w-full bg-gray-800 p-4 flex justify-between items-center z-40">
      {/* <button className="bg-blue-800 text-white px-4 py-2" onClick={onAlertClick}>Ciao</button> */}
      <button className="bg-green-800 text-white px-4 py-2" onClick={onToggleAutorotation}>
        {isAutorotating ? 'Stop Autorotation' : 'Start Autorotation'}
      </button>
      <button className="bg-red-800 text-white px-4 py-2" onClick={onToggleFullscreen}>
        Toggle Fullscreen
      </button>
    </div>
  );
};

export default Navbar;
