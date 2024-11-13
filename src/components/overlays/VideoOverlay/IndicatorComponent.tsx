import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeDown, faVolumeMute, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

interface IndicatorProps {
  indicatorType: 'volume' | 'playPause';
  volumeParams?: VolumeParams;
  playPauseParams?: PlayPauseParams;
}

interface VolumeParams {
  volumeIndicator: 'up' | 'down' | 'muted';
  volumeLevel: number;
}

interface PlayPauseParams {
  playPauseIndicator: 'play' | 'pause';
}

const IndicatorComponent: React.FC<IndicatorProps> = ({ indicatorType, volumeParams, playPauseParams }) => {
  switch (indicatorType) {
    case 'volume':
      if (volumeParams) {
        const { volumeIndicator, volumeLevel } = volumeParams;
        return (
          <div className="relative p-2 bg-black rounded-full border border-white flex items-center justify-center gap-10">
            {volumeIndicator === 'up' && <FontAwesomeIcon icon={faVolumeUp} />}
            {volumeIndicator === 'down' && <FontAwesomeIcon icon={faVolumeDown} />}
            {volumeIndicator === 'muted' && <FontAwesomeIcon icon={faVolumeMute} />}
            <span className="text-white text-sm">{volumeLevel}</span>
          </div>
        );
      }
      break;

    case 'playPause':
      if (playPauseParams) {
        const { playPauseIndicator } = playPauseParams;
        return (
          <div className="relative p-2 bg-black rounded-full border border-white flex items-center justify-center">
            {playPauseIndicator === 'play' && <FontAwesomeIcon icon={faPlay} />}
            {playPauseIndicator === 'pause' && <FontAwesomeIcon icon={faPause} />}
            <span className="text-white text-sm ml-2">
              {playPauseIndicator === 'play' ? 'Play' : 'Pause'}
            </span>
          </div>
        );
      }
      break;

    default:
      return <p className="p-10 bg-red-700 text-white">Nothing found</p>;
  }

  return null; // Fallback for unexpected cases
};

export default IndicatorComponent;
