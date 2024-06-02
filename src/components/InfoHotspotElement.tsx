import React, { useState } from 'react';
import { InfoHotspot } from '@/types/marzipano-types';

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
    <div className="hotspot">
      <div className="hotspot__icon" onClick={toggleContentVisibility}>
        i
      </div>
      <div className={`hotspot__content ${isContentVisible ? '' : 'hidden'}`}>
        <div className="hotspot__title">{hotspot.title}</div>
        <div className="hotspot__text">{hotspot.infoText}</div>
      </div>
    </div>
  );
};

export default InfoHotspotElement;
