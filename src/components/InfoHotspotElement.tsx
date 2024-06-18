import React from 'react';
import { InfoHotspot } from '@/types/marzipano-types';
import infoImage from '@/assets/icons/info.png';
import { useVideoStore } from '@/context/useVideoStore';

interface InfoHotspotElementProps {
  hotspot: InfoHotspot;
}

const InfoHotspotElement: React.FC<InfoHotspotElementProps> = ({ hotspot }) => {
  const { showVideo } = useVideoStore();
  const [isContentVisible, setContentVisibility] = React.useState(false);

  const toggleContentVisibility = (event: React.MouseEvent) => {
    event.stopPropagation();
    setContentVisibility(!isContentVisible);
  };

  const closeContent = (event: React.MouseEvent) => {
    event.stopPropagation();
    setContentVisibility(false);
  };

  const handleShowVideo = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (hotspot.videoLink) {
      showVideo(hotspot.videoLink);
    }
  };

  return (
    <div className="relative p-2 bg-blue-500 rounded-lg shadow-md transition-transform transform hover:scale-110">
      <div
        className="cursor-pointer flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8"
        onClick={toggleContentVisibility}
      >
        <img src={infoImage} alt="Info Icon" className="w-6 h-6 sm:w-8 sm:h-8 transition-transform transform hover:scale-110" />
      </div>
      <div className={`absolute top-10 left-0 bg-blue-400 p-2 sm:p-4 rounded-lg shadow-md transition-opacity duration-300 ${isContentVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm sm:text-lg font-bold text-white">{hotspot.title}</div>
          <button onClick={closeContent} className="ml-4 bg-red-500 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded-full hover:bg-red-700">X</button>
        </div>
        <hr className="border-blue-300 mb-2" />
        {hotspot.infoText && (
          <div className="mt-2 text-xs sm:text-sm text-white">{hotspot.infoText}</div>
        )}
        {hotspot.videoLink && (
          <div className="mt-2">
            <button onClick={handleShowVideo} className="bg-white text-blue-500 text-xs sm:text-base px-2 sm:px-4 py-1 sm:py-2 rounded-lg shadow-md hover:bg-blue-100">Watch Video</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoHotspotElement;
