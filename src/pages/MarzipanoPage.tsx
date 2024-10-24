import React, { useEffect, useRef, useState } from 'react';
import { useMarzipano } from '@hooks/useMarzipano';
import APP_DATA from '@data/config.json';
import Scene from '@components/common/Scene';
import { AppData } from '@/types/marzipano-types';
import { Viewer, Scene as SceneObjects } from 'marzipano';
import Navbar from '@/components/layout/header';
import { useSceneStore } from '@/context/useSceneStore';
import MapOverlay from '@components/overlays/MapOverlay';
import { useVideoStore } from '@/context/useVideoStore';
import VideoOverlay from '@components/overlays/VideoOverlay';
import InfoComponent from '@components/common/InfoComponent';

const MarzipanoPage: React.FC = () => {
  const panoRef = useRef<HTMLDivElement>(null);
  const { currentSceneIndex } = useSceneStore();
  const { closeVideo, isVideoVisible, videoLink } = useVideoStore();

  const { viewer, sceneObjects } = useMarzipano(panoRef, APP_DATA as AppData, currentSceneIndex);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      panoRef.current?.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const [isInfoVisible, setInfoVisible] = useState<boolean>(false);

  useEffect(() => {
    const isFirstVisit = localStorage.getItem('isFirstVisit');
    if (!isFirstVisit) {
      setInfoVisible(true);
      localStorage.setItem('isFirstVisit', 'false');
    }
  }, []);

  function handleShowInfo(): void {
    setInfoVisible(!isInfoVisible);
  }

  return (
    <div id='pano' ref={panoRef} className="relative w-full h-full overflow-hidden">
      <Navbar
        // onToggleAutorotation={toggleAutorotation}
        // isAutorotating={isAutorotating}
        onToggleFullscreen={toggleFullscreen}
        onShowInfo={handleShowInfo}
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
      <MapOverlay />
      {isVideoVisible && videoLink && <VideoOverlay videoLink={videoLink} onClose={closeVideo} />}
      {isInfoVisible && <InfoComponent setInfoVisible={setInfoVisible} />}
    </div>
  );
};

export default MarzipanoPage;
