import { RefObject, useEffect } from 'react';
import Marzipano from 'marzipano';
import { AppData } from '../types/marzipano-types';

export const useMarzipano = (panoRef: RefObject<HTMLDivElement>, appData: AppData, currentSceneIndex: number) => {
  useEffect(() => {
    if (!panoRef.current) return;

    const { settings, scenes } = appData;
    const viewerOpts = {
      controls: {
        mouseViewMode: settings.mouseViewMode
      }
    };

    const viewer = new Marzipano.Viewer(panoRef.current, viewerOpts);
    const sceneObjects = scenes.map(data => {
      const source = Marzipano.ImageUrlSource.fromString(
        `/react-marzipano/assets/tiles/${data.id}/{z}/{f}/{y}/{x}.jpg`,
        { cubeMapPreviewUrl: `/react-marzipano/assets/tiles/${data.id}/preview.jpg` }
      );

      const geometry = new Marzipano.CubeGeometry(data.levels);
      const limiter = Marzipano.RectilinearView.limit.traditional(data.faceSize, 100 * Math.PI / 180, 120 * Math.PI / 180);
      const view = new Marzipano.RectilinearView(data.initialViewParameters, limiter);

      return viewer.createScene({
        source: source,
        geometry: geometry,
        view: view,
        pinFirstLevel: true
      });
    });

    // Switch to the current scene index
    if (sceneObjects[currentSceneIndex]) {
      sceneObjects[currentSceneIndex].switchTo();
    }
  }, [panoRef, appData, currentSceneIndex]);
};
