import { useCallback, useState } from "react";

export const useFullScreen = (ref: React.RefObject<HTMLElement>) => {
  const [isFullscreen, setFullscreen] = useState<boolean>(false);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      ref.current?.requestFullscreen()
      .then(() => setFullscreen(true))
      .catch(err => console.error('Error enabling fullscreen:', err));
    } else {
      document.exitFullscreen()
      .then(() => setFullscreen(false))
      .catch(err => console.error('Error disabling fullscreen:', err));
    }
  }, [ref]);

  return {isFullscreen, toggleFullscreen};
}
