import { RefObject, useEffect, useState } from 'react';
import { AppData } from '@/types/marzipano-types';
import { createViewer } from '@hooks/marzipanoViewer';
import { createScene } from '@hooks/marzipanoScene';

export const useMarzipano = (panoRef: RefObject<HTMLDivElement>, appData: AppData, currentSceneIndex: number) => {
  const [sceneObjects, setSceneObjects] = useState<any[]>([]);
  const [viewer, setViewer] = useState<any>(null);

  useEffect(() => {
    if (!panoRef.current) return;

    const { settings, scenes, common } = appData;
    const viewer = createViewer(panoRef, settings);
    setViewer(viewer);
    const basePrefix = "react-marzipano";

    const sceneObjects = scenes.map(data => createScene(viewer, data, common, basePrefix));
    setSceneObjects(sceneObjects);

    panoRef.current.addEventListener('click', () => {
      const contents = document.querySelectorAll('.hotspot__content');
      contents.forEach(content => {
        content.classList.add('hidden');
      });
    });

    if (sceneObjects[currentSceneIndex]) {
      sceneObjects[currentSceneIndex].switchTo();
    }

    return () => {
      panoRef.current?.removeEventListener('click', () => {
        const contents = document.querySelectorAll('.hotspot__content');
        contents.forEach(content => {
          content.classList.add('hidden');
        });
      });
    };
  }, [panoRef, appData, currentSceneIndex]);

  useEffect(() => {
    if (sceneObjects[currentSceneIndex]) {
      sceneObjects[currentSceneIndex].switchTo();
    }
  }, [currentSceneIndex, sceneObjects]);

  return { viewer, sceneObjects };
};
