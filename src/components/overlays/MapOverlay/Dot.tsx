import React from 'react';
import { useSceneStore } from '@store';

interface DotProps {
  index: number;
  closeFullScreen: () => void;
  toggleFullScreen: () => void;
  isFullScreen: boolean;
  x: number;
  y: number;
  roomIndexes: number[];
}

const Dot: React.FC<DotProps> = ({
  index,
  closeFullScreen,
  toggleFullScreen,
  isFullScreen,
  x,
  y,
  roomIndexes,
}) => {
  const setSceneIndex = useSceneStore(state => state.setSceneIndex);
  const currentSceneIndex = useSceneStore(state => state.currentSceneIndex);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (window.innerWidth > 1024 || isFullScreen) {
      setSceneIndex(index);
      closeFullScreen();
    } else {
      toggleFullScreen();
    }
  };

  const isActive = currentSceneIndex === index || roomIndexes.includes(currentSceneIndex);
  const id = `dot-${index}`;

  const dotSize = isFullScreen ? 'w-6 h-6 lg:w-8 lg:h-8' : 'hidden lg:block w-3 h-3 text-xs';
  const dotColor = isActive ? 'bg-green-500' : 'bg-red-500';


  return (
    <div
      className={`absolute text-white flex items-center justify-center rounded-full cursor-pointer border-2 ${dotSize} ${dotColor}`}
      style={{ top: `${y}%`, left: `${x}%` }}
      onClick={handleClick}
      id={id}
    />
  );
};

export default Dot;
