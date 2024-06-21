import React from 'react';
import { AppData } from '@/types/marzipano-types';
import HotspotContainer from '@components/hotspots/HotspotContainer';
import Marzipano from 'marzipano';

interface SceneProps {
  viewer: Marzipano.Viewer;
  data: AppData['scenes'][0];
  common: AppData['common'];
  sceneObjects: Marzipano.Scene[];
  currentSceneIndex: number;
}

const Scene: React.FC<SceneProps> = ({ data, sceneObjects, currentSceneIndex }) => {
  return (
    <div>
      <HotspotContainer
        infoHotspots={data.infoHotspots}
        linkHotspots={data.linkHotspots}
        sceneObjects={sceneObjects}
        currentSceneIndex={currentSceneIndex}
      />
    </div>
  );
};

export default Scene;
