import { useHotspotStore } from '@/context/useHotspotStore';
import { useSceneStore } from '@/context/useSceneStore';
import { useViewStore } from '@/context/useViewerStore';
import { useState, useEffect } from 'react';

const AutomaticButton = () => {
  const { setSceneIndex, toggleAutoSwitch } = useSceneStore();
  const { toggleMapEnabled, toggleRotation } = useViewStore();
  const { hotspotVisible, toggleHotspotVisibility } = useHotspotStore();
  const [index, setIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false); // Track whether the process is running
  const [message, setMessage] = useState<string>('Click to Start');

  const scenes = [
    2, 3, 4,        // Stanza 1
    7, 8, 9,        // Corridioio
    10,             // Ghiacciaia
    11, 12,         // Cortile
    14, 15, 16, 17, // Casa
    13              // Pierino
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    toggleRotation(false); // Toggle rotation

    if (isRunning) {
      // Start automatic scene switching every second
      interval = setInterval(() => {
        setSceneIndex(scenes[index % scenes.length]);
        setIndex(prevIndex => prevIndex + 1);
      }, 1000);

      setMessage('Automatic switching started');
    } else {
      setMessage('Automatic switching stopped');
    }

    // Cleanup function to stop the interval when component unmounts or when isRunning changes
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, index, setSceneIndex]); // Depend on `isRunning` to start/stop the interval

  const handleClick = () => {
    // Toggle the isRunning state to start/stop the process
    setIsRunning(prevState => !prevState);
    toggleAutoSwitch();
    toggleMapEnabled();
    toggleHotspotVisibility(!hotspotVisible);

    if (!isRunning) {
      setIndex(0); // Reset the index when starting
    }
  };

  return (
    <div className="flex items-center justify-evenly w-96">
      <button
        className={`bg-blue-700 text-gray-white flex items-center justify-center
                    hover:bg-yellow-500 transition-colors duration-200 ease-in-out h-full w-24`}
        onClick={handleClick}
      >
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <p className={`${isRunning ? "text-red-400" : "text-green-400"}`}>{message}</p>
    </div>
  );
};

export default AutomaticButton;
