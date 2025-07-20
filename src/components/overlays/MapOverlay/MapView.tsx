import CloseButton from "./CloseButton";
import Dot, { DotPosition } from "./Dot";

interface MapViewProps {
  mapSrc: string;
  isFullscreen: boolean;
  openFullscreen: () => void;
  closeFullscreen: () => void;
  dotPositions: DotPosition[];
}

const MapView: React.FC<MapViewProps> = ({
  mapSrc,
  isFullscreen,
  closeFullscreen,
  openFullscreen,
  dotPositions,
}) => (
  <div
    className="relative w-fit h-fit"
    id="map-overlay"
  >
    <img
      src={mapSrc}
      alt="Map"
      className={`block object-contain ${
        isFullscreen
          ? 'w-auto max-h-[80vh] rounded-none cursor-default'
          : 'w-auto h-auto rounded-3xl hidden lg:block'
      }`}
      onClick={(e) => {
        if (isFullscreen) e.stopPropagation();
        else openFullscreen();
      }}
      draggable={false}
    />

    {dotPositions.map((dot) => (
      <Dot
        key={dot.index}
        dotPosition={dot}
        closeFullscreen={closeFullscreen}
        openFullscreen={openFullscreen}
        isFullScreen={isFullscreen}
      />
    ))}

    <CloseButton
      className={`lg:-top-6 lg:-right-6 hidden ${isFullscreen && 'lg:block'}`}
      onClick={closeFullscreen}
    />
  </div>
);

export default MapView;
