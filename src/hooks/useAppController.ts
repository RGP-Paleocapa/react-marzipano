import { useRef, useState } from "react";
import { useSceneStore, useVideoStore } from "@store";
import { useContentToggle, useFullScreen, useMarzipano } from "@hooks";
import { APP_DATA } from "@data";
import type { AppData } from "@types";

export const useAppController = () => {
  const panoRef = useRef<HTMLDivElement>(null);
  const currentSceneIndex = useSceneStore(state => state.currentSceneIndex);
  const closeVideo = useVideoStore(state => state.closeVideo);
  const isVideoVisible = useVideoStore(state => state.isVideoVisible);
  const videoLink = useVideoStore(state => state.videoLink);
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
