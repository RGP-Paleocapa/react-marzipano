import { useState, useEffect } from 'react';
import map from '@/assets/images/image.jpg';
import Dot from '../hotspots/Dot';

const MapOverlay = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isFullScreen) {
      setIsAnimating(true);
    }
  }, [isFullScreen]);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const closeFullScreen = (withAnimation = true) => {
    if (!withAnimation) {
      setIsAnimating(false);
    }
    setIsFullScreen(false);
  };

  // Example array of dot positions (in percentages) with index
  const dotPositions = [
    { index: 11, x: 23, y: 24, roomIndexes: [] },
    { index: 10, x: 23, y: 52, roomIndexes: [] },
    { index: 8, x: 40, y: 34, roomIndexes: [7, 9, 12, 13, 14, 15, 16, 17] },
    { index: 2, x: 58, y: 42, roomIndexes: [3, 4] },
    { index: 0, x: 69, y: 63, roomIndexes: [1] },
    { index: 5, x: 76, y: 30, roomIndexes: [6] },
  ];

  return (
    <div>
      {isFullScreen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10" onClick={() => closeFullScreen(true)}></div>
      )}
      <div
        className={`z-10 rounded-lg cursor-pointer max-w-full max-h-full ${
          isFullScreen ? 'fixed inset-0 m-auto flex items-center justify-center w-full h-full' : 'absolute bottom-10 right-10 w-[150px] lg:w-[250px]'
        } ${isAnimating ? 'transition-all duration-300 ease-in-out' : ''}`}
        onClick={!isFullScreen ? toggleFullScreen : undefined}
      >
        <div className={`relative w-fit h-fit bg-blue-600 ${isFullScreen ? 'rounded-none' : 'rounded-3xl'} ${isAnimating ? 'transition-transform transform' : ''} ${!isFullScreen ? 'hover:scale-105' : ''}`}>
          <img
            src={map}
            alt="Map"
            className={`w-full h-full object-contain ${!isFullScreen ? 'hover:opacity-75 rounded-inherit' : 'rounded-3xl'}`}
            style={{ borderRadius: isFullScreen ? '0' : 'inherit' }}
          />
          {isFullScreen && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeFullScreen();
              }}
              className="absolute invisible lg:visible top-5 right-5 mt-2 mr-2 cursor-pointer bg-red-700 text-white w-12 h-12 border-2 rounded-lg shadow-lg"
            >
              X
            </button>
          )}
          {dotPositions.map(({ index, x, y, roomIndexes }) => (
            <Dot
              key={index}
              index={index}
              x={x}
              y={y}
              closeFullScreen={() => closeFullScreen(false)} // Disable animation when a dot is clicked
              isFullScreen={isFullScreen}
              roomIndexes={roomIndexes}
            />
          ))}
        </div>
        {isFullScreen && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeFullScreen();
            }}
            className="fixed lg:hidden top-5 right-5 mt-2 mr-2 cursor-pointer bg-red-700 text-white w-12 h-12 border-2 rounded-lg shadow-lg z-20 animate-pulse"
          >
            X
          </button>
        )}
      </div>
    </div>
  );
};

export default MapOverlay;
