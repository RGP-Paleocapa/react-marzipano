import React, { useEffect, useRef } from 'react';
import { InfoHotspot, LinkHotspot } from '@types';
import { createRoot } from 'react-dom/client';
import { APP_DATA } from '@data';
import Marzipano from 'marzipano';
import { useHotspotStore, useSceneStore } from '@store';
import LinkHotspotElement from './LinkHotspotElement';
import InfoHotspotElement from './InfoHotspotElement';

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
  const setSceneIndex = useSceneStore(state => state.setSceneIndex);
  const hotspotVisible = useHotspotStore(state => state.hotspotVisible);
  const containerRef = useRef<HTMLDivElement>(null);
  // const hotspotsRef = useRef<Marzipano.Hotspot[]>([]);


  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      if (event.message.includes("Cannot read properties of undefined (reading 'style')")) {
        console.warn('Caught Marzipano hotspot update error:', event.error);
        event.preventDefault();
      }
    };

    window.addEventListener('error', onError);
    return () => window.removeEventListener('error', onError);
  }, []);

  useEffect(() => {
  const scene = sceneObjects[currentSceneIndex];
  if (!scene || !containerRef.current) {
    console.error('Scene or container not found');
    return;
  }

  const hotspotContainer = scene.hotspotContainer();

  // Temp array for new hotspots
  const newHotspots: Marzipano.Hotspot[] = [];

  // Add link hotspots
  linkHotspots.forEach((hotspot, index) => {
    const element = document.createElement('div');
    containerRef.current?.appendChild(element);
    const targetSceneIndex = APP_DATA.scenes.findIndex(scene => scene.id === hotspot.target);
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
    newHotspots.push(marzipanoHotspot);
  });

  // Add info hotspots
  infoHotspots.forEach((hotspot, index) => {
    const element = document.createElement('div');
    containerRef.current?.appendChild(element);
    const root = createRoot(element);
    root.render(<InfoHotspotElement key={index} hotspot={hotspot} />);
    const marzipanoHotspot = hotspotContainer.createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
    newHotspots.push(marzipanoHotspot);
  });

  // // Destroy old hotspots only after new ones created
  // hotspotsRef.current.forEach(h => h.destroy());
  // hotspotsRef.current = newHotspots;

  // // Cleanup on unmount
  // return () => {
  //   hotspotsRef.current.forEach(h => h.destroy());
  //   hotspotsRef.current = [];
  // };
}, [currentSceneIndex, sceneObjects, infoHotspots, linkHotspots, setSceneIndex]);


  if (!hotspotVisible) {
    return;
  }

  return <div id="marzipano-scene" ref={containerRef}></div>;
};

export default HotspotContainer;
