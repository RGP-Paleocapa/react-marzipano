import { create } from 'zustand';

interface SceneState {
  currentSceneIndex: number;
  scenes: number[];
  autoSwitch: boolean;
  setSceneIndex: (index: number) => void;
  toggleAutoSwitch: () => void;
  nextScene: () => void;
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
  }
}));
