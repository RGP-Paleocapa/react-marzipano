import React, { useEffect, useRef } from 'react';
import { InfoHotspot, LinkHotspot } from '@/types/marzipano-types';
import InfoHotspotElement from './InfoHotspotElement';
import LinkHotspotElement from './LinkHotspotElement';
import { createRoot } from 'react-dom/client';
import appData from '@data/config.json';

interface HotspotContainerProps {
  infoHotspots: InfoHotspot[];
  linkHotspots: LinkHotspot[];
  sceneObjects: any[];
  currentSceneIndex: number;
}

const HotspotContainer: React.FC<HotspotContainerProps> = ({ infoHotspots, linkHotspots, sceneObjects, currentSceneIndex }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hotspotsRef = useRef<any[]>([]);

  useEffect(() => {
    const scene = sceneObjects[currentSceneIndex];
    if (!scene || !containerRef.current) return;

    const hotspotContainer = scene.hotspotContainer();

    // Clear existing hotspots
    hotspotsRef.current.forEach((hotspot) => {
      hotspotContainer.destroyHotspot(hotspot);
    });
    hotspotsRef.current = [];

    // Add info hotspots
    infoHotspots.forEach((hotspot, index) => {
      const element = document.createElement('div');
      containerRef.current?.appendChild(element);
      const root = createRoot(element);
      root.render(<InfoHotspotElement key={index} hotspot={hotspot} />);
      const marzipanoHotspot = hotspotContainer.createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
      hotspotsRef.current.push(marzipanoHotspot);
    });

    // Add link hotspots
    linkHotspots.forEach((hotspot, index) => {
      const element = document.createElement('div');
      containerRef.current?.appendChild(element);
      const targetSceneIndex = appData.scenes.findIndex(scene => scene.id === hotspot.target);
      if (targetSceneIndex === -1) {
        console.error(`Target scene with ID ${hotspot.target} not found.`);
      }
      const root = createRoot(element);
      root.render(
        <LinkHotspotElement
          key={index}
          switchToScene={() => {
            if (sceneObjects[targetSceneIndex]) {
              sceneObjects[targetSceneIndex].switchTo();
            }
          }}
        />
      );
      const marzipanoHotspot = hotspotContainer.createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
      hotspotsRef.current.push(marzipanoHotspot);
    });
  }, [infoHotspots, linkHotspots, sceneObjects, currentSceneIndex]);

  useEffect(() => {
    const closeAllHotspotContents = () => {
      const contents = document.querySelectorAll('.hotspot__content');
      contents.forEach(content => {
        content.classList.add('hidden');
      });
    };

    document.addEventListener('click', closeAllHotspotContents);
    return () => {
      document.removeEventListener('click', closeAllHotspotContents);
    };
  }, []);

  return <div ref={containerRef}></div>;
};

export default HotspotContainer;
