import { MapOverlay, VideoOverlay, AudioOverlay, InformationOverlay } from "@overlays";
import { useAppController } from "@hooks";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Header, Tour, Scene } from '@components';
import { ErrorFallback } from "@errors";

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

  const [runTour, setRunTour] = useState<boolean>(false);

  return (
    <main
      id="pano"
      ref={panoRef}
      className="relative w-full h-full overflow-hidden"
    >
      {/* Tour component: controls the Joyride walkthroughs */}
      <Tour run={runTour} setRun={setRunTour} audioVisible={Boolean(currentScene?.introAudio)} />

      {/* Overlay: Info panel (Help / Credits) */}
      {visibleContent && (
        <InformationOverlay
          onClose={() => handleContentChange(null)}
          isCredits={visibleContent === "Credits"}
          setRunTour={setRunTour}
        />
      )}

      {/* App header / controls */}
      <Header
        onToggleFullscreen={toggleFullscreen}
        onShowContent={handleContentChange}
      />

      {error ? (
        <ErrorFallback error={error} resetErrorBoundary={() => location.reload()} />
      ) : sceneObjects.length > 0 && currentScene ? (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Scene
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
