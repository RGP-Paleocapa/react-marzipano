import React, { useEffect, useRef, useState } from 'react';
import { InfoHotspot, LinkHotspot } from '@/types/marzipano-types';
import InfoHotspotElement from './InfoHotspotElement';
import LinkHotspotElement from './LinkHotspotElement';
import { createRoot } from 'react-dom/client';
import appData from '@data/config.json';
import Marzipano from 'marzipano';
import { useSceneStore } from '@/context/useSceneStore';
import { useHotspotStore } from '@/context/useHotspotStore';

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
  const { setSceneIndex } = useSceneStore();
  const { hotspotVisible } = useHotspotStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const hotspotsRef = useRef<Marzipano.Hotspot[]>([]);
  const [prevSceneIndex, setPrevSceneIndex] = useState<number | null>(null);

  useEffect(() => {
    if (prevSceneIndex !== null) {
      const prevScene = sceneObjects[prevSceneIndex];
      const hotspotContainer = prevScene.hotspotContainer();

      console.log('Clearing existing hotspots from previous scene');
      hotspotsRef.current.forEach((hotspot, index) => {
        try {
          if (hotspotContainer.hasHotspot(hotspot)) {
            console.log(`Destroying hotspot ${index} from previous scene`);
            hotspotContainer.destroyHotspot(hotspot);
          }
        } catch (error) {
          console.error(`Error destroying hotspot ${index} from previous scene:`, error);
        }
      });
      hotspotsRef.current = [];
    }

    const scene = sceneObjects[currentSceneIndex];
    if (!scene || !containerRef.current) {
      console.error('Scene or container not found');
      return;
    }

    const hotspotContainer = scene.hotspotContainer();

    // Add link hotspots
    linkHotspots.forEach((hotspot, index) => {
      const element = document.createElement('div');
      containerRef.current?.appendChild(element);
      const targetSceneIndex = appData.scenes.findIndex(scene => scene.id === hotspot.target);
      if (targetSceneIndex === -1) {
        console.error(`Target scene with ID ${hotspot.target} not found.`);
        return;
      }

      const root = createRoot(element);
      root.render(
        <LinkHotspotElement
          hotspot={hotspot}
          key={index}
          setSceneIndex={() => {
            console.log(`Switching to target scene ${targetSceneIndex}`);
            setSceneIndex(targetSceneIndex);
          }}
        />
      );
      const marzipanoHotspot = hotspotContainer.createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
      console.log(`Creating link hotspot ${index}`, marzipanoHotspot);
      hotspotsRef.current.push(marzipanoHotspot);
    });

    // Add info hotspots
    infoHotspots.forEach((hotspot, index) => {
      const element = document.createElement('div');
      containerRef.current?.appendChild(element);
      const root = createRoot(element);
      root.render(<InfoHotspotElement key={index} hotspot={hotspot} />);
      const marzipanoHotspot = hotspotContainer.createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
      console.log(`Creating info hotspot ${index}`, marzipanoHotspot);
      hotspotsRef.current.push(marzipanoHotspot);
    });

    setPrevSceneIndex(currentSceneIndex);
  }, [currentSceneIndex, sceneObjects, infoHotspots, linkHotspots, setSceneIndex]);

  if (!hotspotVisible) {
    return;
  }

  return <div ref={containerRef}></div>;
};

export default HotspotContainer;
