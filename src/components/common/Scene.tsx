import React, { useEffect } from "react";
import { AppData } from "@/types/marzipano-types";
import HotspotContainer from "@components/hotspots/HotspotContainer";
import Marzipano from "marzipano";

interface SceneProps {
  viewer: Marzipano.Viewer;
  data: AppData["scenes"][0];
  common: AppData["common"];
  sceneObjects: Marzipano.Scene[];
  currentSceneIndex: number;
}

const Scene: React.FC<SceneProps> = ({
  viewer,
  data,
  sceneObjects,
  currentSceneIndex,
}) => {
  useEffect(() => {
    const currentScene = sceneObjects[currentSceneIndex];

    if (currentScene) {
      console.log(`Switching to scene ${currentSceneIndex}`);

      // Stop any ongoing movement or rendering from the viewer before switching scenes
      viewer.stopMovement();

      // Switch to the new scene
      currentScene.switchTo();

      // Optional: If you want to destroy the previous scene (if not required anymore), you can destroy it here.
      // This will release resources of the previous scene:
      // sceneObjects[previousSceneIndex]?.destroy();
    }

    // Optional: Clean up if switching away from the current scene
    return () => {
      viewer.stopMovement(); // Ensure no ongoing movement when switching away
    };
  }, [currentSceneIndex, sceneObjects, viewer]);

  useEffect(() => {}, []);

  return (
    <div className="relative">
      <HotspotContainer
        infoHotspots={data.infoHotspots}
        linkHotspots={data.linkHotspots}
        sceneObjects={sceneObjects}
        currentSceneIndex={currentSceneIndex}
      />
      {data.introAudio && (
        <audio autoPlay controls className="absolute left-0 bottom-0 z-50">
          <source src={"/assets/audio/" + data.introAudio} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default Scene;
