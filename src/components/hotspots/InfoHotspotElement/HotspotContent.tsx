import React from 'react';

interface HotspotContentProps {
  isVisible: boolean;
  contentBgColor: string;
  textColor: string;
  infoTextColor: string;
  title: string;
  infoText: string | null;
  videoLink: string | null;
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onShowVideo: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseOver: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseOut: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const HotspotContent: React.FC<HotspotContentProps> = ({
  isVisible,
  contentBgColor,
  textColor,
  infoTextColor,
  title,
  infoText,
  videoLink,
  onClose,
  onShowVideo,
  onMouseOver,
  onMouseOut,
}) => {
  return (
    <section
      className={`absolute top-10 md:top-14 left-0 p-2 sm:p-4 rounded-lg shadow-md transition-opacity duration-300 ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'} ${contentBgColor} w-36 lg:w-64`} // same infospot button height
      aria-hidden={!isVisible}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <header className="flex justify-between items-center mb-2">
        <h2 className={`text-sm sm:text-lg font-bold ${textColor}`}>
          {title}
        </h2>
        {/* X close */}
        <button
          onClick={onClose}
          className="lg:hidden ml-4 bg-red-500 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded-full hover:bg-red-700"
          aria-label="Close content"
        >
          X
        </button>
      </header>

      {(infoText || videoLink) && <hr className="border-blue-300 mb-2" />}

      {infoText && (
        <p className={`mt-2 text-xs sm:text-sm ${infoTextColor}`}>
          {infoText}
        </p>
      )}

      {/* Video Button */}
      {videoLink && (
        <div className="mt-2">
          <button
            onClick={onShowVideo}
            className="bg-white text-red-500 text-xs sm:text-base px-2 sm:px-4 py-1 sm:py-2 rounded-lg shadow-md hover:bg-red-100"
          >
            Watch Video
          </button>
        </div>
      )}
    </section>
  );
};

export default HotspotContent;
