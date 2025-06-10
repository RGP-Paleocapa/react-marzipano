import { useAudioStore } from "@stores";
import { useAudioLogic } from "./useAudioLogic";
import { useAudioUI } from "./useAudioUI";

export const useAudioPlayer = (introAudio: string | null) => {
  const { audioRef, ready } = useAudioLogic(introAudio);
  const audioInvisible = useAudioStore().audioInvisible;
  const uiControls = useAudioUI(audioRef, ready);

  return {
    audioRef,
    audioInvisible,
    ...uiControls,
  };
};
