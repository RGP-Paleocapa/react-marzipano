import { RefObject, useEffect, useState } from 'react';
import { AppData } from '@/types/marzipano-types';
import { createViewer } from '@hooks/marzipanoViewer';
import { createScene } from '@hooks/marzipanoScene';
import Marzipano from 'marzipano';

export const useMarzipano = (panoRef: RefObject<HTMLDivElement>, appData: AppData, currentSceneIndex: number) => {
  const [sceneObjects, setSceneObjects] = useState<Marzipano.Scene[]>([]);
  const [viewer, setViewer] = useState<Marzipano.Viewer | null>(null);

  useEffect(() => {
    if (!panoRef.current) return;

    const { settings, scenes, common } = appData;
    const viewer = createViewer(panoRef, settings);
    setViewer(viewer);
    const basePrefix = "react-marzipano";

    const newSceneObjects = scenes.map(data => createScene(viewer, data, common, basePrefix));
    setSceneObjects(newSceneObjects);

    panoRef.current.addEventListener('click', () => {
      const contents = document.querySelectorAll('.hotspot__content');
      contents.forEach(content => {
        content.classList.add('hidden');
      });
    });

    if (newSceneObjects[currentSceneIndex]) {
      newSceneObjects[currentSceneIndex].switchTo();
    }

    return () => {
      panoRef.current?.removeEventListener('click', () => {
        const contents = document.querySelectorAll('.hotspot__content');
        contents.forEach(content => {
          content.classList.add('hidden');
        });
      });
    };
  }, [panoRef, appData]);

  useEffect(() => {
    if (sceneObjects[currentSceneIndex]) {
      sceneObjects[currentSceneIndex].switchTo();
    }
  }, [currentSceneIndex, sceneObjects]);

  return { viewer, sceneObjects };
};
