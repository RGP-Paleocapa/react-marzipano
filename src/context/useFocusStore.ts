// useFocusStore.ts
import { create } from 'zustand';
// import { RefObject } from 'react';
import { FocusStoreState } from '@/types/store-types';

// interface FocusStoreState {
//   focusLinkHotspot: RefObject<HTMLDivElement> | null;
//   setFocusLinkHotspot: (ref: RefObject<HTMLDivElement>) => void;
//   triggerFocus: () => void;
// }

const useFocusStore = create<FocusStoreState>((set) => ({
  focusLinkHotspot: null,
  setFocusLinkHotspot: (ref) => set({ focusLinkHotspot: ref }),
  triggerFocus: () => {
    set((state) => {
      if (state.focusLinkHotspot && state.focusLinkHotspot.current) {
        state.focusLinkHotspot.current.focus();
      }
      return {}; // Return an empty object to comply with Zustand's set function requirement
    });
  },
}));

export default useFocusStore;
