import { RefObject, useEffect, useState, useRef } from 'react';
import Marzipano, { autorotate } from 'marzipano';
import { initViewerAndScenes } from '@utils';
import { useViewStore } from '@stores';
import { AppData } from '@data';

const AUTOROTATE_SETTINGS = {
  yawSpeed: 0.03,
  targetPitch: 0,
  targetFov: Math.PI / 4,
};

export const useMarzipano = (
  panoRef: RefObject<HTMLDivElement>,
  appData: AppData,
  currentSceneIndex: number
) => {
  const [sceneObjects, setSceneObjects] = useState<Marzipano.Scene[]>([]);
  const [viewer, setViewer] = useState<Marzipano.Viewer | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const { isRotating, setAutorotateEnabled } = useViewStore();
  const autorotateControlRef = useRef<ReturnType<typeof autorotate> | null>(null);


  // Initialize viewer and scenes on mount or dependencies change
  useEffect(() => {
    let results: { viewer: Marzipano.Viewer, sceneObjects: Marzipano.Scene[] } | undefined;

    try {
      results = initViewerAndScenes(
        panoRef,
        appData,
        currentSceneIndex,
        isRotating,
        setAutorotateEnabled
      );

      if (!results) throw new Error('Failed to initialize Marzipano viewer and Scenes.');

      setViewer(results.viewer);
      setSceneObjects(results.sceneObjects);
    } catch (error) {
      setError(error as Error);
    }

    // Cleanup on mount
    return () => {
      results?.viewer.stopMovement();
      results?.viewer.setIdleMovement(Infinity);
    };
  }, [
    panoRef,
    appData,
    currentSceneIndex,
    setAutorotateEnabled,
  ]);

  // useEffect(() => {
  //   if (sceneObjects.length === 0) return
  //   if (currentSceneIndex < 0 || currentSceneIndex >= sceneObjects.length) return;
  //   sceneObjects[currentSceneIndex].switchTo();
  // }, [sceneObjects, currentSceneIndex]);

  // —————— AUTOROTATE CONTROL ——————
  useEffect(() => {
    if (!viewer) return;

    try {
      if (isRotating) {
        autorotateControlRef.current = autorotate(AUTOROTATE_SETTINGS);
        viewer.setIdleMovement(3000, autorotateControlRef.current);
        viewer.startMovement(autorotateControlRef.current);
      } else {
        viewer.stopMovement();
        viewer.setIdleMovement(Infinity);
      }
    } catch (error) {
      console.error('Error controlling autorotate:', error);
    }
  }, [isRotating, viewer]);

  return { viewer, sceneObjects, error };
};
