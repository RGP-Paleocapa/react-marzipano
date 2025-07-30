import React from 'react';
import { useSceneStore } from '@/context/useSceneStore';

export type DotPosition = {
  index: number;
  x: number;
  y: number;
  roomIndexes: number[];
}
interface DotProps {
  dotPosition: DotPosition;
  closeFullscreen: () => void;
  openFullscreen: () => void;
  isFullScreen: boolean;
}

const Dot: React.FC<DotProps> = ({
  dotPosition,
  closeFullscreen,
  openFullscreen,
  isFullScreen,
}) => {
  const { index, roomIndexes, x, y } = dotPosition;
  const setSceneIndex = useSceneStore(state => state.setSceneIndex);
  const currentSceneIndex = useSceneStore(state => state.currentSceneIndex);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (window.innerWidth > 1024 || isFullScreen) {
      setSceneIndex(index);
      closeFullscreen();
    } else {
      openFullscreen();
    }
  };

  const isActive = currentSceneIndex === index || roomIndexes.includes(currentSceneIndex);

  const dotSize = isFullScreen ? 'w-4 h-4' : 'hidden lg:block w-3 h-3 text-xs';
  const dotColor = isActive ? 'bg-green-500' : 'bg-red-500';

  return (
    <div
      className={`absolute text-white flex items-center justify-center rounded-full cursor-pointer border-2 ${dotSize} ${dotColor}`}
      style={{ top: `${y}%`, left: `${x}%` }}
      onClick={handleClick}
    />
  );
};

export default Dot;
  
