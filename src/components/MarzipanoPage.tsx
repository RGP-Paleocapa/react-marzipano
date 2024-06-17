import React, { useRef } from 'react';
import { useMarzipano } from '@hooks/useMarzipano';
import APP_DATA from '@data/config.json';
import Scene from '@components/Scene';
import { AppData } from '@/types/marzipano-types';
import { Viewer, Scene as SceneObjects } from 'marzipano';
import Navbar from '@components/Navbar';
import { useSceneStore } from '@/context/useSceneStore';

const MarzipanoPage: React.FC = () => {
  const panoRef = useRef<HTMLDivElement>(null);
  const { currentSceneIndex } = useSceneStore();

  const { viewer, sceneObjects, isAutorotating, toggleAutorotation } = useMarzipano(panoRef, APP_DATA as AppData, currentSceneIndex);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      panoRef.current?.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div id='pano' ref={panoRef} className="relative w-full h-full overflow-hidden">
      <Navbar
        onToggleAutorotation={toggleAutorotation}
        isAutorotating={isAutorotating}
        onToggleFullscreen={toggleFullscreen}
      />
      {viewer && sceneObjects.length > 0 && (
        <Scene
          viewer={viewer as Viewer}
          data={APP_DATA.scenes[currentSceneIndex] as AppData['scenes'][number]}
          common={APP_DATA.common as AppData['common']}
          sceneObjects={sceneObjects as SceneObjects[]}
          currentSceneIndex={currentSceneIndex}
        />
      )}
    </div>
  );
};

export default MarzipanoPage;
