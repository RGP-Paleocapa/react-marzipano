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
      target: '#map-overlay',
      content: "Questa è la mappa. Clicca sui pallini per cambiare scena.",
      placement: "left",
      disableBeacon: true,
    },
  ];

  const audioStep: Step = {
    target: "#audio-overlay",
    content: "Questo è il lettore audio. Puoi controllare l'audio della scena qui.",
    placement: "top",
    disableBeacon: true,
  };

  const [steps, setSteps] = useState<Step[]>(audioVisible ? [...baseSteps, audioStep] : baseSteps);

  useEffect(() => {
    if (audioVisible) {
      setSteps([...baseSteps, audioStep]);
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
