import { useSceneStore } from '@/context/useSceneStore';
import React from 'react';

interface DotProps {
  index: number;
  closeFullScreen: () => void;
  isFullScreen: boolean;
  x: number;
  y: number;
}

const Dot: React.FC<DotProps> = ({ index, closeFullScreen, isFullScreen, x, y }) => {
  const { switchScene } = useSceneStore();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFullScreen) {
      switchScene(index);
      closeFullScreen();
    }
  };

  return (
    <div
      className={`absolute bg-red-500 text-white flex items-center justify-center rounded-full cursor-pointer border-2 ${
        isFullScreen ? 'w-6 h-6 lg:w-8 lg:h-8' : 'w-3 h-3 text-xs'
      }`}
      style={{ top: `${y}%`, left: `${x}%` }} // Use the passed x and y positions
      onClick={handleClick}
    >
      {/* {index} */}
    </div>
  );
};

export default Dot;
