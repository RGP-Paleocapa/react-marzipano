import React, { useRef, useState } from 'react';
import { useMarzipano } from '@hooks/useMarzipano';
import APP_DATA from '@data/config.json';
import Scene from '@components/Scene';
import { AppData } from '@/types/marzipano-types';
import { Viewer, Scene as SceneObjects, autorotate } from 'marzipano';
import Navbar from './Navbar'; // Import the Navbar component

const MarzipanoPage: React.FC = () => {
  const panoRef = useRef<HTMLDivElement>(null);
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [isAutorotating, setIsAutorotating] = useState<boolean>(APP_DATA.settings.autorotateEnabled);

  const { viewer, sceneObjects } = useMarzipano(panoRef, APP_DATA as AppData, currentSceneIndex);

  const switchScene = (index: number) => {
    setCurrentSceneIndex(index);
  }

  // const showAlert = () => {
  //   alert('Hello, this is your message!');
  // }

  const toggleAutorotation = () => {
    if (viewer) {
      if (isAutorotating) {
        viewer.stopMovement();
      } else {
        const autorotateSettings = {
          yawSpeed: 0.03, // Rotation speed in radians per second
          targetPitch: 0, // Target pitch angle in radians
          targetFov: Math.PI / 4 // Target field of view in radians
        };
        const autorotateControl = autorotate(autorotateSettings);
        viewer.setIdleMovement(3000, autorotateControl); // 3000ms idle time before starting rotation
      }
      setIsAutorotating(!isAutorotating);
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      panoRef.current?.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  return (
    <div id='pano' ref={panoRef} className="relative w-full h-full overflow-hidden">
      <Navbar
        // onAlertClick={showAlert}
        onToggleAutorotation={toggleAutorotation}
        isAutorotating={isAutorotating}
        onToggleFullscreen={toggleFullscreen}
      />
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
