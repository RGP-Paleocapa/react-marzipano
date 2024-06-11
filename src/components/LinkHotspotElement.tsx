import React from 'react';
import linkImage from '@/assets/icons/link.png';
import linkRedImage from '@/assets/icons/linkred.png';

interface LinkHotspotElementProps {
  switchToScene: () => void;
  isRed: boolean;
  rotation?: number;
}

const LinkHotspotElement: React.FC<LinkHotspotElementProps> = ({ switchToScene, isRed, rotation }) => {
  console.log(rotation);
  return (
    <div
      className="w-14 p-0 m-0 rounded-3xl flex items-center justify-center cursor-pointer"
      style={{ transform: `rotate(${rotation}deg)` }}
      onClick={(e) => {
        e.stopPropagation();
        switchToScene();
      }}
    >
      <img src={isRed ? linkRedImage : linkImage} alt="Link Icon" className="w-14 h-14" />
    </div>
  );
};

export default LinkHotspotElement;
