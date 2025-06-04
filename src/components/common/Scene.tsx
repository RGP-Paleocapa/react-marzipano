import React, { useEffect } from "react";
import { AppData } from "@data";
import { HotspotContainer } from "@common";
import Marzipano from "marzipano";

interface SceneProps {
  viewer: Marzipano.Viewer;
  data: AppData["scenes"][0];
  common: AppData["common"];
  sceneObjects: Marzipano.Scene[];
  currentSceneIndex: number;
  setAudioSrc: (audioLink: string) => void;
}

const Scene: React.FC<SceneProps> = ({
  viewer,
  data,
  sceneObjects,
  currentSceneIndex,
  setAudioSrc,
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

  useEffect(() => {
    if (data.introAudio) {
      setAudioSrc(data.introAudio);
    } else {
      setAudioSrc("");
    }
    console.log(data.introAudio);
  }, [data]);

  return (
    <div className="relative">
      <HotspotContainer
        infoHotspots={data.infoHotspots}
        linkHotspots={data.linkHotspots}
        sceneObjects={sceneObjects}
        currentSceneIndex={currentSceneIndex}
      />
    </div>
  );
};

export default Scene;
