import React, { useEffect } from 'react';
import { AppData } from '@/types/marzipano-types';
import HotspotContainer from '@components/HotspotContainer';
import Marzipano from 'marzipano';
// import { useSceneStore } from '@/context/useSceneStore';

interface SceneProps {
  viewer: Marzipano.Viewer;
  data: AppData['scenes'][0];
  common: AppData['common'];
  // basePrefix: string;
  sceneObjects: Marzipano.Scene[];
  currentSceneIndex: number;
  // switchScene: (index: number) => void;
}

// viewer ??
// It saves previous scene location. remove it?

const Scene: React.FC<SceneProps> = ({ data, sceneObjects, currentSceneIndex/*, switchScene*/ }) => {
  // const { switchScene } = useSceneStore();

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
        // switchScene={switchScene}  // Pass switchScene to HotspotContainer
      />
    </div>
  );
};

export default Scene;
