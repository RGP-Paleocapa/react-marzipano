// src/types/marzipano.d.ts

declare module 'marzipano' {
  export interface ViewerOptions {
    controls?: {
      mouseViewMode?: string;
    };
  }

  export class Viewer {
    constructor(element: HTMLElement, opts?: ViewerOptions);
    lookTo(params: ViewParameters, transitionDuration?: number): void;
    stopMovement(): void; // Method to stop any ongoing movement or animation
    createScene(data: SceneData): Scene;
    setIdleMovement(delay: number, movementFunction: any): void; // Add this line for idle movement
    startMovement(movementFunction: any): void; // Add this line for starting movement
    destroy(): void;
  }

  export class Scene {
    hotspotContainer(): HotspotContainer;
    switchTo(): void;
  }

  export class HotspotContainer {
    createHotspot(element: HTMLElement, position: { yaw: number, pitch: number }): Hotspot;
    destroyHotspot(hotspot: Hotspot): void;
    hasHotspot(hotspot: Hotspot): boolean;
  }

  export class Hotspot {
    // Define properties and methods relevant to Hotspots if needed
  }

  export class ImageUrlSource {
    static fromString(url: string, opts?: any): ImageUrlSource;
  }

  export class CubeGeometry {
    constructor(levels: CubeGeometryLevel[]);
  }

  export class RectilinearView {
    constructor(params: ViewParameters, limiter?: ViewLimiter);
    static limit: {
      traditional(faceSize: number, maxFov: number, minFov: number): ViewLimiter;
    };
  }

  export interface CubeGeometryLevel {
    tileSize: number;
    size: number;
    fallbackOnly?: boolean;
  }

  export interface ViewParameters {
    yaw: number;
    pitch: number;
    fov: number;
  }

  export interface ViewLimiter {}

  // Add the autorotate function
  export function autorotate(params: { yawSpeed: number; targetPitch: number; targetFov: number }): any;
}
