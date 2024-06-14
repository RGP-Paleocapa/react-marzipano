// App.tsx
import MarzipanoPage from "./components/MarzipanoPage";
import VideoOverlay from "@components/VideoOverlay";
import { useVideoStore } from "@/context/useVideoStore";
import MapOverlay from "./components/MapOverlay";

const App = () => {
  const { videoLink, isVideoVisible, closeVideo } = useVideoStore();

  return (
    <>
      <MarzipanoPage />
      {isVideoVisible && videoLink && <VideoOverlay videoLink={videoLink} onClose={closeVideo} />}
      <MapOverlay />
    </>
  );
};

export default App;
