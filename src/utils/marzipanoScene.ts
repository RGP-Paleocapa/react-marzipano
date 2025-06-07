import Marzipano, { Viewer } from 'marzipano';
import { Common, Scene } from '@types';

export const createScene = (
  viewer: Viewer,
  scene: Scene,
  common: Common,
) => {
  const levels = common.levels;
  const faceSize = common.faceSize;
  const limiter = Marzipano.RectilinearView.limit.traditional(
    faceSize,
    100 * Math.PI / 180,
    120 * Math.PI / 180
  );

  const source = Marzipano.ImageUrlSource.fromString(
    `./assets/tiles/${scene.id}/{z}/{f}/{y}/{x}.jpg`,
    { cubeMapPreviewUrl: `./assets/tiles/${scene.id}/preview.jpg` }
  );

  const geometry = new Marzipano.CubeGeometry(levels);
  const view = new Marzipano.RectilinearView(scene.initialViewParameters, limiter);

  const sceneCreated = viewer.createScene({
    source,
    geometry,
    view,
    pinFirstLevel: true,
  });

  return sceneCreated;
};
