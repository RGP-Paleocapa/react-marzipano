import { RefObject } from 'react';
import Marzipano from 'marzipano';
import { AppData } from '@/types/marzipano-types';

export const createViewer = (panoRef: RefObject<HTMLDivElement>, settings: AppData['settings']) => {
  const viewerOpts = {
    controls: {
      mouseViewMode: settings.mouseViewMode
    }
  };
  return new Marzipano.Viewer(panoRef.current!, viewerOpts);
};
