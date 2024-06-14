import { SceneState } from '@/types/store-types';
import { create } from 'zustand';

export const useSceneStore = create<SceneState>((set) => ({
    currentSceneIndex: 0,
    switchScene: (index: number) => set({ currentSceneIndex: index }),
}));
