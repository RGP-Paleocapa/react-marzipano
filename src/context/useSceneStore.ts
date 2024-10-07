import { create } from 'zustand';
import { BaseHotspot } from '@/types/marzipano-types';

export interface SceneState {
  /* Scenes */
  currentSceneIndex: number;
  scenes: number[];
  autoSwitch: boolean;
  setSceneIndex: (index: number) => void;
  toggleAutoSwitch: () => void;
  nextScene: () => void;

  /* Hotspots */
  hotspotVisible: boolean;
  hotspots: BaseHotspot[];
  toggleHotspotVisibility: (visible: boolean) => void;
  setHotspots: (hotspots: BaseHotspot[]) => void;

  /* View */
  isRotating: boolean | null;
  toggleRotation: (enabled: boolean) => void;
  setAutorotateEnabled: (isEnabled: boolean) => void;

  /* Map */
  mapEnabled: boolean;
  toggleMapEnabled: () => void;

}

export const useSceneStore = create<SceneState>((set, get) => ({
  currentSceneIndex: 0,
  scenes: [],
  autoSwitch: false,
  setSceneIndex: (index) => set({ currentSceneIndex: index }),
  toggleAutoSwitch: () => set((state) => ({ autoSwitch: !state.autoSwitch })),
  nextScene: () => {
    const currentIndex = get().currentSceneIndex;
    const scenes = get().scenes;
    const nextIndex = (currentIndex + 1) % scenes.length;
    set({ currentSceneIndex: nextIndex });
  },

  hotspotVisible: true,
  hotspots: [],
  toggleHotspotVisibility: (visible) => set({ hotspotVisible: visible }),
  setHotspots: (hotspots) => set({ hotspots }),

  isRotating: null,
  toggleRotation: (enabled) => set(({ isRotating: enabled })),
  setAutorotateEnabled: (isEnabled) => set({ isRotating: isEnabled }),

  mapEnabled: true,
  toggleMapEnabled: () => set((state) => ({ mapEnabled: !state.mapEnabled })),
}));
