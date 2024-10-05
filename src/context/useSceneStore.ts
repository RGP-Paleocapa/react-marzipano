import { create } from 'zustand';
import { BaseHotspot } from '@/types/marzipano-types';

export interface SceneState {
  currentSceneIndex: number;
  scenes: number[];
  autoSwitch: boolean;
  hotspotVisible: boolean;
  mapEnabled: boolean;
  isRotating: boolean | null;  // Allow null state
  hotspots: BaseHotspot[];
  setSceneIndex: (index: number) => void;
  toggleAutoSwitch: () => void;
  toggleHotspotVisibility: (visible: boolean) => void;
  toggleMapEnabled: () => void;
  startRotation: () => void;
  stopRotation: () => void;
  toggleRotation: (enabled: boolean) => void;
  nextScene: () => void;
  setHotspots: (hotspots: BaseHotspot[]) => void;
  setAutorotateEnabled: (isEnabled: boolean) => void;
}

export const useSceneStore = create<SceneState>((set, get) => ({
  currentSceneIndex: 0,
  scenes: [],
  autoSwitch: false,
  hotspotVisible: true,
  mapEnabled: true,
  isRotating: null,  // Default is null
  hotspots: [],

  setSceneIndex: (index: number) => set({ currentSceneIndex: index }),
  toggleAutoSwitch: () => set((state) => ({ autoSwitch: !state.autoSwitch })),
  toggleHotspotVisibility: (visible: boolean) => set({ hotspotVisible: visible }),
  toggleMapEnabled: () => set((state) => ({ mapEnabled: !state.mapEnabled })),

  startRotation: () => set({ isRotating: true }),
  stopRotation: () => set({ isRotating: false }),
  toggleRotation: (enabled: boolean) => set(({ isRotating: enabled })),

  nextScene: () => {
    const currentIndex = get().currentSceneIndex;
    const scenes = get().scenes;
    const nextIndex = (currentIndex + 1) % scenes.length;
    set({ currentSceneIndex: nextIndex });
  },

  setHotspots: (hotspots) => set({ hotspots }),
  setAutorotateEnabled: (isEnabled) => set({ isRotating: isEnabled }),
}));
