import React from 'react';
import linkImage from '@/assets/icons/link.png';
import linkRedImage from '@/assets/icons/linkred.png';
import { LinkHotspot } from '@/types/marzipano-types';

interface LinkHotspotElementProps {
  switchToScene: () => void;
  hotspot: LinkHotspot;
}

const LinkHotspotElement: React.FC<LinkHotspotElementProps> = ({ switchToScene, hotspot }) => {
  return (
    <div
      className="w-14 p-0 m-0 rounded-3xl flex items-center justify-center cursor-pointer"
      style={{ transform: `rotate(${hotspot.rotation}deg)` }}
      onClick={(e) => {
        e.stopPropagation();
        switchToScene();
      }}
      tabIndex={0}
      role="button"
      aria-label={hotspot.text || 'Link hotspot'}
      title={hotspot.text}
    >
      <img src={hotspot.isRed ? linkRedImage : linkImage} alt="Link Icon" className="w-14 h-14" />
    </div>
  );
};

export default LinkHotspotElement;
