import { create } from "zustand";

interface ViewState {
  isRotating: boolean;
  mapEnabled: boolean;
  toggleRotation: (enabled: boolean) => void;
  setAutorotateEnabled: (isEnabled: boolean) => void;
  toggleMapEnabled: () => void;
}

export const useViewStore = create<ViewState>((set) => {
  if (!localStorage.getItem("isRotating")) {
    localStorage.setItem("isRotating", "true");
  }
  const storedIsRotating =
    localStorage.getItem("isRotating") == "true" ? true : false;

  return {
    isRotating: storedIsRotating,
    mapEnabled: true,
    toggleRotation: (enabled) => {
      set({ isRotating: enabled });
      localStorage.setItem("isRotating", JSON.stringify(enabled));
    },
    setAutorotateEnabled: (isEnabled) => set({ isRotating: isEnabled }),
    toggleMapEnabled: () => set((state) => ({ mapEnabled: !state.mapEnabled })),
  };
});
