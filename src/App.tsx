// App.tsx
import MarzipanoPage from "./components/MarzipanoPage";
import { useEffect } from "react";
import { useStore } from "./context/useStore";
import VideoOverlay from "./components/VideoOverlay";

const App = () => {
  const { currentSceneIndex, videoLink, isVideoVisible, closeVideo } = useStore();

  useEffect(() => {
    console.log("Current index " + currentSceneIndex);
  }, [currentSceneIndex]);

  return (
    <>
      <MarzipanoPage />
      {isVideoVisible && videoLink && <VideoOverlay videoLink={videoLink} onClose={closeVideo} />}
    </>
  );
};

export default App;
