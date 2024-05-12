import MarzipanoPage from "./components/MarzipanoPage";
import { useState } from "react";

const App = () => {
  
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);

  const switchScene = (_event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    setCurrentSceneIndex(index);  // This correctly updates the state
  }

  return (
    <>
      <MarzipanoPage currentSceneIndex={currentSceneIndex} />
      <button 
        onClick={(e) => { switchScene(e, (currentSceneIndex + 1) % 5) }} // Updated to rotate through five scenes
        className="absolute top-10 left-10 z-50 px-4 py-2 bg-blue-500 text-white rounded shadow"
      >
        Switch Scene
      </button>
    </>
  );
}

export default App;
