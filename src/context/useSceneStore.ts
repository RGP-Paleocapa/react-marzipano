import { create } from 'zustand';

export interface SceneState {
  currentSceneIndex: number;
  scenes: number[];
  autoSwitch: boolean;
  hotspotVisible: boolean;
  mapEnabled: boolean;
  isRotating: boolean;
  setSceneIndex: (index: number) => void;
  toggleAutoSwitch: () => void;
  toggleHotspotVisibility: (visible: boolean) => void;
  toggleMapEnabled: () => void;
  startRotation: () => void;
  stopRotation: () => void;
  nextScene: () => void;
}


export const useSceneStore = create<SceneState>((set, get) => ({
    currentSceneIndex: 0,
    scenes: [],
    autoSwitch: false,
    hotspotVisible: true,
    mapEnabled: true,
    isRotating: true,

    setSceneIndex: (index: number) => set({ currentSceneIndex: index }),
    toggleAutoSwitch: () => set((state) => ({ autoSwitch: !state.autoSwitch })),
    toggleHotspotVisibility: (visible: boolean) => set({ hotspotVisible: visible }),
    toggleMapEnabled: () => set((state) => ({ mapEnabled: !state.mapEnabled })),

    startRotation: () => set({ isRotating: true }),
    stopRotation: () => set({ isRotating: false }),

    nextScene: () => {
      const currentIndex = get().currentSceneIndex;
      const scenes = get().scenes;
      const nextIndex = (currentIndex + 1) % scenes.length;
      set({ currentSceneIndex: nextIndex });
    },
}));
