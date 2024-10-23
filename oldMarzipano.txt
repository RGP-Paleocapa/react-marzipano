import { RefObject, useEffect, useState, useRef } from 'react';
import { AppData } from '@/types/marzipano-types';
import { createViewer } from '@hooks/marzipanoViewer';
import { createScene } from '@hooks/marzipanoScene';
import Marzipano, { autorotate } from 'marzipano';

export const useMarzipano = (panoRef: RefObject<HTMLDivElement>, appData: AppData, currentSceneIndex: number) => {
  const [sceneObjects, setSceneObjects] = useState<Marzipano.Scene[]>([]);
  const [viewer, setViewer] = useState<Marzipano.Viewer | null>(null);
  const [isAutorotating, setIsAutorotating] = useState<boolean>(appData.settings.autorotateEnabled);
  const autorotateControlRef = useRef<ReturnType<typeof autorotate> | null>(null);

  useEffect(() => {
    if (!panoRef.current) return;

    const { settings, scenes, common } = appData;
    const viewer = createViewer(panoRef, settings);
    setViewer(viewer);

    const newSceneObjects = scenes.map(data => createScene(viewer, data, common));
    setSceneObjects(newSceneObjects);

    if (newSceneObjects[currentSceneIndex]) {
      newSceneObjects[currentSceneIndex].switchTo();
    }

    // Initialize autorotation if enabled
    if (isAutorotating) {
      const autorotateSettings = {
        yawSpeed: 0.03,
        targetPitch: 0,
        targetFov: Math.PI / 4
      };
      autorotateControlRef.current = autorotate(autorotateSettings);
      viewer.setIdleMovement(3000, autorotateControlRef.current);
      viewer.startMovement(autorotateControlRef.current);
    }

    return () => {
      viewer.stopMovement(); // Stop any movement when component unmounts
      viewer.setIdleMovement(Infinity); // Prevent any idle movement from restarting
    };
  }, [panoRef, appData, currentSceneIndex]);

  useEffect(() => {
    if (viewer) {
      if (isAutorotating) {
        const autorotateSettings = {
          yawSpeed: 0.03,
          targetPitch: 0,
          targetFov: Math.PI / 4
        };
        autorotateControlRef.current = autorotate(autorotateSettings);
        viewer.setIdleMovement(3000, autorotateControlRef.current);
        viewer.startMovement(autorotateControlRef.current);
      } else {
        viewer.stopMovement();
        viewer.setIdleMovement(Infinity); // Prevent any idle movement from restarting
      }
    }
  }, [isAutorotating, viewer]);

  const toggleAutorotation = () => {
    setIsAutorotating(!isAutorotating);
  };

  return { viewer, sceneObjects, isAutorotating, toggleAutorotation };
};
