import { create } from 'zustand';
import { BaseHotspot } from '@/types/marzipano-types';

interface HotspotState {
  hotspotVisible: boolean;
  hotspots: BaseHotspot[];
  toggleHotspotVisibility: (visible: boolean) => void;
  setHotspots: (hotspots: BaseHotspot[]) => void;
}

export const useHotspotStore = create<HotspotState>((set) => ({
  hotspotVisible: true,
  hotspots: [],
  toggleHotspotVisibility: (visible) => set({ hotspotVisible: visible }),
  setHotspots: (hotspots) => set({ hotspots })
}));
