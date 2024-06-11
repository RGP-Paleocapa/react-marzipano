import React, { useRef } from 'react';
import { AppData } from '@/types/marzipano-types';
import { useMarzipano } from '@hooks/useMarzipano';
import APP_DATA from '@data/config.json';
import Scene from './Scene';
import { useStore } from '../context/useStore';

const MarzipanoPage: React.FC = () => {
  const panoRef = useRef<HTMLDivElement>(null);
  const { currentSceneIndex } = useStore();
  const { viewer, sceneObjects } = useMarzipano(panoRef, APP_DATA as AppData, currentSceneIndex);

  // const handleSceneCreated = (scene: any) => {
  //   // Handle any additional logic when a scene is created
  // };

  return (
    <div id='pano' ref={panoRef} className="absolute top-0 left-0 w-full h-full overflow-hidden">
      {viewer && sceneObjects.length > 0 && (
        <Scene
          viewer={viewer}
          data={APP_DATA.scenes[currentSceneIndex]}
          common={APP_DATA.common}
          basePrefix="react-marzipano"
          sceneObjects={sceneObjects}
          currentSceneIndex={currentSceneIndex}
        />
      )}
    </div>
  );
};

export default MarzipanoPage;
