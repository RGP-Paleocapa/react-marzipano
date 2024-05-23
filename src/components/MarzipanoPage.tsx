import React, { useRef } from 'react';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported
import { AppData } from '../types/marzipano-types';
import { useMarzipano } from '../hooks/useMarzipano';
import APP_DATA from '../data/config.json';

interface MarzipanoPageProps {
  currentSceneIndex: number;
}

const MarzipanoPage: React.FC<MarzipanoPageProps> = ({ currentSceneIndex }) => {
  const panoRef = useRef<HTMLDivElement>(null);
  useMarzipano(panoRef, APP_DATA as AppData, currentSceneIndex);

  return <div id='pano' ref={panoRef} className="absolute top-0 left-0 w-full h-full overflow-hidden"></div>;
};

export default MarzipanoPage;
