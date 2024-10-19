import { RefObject, useEffect, useState, useRef } from 'react';
import { AppData } from '@/types/marzipano-types';
import { createViewer } from '@hooks/marzipanoViewer';
import { createScene } from '@hooks/marzipanoScene';
import Marzipano, { autorotate } from 'marzipano';
import { useViewStore } from '@/context/useViewerStore';

export const useMarzipano = (panoRef: RefObject<HTMLDivElement>, appData: AppData, currentSceneIndex: number) => {
  const [sceneObjects, setSceneObjects] = useState<Marzipano.Scene[]>([]);
  const [viewer, setViewer] = useState<Marzipano.Viewer | null>(null);

  // Access autorotation state and actions from the context
  const { isRotating, setAutorotateEnabled } = useViewStore();
  const autorotateControlRef = useRef<ReturnType<typeof autorotate> | null>(null);

  // Effect to initialize Marzipano viewer and scene objects
  useEffect(() => {
    if (!panoRef.current) return;

    const { settings, scenes, common } = appData;

    // Create the Marzipano viewer
    const viewer = createViewer(panoRef, settings);
    setViewer(viewer);

    // Create and store the scene objects
    const newSceneObjects = scenes.map(data => createScene(viewer, data, common));
    setSceneObjects(newSceneObjects);

    // Switch to the initial scene
    if (newSceneObjects[currentSceneIndex]) {
      newSceneObjects[currentSceneIndex].switchTo();
    }

    // Initialize autorotation state from appData settings only on mount
    setAutorotateEnabled(settings.autorotateEnabled);

    return () => {
      // Cleanup the viewer movement on unmount
      viewer.stopMovement();
      viewer.setIdleMovement(Infinity);
    };
  }, [panoRef, appData, currentSceneIndex, setAutorotateEnabled]);

  // Effect to handle autorotation state changes (triggered by changes in global context)
  useEffect(() => {
    if (!viewer) return;

    if (isRotating) {
      // Start autorotation if enabled
      const autorotateSettings = {
        yawSpeed: 0.03,
        targetPitch: 0,
        targetFov: Math.PI / 4
      };
      autorotateControlRef.current = autorotate(autorotateSettings);
      viewer.setIdleMovement(3000, autorotateControlRef.current);
      viewer.startMovement(autorotateControlRef.current);
    } else {
      // Stop autorotation if disabled
      viewer.stopMovement();
      viewer.setIdleMovement(Infinity);
    }
  }, [isRotating, viewer]);

  return { viewer, sceneObjects };
};
