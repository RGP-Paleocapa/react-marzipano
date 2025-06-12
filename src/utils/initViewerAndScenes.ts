import { RefObject } from "react"
import { createScene, createViewer } from "@utils"
import { AppData } from "@types";

export const initViewerAndScenes = (
  panoRef: RefObject<HTMLDivElement>,
  appData: AppData,
  currentSceneIndex: number,
  isRotating: boolean | null,
  setAutorotateEnabled: (val: boolean) => void,
) => {
  if (!panoRef.current) throw new Error('Panorama contaienr reference (panoRef) is null.  ');

  const { settings, scenes, common } = appData;

  if (!scenes[currentSceneIndex]) {
    throw new Error(`Scene at index ${currentSceneIndex} does not exist.`);
  }

  const viewer = createViewer(panoRef, settings);
  const sceneObjects = scenes.map(sceneData =>
    createScene(viewer, sceneData, common)
  );

  sceneObjects[currentSceneIndex].switchTo();

  if (isRotating == null) {
    setAutorotateEnabled(settings.autorotateEnabled);
  }

  return { viewer, sceneObjects };
}
