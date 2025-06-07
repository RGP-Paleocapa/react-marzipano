import { MapOverlay, VideoOverlay, AudioOverlay } from "@overlays";
import { HotspotContainer, InfoComponent } from "@common";
import Navbar from "@layout/header";
import { useAppController } from "@hooks";
import { useEffect } from "react";

const App = () => {

  const {
    panoRef,
    sceneObjects,
    currentSceneIndex,
    currentScene,
    audioSrc,
    setAudioSrc,
    isVideoVisible,
    videoLink,
    closeVideo,
    toggleFullscreen,
    visibleContent,
    handleContentChange,
  } = useAppController();

  // Set audio when scene changes
  useEffect(() => {
    const audio = currentScene.introAudio;
    setAudioSrc(audio || '');
  }, [currentSceneIndex, setAudioSrc]);

  return (
    <main
      id="pano"
      ref={panoRef}
      className="relative w-full h-full overflow-hidden"
    >
      {/* Overlay: Info panel (Help / Credits) */}
      {visibleContent && (
        <InfoComponent
          onClose={() => handleContentChange(null)}
          isCredits={visibleContent === "Credits"}
        />
      )}

      {/* App header / controls */}
      <Navbar
        onToggleFullscreen={toggleFullscreen}
        onShowContent={handleContentChange}
      />

      {/* Render Marzipano scene when ready */}
      {sceneObjects.length > 0 && (
        <HotspotContainer
          infoHotspots={currentScene.infoHotspots}
          linkHotspots={currentScene.linkHotspots}
          sceneObjects={sceneObjects}
          currentSceneIndex={currentSceneIndex}
        />
      )}

      {/* Always-on map overlay */}
      <MapOverlay />

      {/* Conditional video overlay */}
      {isVideoVisible && videoLink && (
        <VideoOverlay videoLink={videoLink} onClose={closeVideo} />
      )}

      {/* Audio playback for current scene */}
      <AudioOverlay introAudio={audioSrc} />
    </main>
  );
};

export default App;
