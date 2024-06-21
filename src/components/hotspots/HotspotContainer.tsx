import React, { useRef } from 'react';
import { InfoHotspot, LinkHotspot } from '@/types/marzipano-types';
import { useSceneStore } from '@/context/useSceneStore';
import useHotspotManager from '@hooks/useHotspotManager';
import Marzipano from 'marzipano';

interface HotspotContainerProps {
  infoHotspots: InfoHotspot[];
  linkHotspots: LinkHotspot[];
  sceneObjects: Marzipano.Scene[];
  currentSceneIndex: number;
}

const HotspotContainer: React.FC<HotspotContainerProps> = ({
  infoHotspots,
  linkHotspots,
  sceneObjects,
  currentSceneIndex,
}) => {
  const { switchScene } = useSceneStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useHotspotManager(containerRef, sceneObjects, currentSceneIndex, infoHotspots, linkHotspots, switchScene);

  return <div ref={containerRef}></div>;
};

export default HotspotContainer;
