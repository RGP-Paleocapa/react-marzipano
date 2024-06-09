import { create } from 'zustand';

interface SceneState {
  currentSceneIndex: number;
  switchScene: (index: number) => void;
}

export const useStore = create<SceneState>((set) => ({
  currentSceneIndex: 0,
  switchScene: (index: number) => set({ currentSceneIndex: index }),
}));
