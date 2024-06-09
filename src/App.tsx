import MarzipanoPage from "./components/MarzipanoPage";
import { useEffect } from "react";
import { useStore } from "./context/useStore";

const App = () => {
  const { currentSceneIndex } = useStore();

  useEffect(() => {
    console.log("Current index " + currentSceneIndex);
  }, [currentSceneIndex]);

  return (
    <>
      <MarzipanoPage />
    </>
  );
};

export default App;
