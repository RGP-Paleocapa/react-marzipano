// App.tsx
import MarzipanoPage from "./components/MarzipanoPage";
// import { useEffect } from "react";
import VideoOverlay from "@components/VideoOverlay";
// import { useSceneStore } from "@/context/useSceneStore";
import { useVideoStore } from "@/context/useVideoStore";

const App = () => {
  // const { currentSceneIndex } = useSceneStore();
  const { videoLink, isVideoVisible, closeVideo } = useVideoStore();

  // useEffect(() => {
  //   console.log("Current index " + currentSceneIndex);
  // }, [currentSceneIndex]);

  return (
    <>
      <MarzipanoPage />
      {isVideoVisible && videoLink && <VideoOverlay videoLink={videoLink} onClose={closeVideo} />}
    </>
  );
};

export default App;
