import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import infoImage from '@/assets/icons/info.png';
import { InfoHotspot } from '@/types/marzipano-types';
import { useVideoStore } from '@/context/useVideoStore';
import HotspotContent from './HotspotContent';

interface InfoHotspotElementProps {
  hotspot: InfoHotspot;
}

const InfoHotspotElement: React.FC<InfoHotspotElementProps> = ({ hotspot }) => {
  const { showVideo } = useVideoStore();
  const [isContentVisible, setContentVisibility] = useState(false);

  const toggleContentVisibility = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setContentVisibility(prev => !prev);
  };

  const closeContent = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setContentVisibility(false);
  };

  const handleShowVideoWithDelay = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (hotspot.videoLink) {
      setTimeout(() => showVideo(hotspot.videoLink!), 200); // 200ms delay
    }
  };

  const bgColor = hotspot.videoLink ? 'bg-red-500' : 'bg-blue-500';
  const contentBgColor = hotspot.videoLink ? 'bg-red-400' : 'bg-blue-400';
  const textColor = hotspot.videoLink ? 'text-yellow-200' : 'text-white';
  const infoTextColor = hotspot.videoLink ? 'text-yellow-100' : 'text-white';

  return (
    <article
      className={`relative p-2 rounded-lg shadow-md transition-transform transform hover:scale-110 ${bgColor}`}
    >
      {/* Hotspot Button */}
      <button
        className="cursor-pointer flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8"
        onClick={toggleContentVisibility}
        aria-label={hotspot.videoLink ? 'Play video' : 'Show information'}
      >
        {hotspot.videoLink ? (
          <FontAwesomeIcon
            icon={faVideo as IconProp}
            className="text-white w-6 h-6 sm:w-8 sm:h-8 transition-transform transform hover:scale-110"
          />
        ) : (
          <img
            src={infoImage}
            alt="Info Icon"
            className="w-6 h-6 sm:w-8 sm:h-8 transition-transform transform hover:scale-110"
          />
        )}
      </button>

      {/* Hotspot Content */}
      <HotspotContent
        isVisible={isContentVisible}
        contentBgColor={contentBgColor}
        textColor={textColor}
        infoTextColor={infoTextColor}
        title={hotspot.title}
        infoText={hotspot.infoText!}
        videoLink={hotspot.videoLink!}
        onClose={closeContent}
        onShowVideo={handleShowVideoWithDelay}
      />
    </article>
  );
};

export default InfoHotspotElement;
