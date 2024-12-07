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
    stopMovement(): void;
    createScene(data: SceneData): Scene;
    setIdleMovement(delay: number | typeof Infinity, movementFunction?: (deltaTime: number) => void): void;
    startMovement(movementFunction: (deltaTime: number) => void): void;
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
    static fromString(url: string, opts?: Record<string, unknown>): ImageUrlSource;
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

  // export interface ViewLimiter {}

  // export interface SceneData {
    // Define properties relevant to scene data if needed
  // }

  export type Autorotate = (deltaTime: number) => void;

  export function autorotate(params: { yawSpeed: number; targetPitch: number; targetFov: number }): Autorotate;
}
