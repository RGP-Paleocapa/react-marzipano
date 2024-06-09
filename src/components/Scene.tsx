import React, { useEffect } from 'react';
import { AppData } from '@/types/marzipano-types';
import HotspotContainer from './HotspotContainer';
import Marzipano from 'marzipano';
import { useStore } from '../context/useStore';

interface SceneProps {
  viewer: Marzipano.Viewer;
  data: AppData['scenes'][0];
  common: AppData['common'];
  basePrefix: string;
  sceneObjects: Marzipano.Scene[];
  currentSceneIndex: number;
}

const Scene: React.FC<SceneProps> = ({ viewer, data, sceneObjects, currentSceneIndex }) => {
  const { switchScene } = useStore();

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
        switchScene={switchScene}  // Pass switchScene to HotspotContainer
      />
    </div>
  );
};

export default Scene;
