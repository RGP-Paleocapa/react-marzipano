import { RefObject } from 'react';
import Marzipano from 'marzipano';
import { Settings } from '@types';

export const createViewer = (panoRef: RefObject<HTMLDivElement>, settings: Settings) => {
  const viewerOpts = {
    controls: {
      mouseViewMode: settings.mouseViewMode
    }
  };

  if (!panoRef.current) {
    throw new Error("Cannot create viewer: panoRef is null.");
  }

  return new Marzipano.Viewer(panoRef.current, viewerOpts);
};
