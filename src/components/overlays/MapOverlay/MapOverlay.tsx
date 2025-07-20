import { useState } from 'react';
import imageMap from '@/assets/images/image.jpg';
import FullscreenOverlay from './FullscreenOverlay';
import MapView from './MapView';
import { DotPosition } from './Dot';
import CloseButton from './CloseButton';

const MapOverlay = () => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);


  const dotPositions: DotPosition[] = [
    { index: 11, x: 23, y: 24, roomIndexes: [12, 13, 14, 15, 16, 17] },
    { index: 10, x: 23, y: 52, roomIndexes: [] },
    { index: 8, x: 40, y: 34, roomIndexes: [7, 9] },
    { index: 2, x: 58, y: 42, roomIndexes: [3, 4] },
    { index: 0, x: 69, y: 63, roomIndexes: [1] },
    { index: 5, x: 76, y: 30, roomIndexes: [6] },
  ];

  return (
    <>
      {isFullscreen ? (
        <FullscreenOverlay onClick={(() => setIsFullscreen(false))}>
          <MapView
            mapSrc={imageMap}
            dotPositions={dotPositions}
            isFullscreen
            openFullscreen={() => setIsFullscreen(true)}
            closeFullscreen={() => setIsFullscreen(false)}
          />
          <CloseButton
            className="lg:hidden top-5 right-5"
            onClick={() => setIsFullscreen(false)}
          />
        </FullscreenOverlay>
      ) : (
        <div
          className={`absolute bottom-20 right-0 lg:bottom-20 lg:right-6 z-10 w-auto lg:w-[250px] cursor-pointer transform hover:scale-105`}
        >
          <MapView
            mapSrc={imageMap}
            dotPositions={dotPositions}
            isFullscreen={false}
            closeFullscreen={() => setIsFullscreen(false)}
            openFullscreen={() => setIsFullscreen(true)}
          />

          <button
            className={`bg-blue-500 px-6 py-3 text-sm rounded-lg mr-4 ${
              isFullscreen ? 'hidden' : 'lg:hidden'
            }`}
            onClick={() => setIsFullscreen(true)}
          >
            Apri mappa
          </button>
        </div>
      )}
    </>
  );
};

export default MapOverlay;
