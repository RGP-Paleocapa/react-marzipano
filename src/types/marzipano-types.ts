export interface Scene {
  id: string;
  name: string;
  levels: Level[];
  faceSize: number;
  initialViewParameters: InitialViewParameters;
  linkHotspots: LinkHotspot[];
  infoHotspots: InfoHotspot[];
}

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

export interface Settings {
  mouseViewMode: string;
  autorotateEnabled: boolean;
  fullscreenButton: boolean;
  viewControlButtons: boolean;
}

export interface AppData {
  settings: Settings;
  scenes: Scene[];
}

export interface BaseHotspot {
  yaw: number;
  pitch: number;
  text?: string;
}

export interface LinkHotspot extends BaseHotspot {
  rotation?: number;  // This could represent rotation angle, if applicable
  target: string;  // Target scene id
  isRed: boolean;  // Example attribute for specific styling or behavior
}

export interface InfoHotspot extends BaseHotspot {
  title: string;  // Title for the information hotspot
  infoText: string;  // Detailed text for the hotspot
}
