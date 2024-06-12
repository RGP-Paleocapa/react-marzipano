import { VideoState } from '@/types/store-types';
import { create } from 'zustand';

// interface VideoState {
//     videoLink: string | null;
//     isVideoVisible: boolean;
//     showVideo: (videoLink: string) => void;
//     closeVideo: () => void;
// }

export const useVideoStore = create<VideoState>((set) => ({
    videoLink: null,
    isVideoVisible: false,
    showVideo: (videoLink: string) => set({ videoLink, isVideoVisible: true }),
    closeVideo: () => set({ videoLink: null, isVideoVisible: false }),
}));