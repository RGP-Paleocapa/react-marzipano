import React, { useEffect } from 'react';
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

  useEffect(() => {
    const currentScene = sceneObjects[currentSceneIndex];
    if (currentScene) {
      console.log(`Switching to scene ${currentSceneIndex}`);
      currentScene.switchTo();
    }
  }, [currentSceneIndex, sceneObjects]);

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
