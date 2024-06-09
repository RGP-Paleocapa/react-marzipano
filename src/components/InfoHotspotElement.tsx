import React, { useState } from 'react';
import { InfoHotspot } from '@/types/marzipano-types';
import infoImage from '@/assets/icons/info.png';

interface InfoHotspotElementProps {
  hotspot: InfoHotspot;
}

const InfoHotspotElement: React.FC<InfoHotspotElementProps> = ({ hotspot }) => {
  const [isContentVisible, setContentVisibility] = useState(false);

  const toggleContentVisibility = (event: React.MouseEvent) => {
    event.stopPropagation();
    setContentVisibility(!isContentVisible);
  };

  return (
    <div className="relative p-2 bg-blue-500 rounded-lg shadow-md">
      <div className="cursor-pointer flex items-center justify-center w-8 h-8" onClick={toggleContentVisibility}>
        <img src={infoImage} alt="Info Icon" className="w-8 h-8" />
      </div>
      <div className={`absolute top-12 left-0 bg-blue-400 p-4 rounded-lg shadow-md ${isContentVisible ? '' : 'hidden'}`}>
        <div className="text-lg font-bold">{hotspot.title}</div>
        <div className="mt-2 text-sm">{hotspot.infoText}</div>
      </div>
    </div>
  );
};

export default InfoHotspotElement;
