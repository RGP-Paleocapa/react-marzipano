import { MapOverlay, VideoOverlay, AudioOverlay } from "@overlays";
import { HotspotContainer, InfoComponent } from "@common";
import Navbar from "@layout/header";
import { useAppController } from "@hooks";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@components/utils/ErrorFallback";

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
    error,
  } = useAppController();

  // Set audio when scene changes
  useEffect(() => {
    const audio = currentScene?.introAudio;
    setAudioSrc(audio ?? '');
  }, [currentScene, setAudioSrc]);

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

      {error ? (
        <ErrorFallback error={error} resetErrorBoundary={() => location.reload()} />
      ) : sceneObjects.length > 0 && currentScene ? (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <HotspotContainer
            infoHotspots={currentScene.infoHotspots}
            linkHotspots={currentScene.linkHotspots}
            sceneObjects={sceneObjects}
            currentSceneIndex={currentSceneIndex}
          />
        </ErrorBoundary>
      ) : (
        <div className="p-6 text-center text-gray-500">Loading scene...</div>
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
