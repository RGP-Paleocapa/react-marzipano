// types/storeTypes.ts

import { RefObject } from "react";

/**
 * @deprecated SceneState is deprecated and should no longer be used. Scene management is now handled locally in components.
 */
export interface SceneState {
  currentSceneIndex: number;
  switchScene: (index: number) => void;
}
  

export interface VideoState {
  videoLink: string | null;
  isVideoVisible: boolean;
  showVideo: (videoLink: string) => void;
    closeVideo: () => void;
}
 
/**
 * @deprecated AppState is deprecated and should no longer be used.
 */
export interface AppState extends SceneState, VideoState {}
  
/**
 * @alpha This interface is still in development and shuld not be used in production.
 */
export interface FocusStoreState {
  focusLinkHotspot: RefObject<HTMLDivElement> | null;
  setFocusLinkHotspot: (ref: RefObject<HTMLDivElement>) => void;
  triggerFocus: () => void;
}