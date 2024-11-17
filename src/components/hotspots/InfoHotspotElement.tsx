import React from 'react';
import { InfoHotspot } from '@/types/marzipano-types';
import infoImage from '@/assets/icons/info.png';
import { useVideoStore } from '@/context/useVideoStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface InfoHotspotElementProps {
  hotspot: InfoHotspot;
}

const InfoHotspotElement: React.FC<InfoHotspotElementProps> = ({ hotspot }) => {
  const { showVideo } = useVideoStore();
  const [isContentVisible, setContentVisibility] = React.useState(false);

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
      setTimeout(() => showVideo(hotspot.videoLink!), 200); // 2ms delay
    }
  };

  const bgColor = hotspot.videoLink ? 'bg-red-500' : 'bg-blue-500';
  const contentBgColor = hotspot.videoLink ? 'bg-red-400' : 'bg-blue-400';
  const textColor = hotspot.videoLink ? 'text-yellow-200' : 'text-white';
  const infoTextColor = hotspot.videoLink ? 'text-yellow-100' : 'text-white';

  return (
    <article className={`relative p-2 rounded-lg shadow-md transition-transform transform hover:scale-110 ${bgColor}`}
    >
      {/* Hotspot Button */}
      <button
        className="cursor-pointer flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8"
        onClick={toggleContentVisibility}
        aria-label={hotspot.videoLink ? 'Play video' : 'Show information'}
      >
        {hotspot.videoLink ? (
          <FontAwesomeIcon icon={faVideo as IconProp} className="text-white w-6 h-6 sm:w-8 sm:h-8 transition-transform transform hover:scale-110" />
        ) : (
          <img src={infoImage} alt="Info Icon" className="w-6 h-6 sm:w-8 sm:h-8 transition-transform transform hover:scale-110" />
        )}
      </button>

      {/* Main Section */}
      <section
        className={`absolute top-10 lg:top-12 left-0 p-2 sm:p-4 rounded-lg shadow-md transition-opacity duration-300 ${isContentVisible ? 'opacity-100 visible' : 'opacity-0 invisible'} ${contentBgColor} w-36 lg:w-64`}
        aria-hidden={!isContentVisible}
      >
        <header className="flex justify-between items-center mb-2">
          <h2 className={`text-sm sm:text-lg font-bold ${textColor}`}>
            {hotspot.title}
          </h2>
          <button
            onClick={closeContent}
            className="ml-4 bg-red-500 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded-full hover:bg-red-700"
            aria-label="Close content"
          >
            X
          </button>
        </header>

        {(hotspot.infoText || hotspot.videoLink) && <hr className="border-blue-300 mb-2" />}

        {hotspot.infoText && (
          <p className={`mt-2 text-xs sm:text-sm ${infoTextColor}`}>
            {hotspot.infoText}
          </p>
        )}

        {/* Video Button */}
        {hotspot.videoLink && (
          <div className="mt-2">
            <button
              onClick={handleShowVideoWithDelay}
              onMouseOver={handleShowVideoWithDelay}
              className="bg-white text-red-500 text-xs sm:text-base px-2 sm:px-4 py-1 sm:py-2 rounded-lg shadow-md hover:bg-red-100"
            >
              Watch Video
            </button>
          </div>
        )}
      </section>
    </article>
  );
};

export default InfoHotspotElement;
