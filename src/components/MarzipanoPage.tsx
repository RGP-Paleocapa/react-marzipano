import React, { useRef } from 'react';
import '../styles/style.css';
import { AppData } from '../types/marzipano-types';
import { useMarzipano } from '../hooks/useMarzipano';
import APP_DATA from '../data/config.json';

interface MarzipanoPageProps {
  currentSceneIndex: number;
}

const MarzipanoPage: React.FC<MarzipanoPageProps> = ({ currentSceneIndex }) => {
  const panoRef = useRef<HTMLDivElement>(null);
  useMarzipano(panoRef, APP_DATA as AppData, currentSceneIndex);

  return <div id='pano' ref={panoRef} style={{ width: '100%', height: '100%' }}></div>;
};

export default MarzipanoPage;
