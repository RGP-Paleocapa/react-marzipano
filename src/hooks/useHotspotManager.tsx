import { useEffect, useRef, useCallback } from 'react';
import { InfoHotspot, LinkHotspot } from '@/types/marzipano-types';
import appData from '@data/config.json';
import { createRoot } from 'react-dom/client';
import Marzipano from 'marzipano';
import InfoHotspotElement from '@/components/hotspots/InfoHotspotElement';
import LinkHotspotElement from '@/components/hotspots/LinkHotspotElement';

const useHotspotManager = (
  containerRef: React.RefObject<HTMLDivElement>,
  sceneObjects: Marzipano.Scene[],
  currentSceneIndex: number,
  infoHotspots: InfoHotspot[],
  linkHotspots: LinkHotspot[],
  switchScene: (index: number) => void
) => {
  const hotspotsRef = useRef<Marzipano.Hotspot[]>([]);
  const prevSceneIndexRef = useRef<number | null>(null);

  const clearPreviousHotspots = useCallback(() => {
    const prevSceneIndex = prevSceneIndexRef.current;
    if (prevSceneIndex !== null) {
      const prevScene = sceneObjects[prevSceneIndex];
      const hotspotContainer = prevScene.hotspotContainer();

      hotspotsRef.current.forEach((hotspot, index) => {
        try {
          if (hotspotContainer.hasHotspot(hotspot)) {
            hotspotContainer.destroyHotspot(hotspot);
          }
        } catch (error) {
          console.error(`Error destroying hotspot ${index}:`, error);
        }
      });
      hotspotsRef.current = [];
    }
  }, [sceneObjects]);

  useEffect(() => {
    clearPreviousHotspots();

    const scene = sceneObjects[currentSceneIndex];
    if (!scene || !containerRef.current) {
      console.error('Scene or container not found');
      return;
    }

    const hotspotContainer = scene.hotspotContainer();

    infoHotspots.forEach((hotspot, index) => {
      const element = document.createElement('div');
      containerRef.current?.appendChild(element);
      const root = createRoot(element);
      root.render(<InfoHotspotElement key={index} hotspot={hotspot} />);
      const marzipanoHotspot = hotspotContainer.createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
      hotspotsRef.current.push(marzipanoHotspot);
    });

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
          switchToScene={() => switchScene(targetSceneIndex)}
        />
      );
      const marzipanoHotspot = hotspotContainer.createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
      hotspotsRef.current.push(marzipanoHotspot);
    });

    prevSceneIndexRef.current = currentSceneIndex;
  }, [currentSceneIndex, sceneObjects, infoHotspots, linkHotspots, switchScene, clearPreviousHotspots]);

  return containerRef;
};

export default useHotspotManager;
