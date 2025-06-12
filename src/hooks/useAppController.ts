import { useRef, useState } from "react";
import { useSceneStore, useVideoStore } from "@stores";
import { useContentToggle, useFullScreen, useMarzipano } from "@hooks";
import { APP_DATA } from "@config";
import type { AppData } from "@types";

export const useAppController = () => {
  const panoRef = useRef<HTMLDivElement>(null);
  const { currentSceneIndex } = useSceneStore();
  const { closeVideo, isVideoVisible, videoLink } = useVideoStore();
  const [audioSrc, setAudioSrc] = useState<string | null>(null);

  const appData = APP_DATA as AppData;
  const currentScene = appData.scenes[currentSceneIndex];

  const { sceneObjects, error } = useMarzipano(
    panoRef,
    APP_DATA,
    currentSceneIndex
  );

  const { toggleFullscreen } = useFullScreen(panoRef);
  const { visibleContent, handleContentChange } = useContentToggle();


  return {
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
    error
  };
};
