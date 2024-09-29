import { useSceneStore } from '@/context/useSceneStore';
import { useState, useEffect } from 'react';

const AutomaticButton = () => {
  const { setSceneIndex, toggleMapEnabled, toggleAutoSwitch } = useSceneStore();
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

    if (isRunning) {
      // Start automatic scene switching every second
      interval = setInterval(() => {
        setSceneIndex(scenes[index % scenes.length]);
        setIndex(prevIndex => prevIndex + 1);
      }, 1000);

      setMessage('Automatic switching started');
    } else if (interval) {
      clearInterval(interval);
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

    if (!isRunning) {
      setIndex(0); // Reset the index when starting
    }
  };

  return (
    <div>
      <button
        className={`bg-blue-700 text-gray-white flex items-center justify-center
                    hover:bg-yellow-500 transition-colors duration-200 ease-in-out h-full w-24`}
        onClick={handleClick}
      >
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <p>{message}</p>
    </div>
  );
};

export default AutomaticButton;
