import MarzipanoPage from "./components/MarzipanoPage";
import { useEffect, useState } from "react";

const App = () => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);

  useEffect(() => {
    console.log("Current index " + currentSceneIndex);
  }, [currentSceneIndex]);

  const switchScene = (index: number) => {
    setCurrentSceneIndex(index);  // This should correctly update the state
  };

  return (
    <>
      <MarzipanoPage currentSceneIndex={currentSceneIndex} switchScene={switchScene} />
      {/* <button 
        onClick={() => { switchScene((currentSceneIndex + 1) % 5) }} // Rotate through five scenes
        className="absolute top-10 left-10 z-50 px-4 py-2 bg-blue-500 text-white rounded shadow"
      >
        Switch Scene
      </button> */}
    </>
  );
}

export default App;
