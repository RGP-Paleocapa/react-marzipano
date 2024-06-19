// App.tsx
import MarzipanoPage from "./components/MarzipanoPage";
import VideoOverlay from "@/components/overlays/VideoOverlay";
import { useVideoStore } from "@/context/useVideoStore";

const App = () => {
  const { videoLink, isVideoVisible, closeVideo } = useVideoStore();

  return (
    <>
      <MarzipanoPage />
      {isVideoVisible && videoLink && <VideoOverlay videoLink={videoLink} onClose={closeVideo} />}
    </>
  );
};

export default App;
