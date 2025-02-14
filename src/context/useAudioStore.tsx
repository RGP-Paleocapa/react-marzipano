import { create } from 'zustand';

export interface AudioState {
    audioInvisible: boolean;
    setAudioInvisible: (audioVisible: boolean) => void;
}

export const useAudioStore = create<AudioState>((set) => ({
    audioInvisible: false,
    setAudioInvisible: (audioInvisible) => set(() => ({ audioInvisible })),
}));