import { create } from 'zustand';

interface ViewState {
  isRotating: boolean | null;
  mapEnabled: boolean;
  toggleRotation: (enabled: boolean) => void;
  setAutorotateEnabled: (isEnabled: boolean) => void;
  toggleMapEnabled: () => void;
}

export const useViewStore = create<ViewState>((set) => ({
  isRotating: null,
  mapEnabled: true,
  toggleRotation: (enabled) => set({ isRotating: enabled }),
  setAutorotateEnabled: (isEnabled) => set({ isRotating: isEnabled }),
  toggleMapEnabled: () => set((state) => ({ mapEnabled: !state.mapEnabled }))
}));
