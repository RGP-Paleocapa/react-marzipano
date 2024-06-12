import React, { useRef, useState } from 'react';
import { useMarzipano } from '@hooks/useMarzipano';
import APP_DATA from '@data/config.json';
import Scene from '@components/Scene';
import { AppData } from '@/types/marzipano-types';
import { Viewer, Scene as SceneObjects } from 'marzipano';

const MarzipanoPage: React.FC = () => {
  const panoRef = useRef<HTMLDivElement>(null);
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);

  const { viewer, sceneObjects } = useMarzipano(panoRef, APP_DATA as AppData, currentSceneIndex);

  const switchScene = (index: number) => {
    setCurrentSceneIndex(index);
  }

  // const handleSceneCreated = (scene: any) => {
  //   // Handle any additional logic when a scene is created
  // };

  /* TODO: settings && common */

  return (
    <div id='pano' ref={panoRef} className="absolute top-0 left-0 w-full h-full overflow-hidden">
      {viewer && sceneObjects.length > 0 && (
        <Scene
          viewer={viewer as Viewer}
          data={APP_DATA.scenes[currentSceneIndex] as AppData['scenes'][number]}
          common={APP_DATA.common as AppData['common']}
          // basePrefix="react-marzipano"
          sceneObjects={sceneObjects as SceneObjects[]}
          currentSceneIndex={currentSceneIndex}
          switchScene={switchScene}
        />
      )}
    </div>
  );
};

export default MarzipanoPage;
