import { useEffect, useState } from "react";
import Joyride, { Step } from "react-joyride";

const Tour = ({
  run,
  setRun,
  audioVisible,
}: {
  run: boolean;
  setRun: (val: boolean) => void;
  audioVisible: boolean;
}) => {
  const baseSteps: Step[] = [
    {
      target: '#marzipano-scene',
      content: "Dopo aver finiro il tour trascina il cursore per iniziare a navigare nel museo.",
      placement: "center",
      disableBeacon: true,
    },
    {
      target: '#map-overlay',
      content: "La mappa che ti permette di cambiare scena.",
      placement: "left",
      disableBeacon: true,
    },
    {
      target: '#dot-11',
      content: "I punti rossi indicano i luoghi o le scena visitabili.",
      placement: "left",
      disableBeacon: true,
    },
    {
      target: '#dot-0',
      content: "Il punto verde mostra la tua posizione attuale.",
      placement: "left",
      disableBeacon: true,
    },
  ];

  const audioStep: Step[] = [
    {
      target: "#audio-overlay",
      content: "Questo è il lettore audio. Puoi controllare l'audio dello scena qui.",
      placement: "top",
      disableBeacon: true,
    },
    {
      target: "#audio-volume",
      content: "Ricordati di attivare l'audio (colore Verde).",
      placement: "top",
      disableBeacon: true,
    },
  ];

  const [steps, setSteps] = useState<Step[]>(audioVisible ? [...baseSteps, ...audioStep] : baseSteps);

  useEffect(() => {
    if (audioVisible) {
      setSteps([...baseSteps, ...audioStep]);
    } else {
      setSteps(baseSteps);
    }
  }, [audioVisible]);

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      showProgress
      styles={{ options: { zIndex: 10000 } }}
      callback={(data) => {
        if (data.status === "finished" || data.status === "skipped") {
          setRun(false);
        }
      }}
    />
  );
};

export default Tour;
