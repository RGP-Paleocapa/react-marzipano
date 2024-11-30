import { Scene as SceneObjects, Viewer } from "marzipano";
import { useRef, useState, useEffect } from "react";
import Scene from "@components/common/Scene";
import InfoComponent from "@components/common/InfoComponent";
import Navbar from "@components/layout/header";
import MapOverlay from "@components/overlays/MapOverlay";
import VideoOverlay from "@components/overlays/VideoOverlay";
import AudioOverlay from "./components/overlays/AudioOverlay";
import { useSceneStore } from "@/context/useSceneStore";
import { useVideoStore } from "@/context/useVideoStore";
import { useFullScreen } from "@hooks/useFullscreen";
import { useMarzipano } from "@hooks/useMarzipano";
import { AppData } from "@/types/marzipano-types";
import APP_DATA from "@data/config.json";

const App = () => {
  const panoRef = useRef<HTMLDivElement>(null);
  const { currentSceneIndex } = useSceneStore();
  const { closeVideo, isVideoVisible, videoLink } = useVideoStore();
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const { viewer, sceneObjects } = useMarzipano(
    panoRef,
    APP_DATA as AppData,
    currentSceneIndex
  );
  const [visibleContent, setVisibleContent] = useState<
    "info" | "credits" | null
  >(null);
  const { toggleFullscreen } = useFullScreen(panoRef);

  useEffect(() => {
    if (!localStorage.getItem("isFirstVisit")) {
      setVisibleContent("info");
      localStorage.setItem("isFirstVisit", "false");
    }
  }, []);

  const handleContentChange = (content: "info" | "credits" | null) => {
    // Toggle the content if the same content is clicked again
    setVisibleContent((prevContent) =>
      prevContent === content ? null : content
    );
  };

  return (
    <div
      id="pano"
      ref={panoRef}
      className="relative w-full h-full overflow-hidden"
    >
      {visibleContent && (
        <InfoComponent
          onClose={() => handleContentChange(null)}
          isCredits={visibleContent === "credits"}
        />
      )}
      <Navbar
        onToggleFullscreen={toggleFullscreen}
        onShowContent={handleContentChange}
      />
      {viewer && sceneObjects.length > 0 && (
        <Scene
          viewer={viewer as Viewer}
          data={APP_DATA.scenes[currentSceneIndex] as AppData["scenes"][number]}
          common={APP_DATA.common as AppData["common"]}
          sceneObjects={sceneObjects as SceneObjects[]}
          currentSceneIndex={currentSceneIndex}
          setAudioSrc={setAudioSrc}
        />
      )}
      <MapOverlay />
      {isVideoVisible && videoLink && (
        <VideoOverlay videoLink={videoLink} onClose={closeVideo} />
      )}
      <AudioOverlay introAudio={audioSrc} />
    </div>
  );
};

export default App;
