import React, { useRef } from 'react';
import { AppData } from '@/types/marzipano-types';
import { useMarzipano } from '@hooks/useMarzipano';
import APP_DATA from '@data/config.json';
import Scene from './Scene';

interface MarzipanoPageProps {
  currentSceneIndex: number;
  switchScene: (index: number) => void;  // Add this prop
}

const MarzipanoPage: React.FC<MarzipanoPageProps> = ({ currentSceneIndex, switchScene }) => {  // Accept switchScene as a prop
  const panoRef = useRef<HTMLDivElement>(null);
  const { viewer, sceneObjects } = useMarzipano(panoRef, APP_DATA as AppData, currentSceneIndex);

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
          switchScene={switchScene}  // Pass switchScene to Scene
        />
      )}
    </div>
  );
};

export default MarzipanoPage;
