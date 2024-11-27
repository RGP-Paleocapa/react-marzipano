import React, { useEffect, useState, useRef } from 'react';
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
  const [isHovered, setHovered] = useState(false);
  const [isContentVisible, setContentVisibility] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHovered) {
      setContentVisibility(true);
    } else {
      timeoutRef.current = setTimeout(() => {
        setContentVisibility(false);
      }, 200);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isHovered]);

  const handleMouseOver = () => {
    setHovered(true);
  };

  const handleMouseOut = () => {
    setHovered(false);
  };

  const handleFocusOrClick = (event: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setContentVisibility(prev => !prev);
  }

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
      className={`relative rounded-lg shadow-md transition-transform transform hover:scale-110 ${bgColor}`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {/* Hotspot Button */}
      <button
        className="cursor-pointer flex items-center justify-center w-10 h-10 md:w-14 md:h-14"
        onClick={handleFocusOrClick}
        onFocus={handleFocusOrClick}
        aria-label={hotspot.videoLink ? 'Play video' : 'Show information'}
      >
        {hotspot.videoLink ? (
          <FontAwesomeIcon
            icon={faVideo as IconProp}
            className="text-white w-8 md:w-11 h-full" // button width and height -2
          />
        ) : (
          <img
            src={infoImage}
            alt="Info Icon"
            className="h-full w-full"
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
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
    </article>
  );
};

export default InfoHotspotElement;
