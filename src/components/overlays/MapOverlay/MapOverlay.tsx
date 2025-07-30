import { useState } from 'react';
import imageMap from '@/assets/images/image.jpg';
import FullscreenOverlay from './FullscreenOverlay';
import MapView from './MapView';
import { DotPosition } from './Dot';
import CloseButton from './CloseButton';

const MapOverlay = () => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);


  const dotPositions: DotPosition[] = [
    { index: 16, x: 62, y: 21, roomIndexes: [15, 17] },
    { index: 12, x: 47, y: 33, roomIndexes: [13, 14] },
    { index: 11, x: 21, y: 32, roomIndexes: [] },
    { index: 10, x: 22, y: 59, roomIndexes: [] },
    { index: 8, x: 40, y: 46, roomIndexes: [7, 9] },
    { index: 2, x: 56, y: 52, roomIndexes: [3, 4] },
    { index: 0, x: 65, y: 68, roomIndexes: [1] },
    { index: 5, x: 73, y: 42, roomIndexes: [6] },
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
