export interface Level {
  tileSize: number;
  size: number;
  fallbackOnly?: boolean;
}

export interface InitialViewParameters {
  pitch: number;
  yaw: number;
  fov: number;
}

export interface BaseHotspot {
  yaw: number;
  pitch: number;
  text?: string;
}

export interface LinkHotspot extends BaseHotspot {
  rotation?: number;  
  target: string;  
  isRed: boolean;  
}

export interface InfoHotspot extends BaseHotspot {
  title: string;  
  infoText?: string;
  videoLink?: string;  
}

export interface Scene {
  id: string;
  name: string;
  initialViewParameters: InitialViewParameters;
  linkHotspots: LinkHotspot[];
  infoHotspots: InfoHotspot[];
}

export interface Settings {
  mouseViewMode: string;
  autorotateEnabled: boolean;
  fullscreenButton: boolean;
  viewControlButtons: boolean;
}

export interface Common {
  levels: Level[];
  faceSize: number;
}

export interface AppData {
  settings: Settings;
  scenes: Scene[];
  common: Common;
}
