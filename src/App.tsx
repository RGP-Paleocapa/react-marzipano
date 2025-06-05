import { Scene as SceneObjects, Viewer } from "marzipano";
import { useRef, useState, useEffect } from "react";
import { APP_DATA, AppData } from "@data";
import { MapOverlay, VideoOverlay, AudioOverlay } from "@overlays";
import { useSceneStore, useVideoStore } from "@stores";
import { InfoComponent, Scene } from "@common";
import { useFullScreen, useMarzipano } from "@hooks";
import Navbar, { HeaderContentType } from "@layout/header";

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
  const [visibleContent, setVisibleContent] = useState<HeaderContentType | null>(null);
  const { toggleFullscreen } = useFullScreen(panoRef);

  useEffect(() => {
    if (!localStorage.getItem("isFirstVisit")) {
      setVisibleContent("Help");
      localStorage.setItem("isFirstVisit", "false");
    }
  }, []);

  const handleContentChange = (content: HeaderContentType | null) => {
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
          isCredits={visibleContent === "Credits"}
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
