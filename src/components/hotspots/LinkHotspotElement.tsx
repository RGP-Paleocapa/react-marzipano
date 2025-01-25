import React from "react";
import linkImage from "@/assets/icons/link.png";
import linkRedImage from "@/assets/icons/linkred.png";
import { LinkHotspot } from "@/types/marzipano-types";

interface LinkHotspotElementProps {
  setSceneIndex: () => void;
  hotspot: LinkHotspot;
}

const LinkHotspotElement: React.FC<LinkHotspotElementProps> = ({
  setSceneIndex,
  hotspot,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <div
      className="relative"
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <button
        className="w-10 sm:w-16 p-0 m-0 rounded-3xl flex items-center justify-center cursor-pointer transition-transform transform hover:scale-110"
        style={{ transform: `rotate(${hotspot.rotation}deg)` }}
        onClick={(e) => {
          e.stopPropagation();
          setSceneIndex();
        }}
        tabIndex={0}
        role="button"
        aria-label={hotspot.text || "Link hotspot"}
      >
        <img
          src={hotspot.isRed ? linkRedImage : linkImage}
          alt="Link Icon"
          className="w-10 h-10 sm:w-16 sm:h-16 transition-transform transform hover:scale-110"
        />
      </button>
      <HotspotContent isHovered={isHovered} title={hotspot.text || ""} />
    </div>
  );
};

export default LinkHotspotElement;

interface HotspotContentProps {
  isHovered: boolean;
  title: string;
}

const HotspotContent: React.FC<HotspotContentProps> = ({
  title,
  isHovered,
}) => {
  return isHovered ? (
    <h2
      className={`drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] min-w-36 lg:min-w-96 -translate-x-1/2 left-1/2 text-center absolute rounded-md shadow-md p-4`}
    >
      {title}
    </h2>
  ) : null;
};
