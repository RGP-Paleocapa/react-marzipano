// components/InfoHotspotElement.tsx
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
    <div className="relative p-2 bg-blue-500 rounded-lg shadow-md">
      <div className="cursor-pointer flex items-center justify-center w-8 h-8" onClick={toggleContentVisibility}>
        <img src={infoImage} alt="Info Icon" className="w-8 h-8" />
      </div>
      <div className={`absolute top-12 left-0 bg-blue-400 p-4 rounded-lg shadow-md ${isContentVisible ? '' : 'hidden'}`}>
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">{hotspot.title}</div>
          <button onClick={closeContent} className="ml-4 text-red-500">X</button>
        </div>
        {hotspot.infoText && (
          <div className="mt-2 text-sm">{hotspot.infoText}</div>
        )}
        {hotspot.videoLink && (
          <div className="mt-2 text-sm">
            <button onClick={handleShowVideo} className="text-blue-600 underline">Watch Video</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoHotspotElement;
