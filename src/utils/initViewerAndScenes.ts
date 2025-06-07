import { RefObject } from "react"
import { createScene, createViewer } from "@utils"
import { AppData } from "@data";

export const initViewerAndScenes = (
  panoRef: RefObject<HTMLDivElement>,
  appData: AppData,
  currentSceneIndex: number,
  isRotating: boolean | null,
  setAutorotateEnabled: (val: boolean) => void,
) => {
  if (!panoRef.current) return;

  const { settings, scenes, common } = appData;

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
