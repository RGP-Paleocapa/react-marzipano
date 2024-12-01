import React, { useEffect, useRef } from 'react';
import '@/styles/buttons/button-style.css';
import { useViewStore } from '@/context/useViewerStore';
// import { useSceneStore } from '@/context/useSceneStore';
import info from '@/assets/icons/info.png';
import link from '@/assets/icons/link.png';
import linkred from '@/assets/icons/linkred.png';
import licenza from '@/assets/icons/by-nc-sa.svg';

interface InfoComponentProps {
  onClose: () => void;
  isCredits: boolean;
}

const InfoComponent: React.FC<InfoComponentProps> = ({ onClose, isCredits }) => {
  const { isRotating, toggleRotation } = useViewStore();
  const initialRotationState = useRef<boolean>(isRotating);

  useEffect(() => {
    if (isRotating) {
      toggleRotation(false);
    }

    return () => {
      if (initialRotationState.current) {
        toggleRotation(initialRotationState.current);
      }
    };
  }, [toggleRotation]);

  const contentTitle = isCredits
    ? 'Visita Virtuale alla Nevera del Museo Valdimagnino'
    : 'Nevera Virtual Tour';

  const containerStyles = isCredits
    ? 'bg-gray-700 border-green-600'
    : 'bg-gray-800 border-blue-600';
  const titleStyles = isCredits
    ? 'text-green-300'
    : 'text-blue-300';
  const bodyStyles = isCredits
    ? 'bg-gray-700 bg-opacity-50'
    : 'bg-gray-800 bg-opacity-50';

  const renderInfoContent = () => (
    <section className="flex flex-col lg:flex-row lg:space-x-8">
  {/* Main Info Content */}
  <div className="flex-1 mb-8 lg:mb-0">
    <div className="mb-6 text-justify text-xl">
      <p>
        Benvenuto nel museo Valdimagnino di Amagno virtuale! <br />
        Per navigare all'interno del museo e visitare la nevera,
        trascina il cursore per visualizzare al meglio le immagini a 360° e clicca sugli <b className="italic text-yellow-300">hotspot con le frecce</b>
        <img src={link} alt="Linkspot" className="w-6 h-6 mx-2 inline" />
        per spostarti in un altro scenario.
      </p>
    </div>

    <div className="text-justify text-xl space-y-6">
      <div className="flex items-start">
        <img src={linkred} alt="Linkspot" className="w-6 h-6 mr-2" />
        <p className="flex-1">
          I <b className="italic text-red-300">linkspot rossi</b> indicano il percorso principale all'interno del museo e consentono di spostarsi tra diverse scene.
        </p>
      </div>
      <div className="flex items-start">
        <img src={link} alt="Linkspot" className="w-6 h-6 mr-2" />
        <p className="flex-1">
          I <b className="italic text-white">linkspot bianchi</b> offrono una breve deviazione con scene ed informazioni aggiuntive del museo.
        </p>
      </div>
      <div className="flex items-start">
        <img src={info} alt="Infospot" className="w-6 h-6 mr-2" />
        <p className="flex-1">
          Gli <b className="italic text-blue-300">infospot bianchi</b> mostrano informazioni su oggetti o luoghi del museo e possono includere anche video esplicativi per approfondire il contenuto.
        </p>
      </div>
    </div>
  </div>

  {/* Map Navigation Info */}
  <div className="w-full lg:w-2/5 bg-gray-900 bg-opacity-80 p-6 rounded-md border border-gray-700">
    <h2 className="text-2xl font-bold mb-4 text-center text-yellow-300">Come Usare la Mappa</h2>
    <p className="text-xl mb-6 text-justify">
      La mappa interattiva ti consente di navigare tra le stanze del museo.
      Cliccando sulla mappa, puoi ingrandire per esplorare meglio. I <b className="text-red-300">punti rossi</b> indicano le stanze visitabili, mentre il <b className="text-green-300">punto verde</b> mostra la tua posizione attuale.
    </p>
    {/* Legend */}
    <div className="flex items-center space-x-4 mt-4">
      <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
      <span className="text-white">Stanze del museo</span>
    </div>
    <div className="flex items-center space-x-4 mt-2">
      <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
      <span className="text-green-300">Posizione attuale</span>
    </div>
  </div>
</section>
  );

  const renderCreditsContent = () => (
    <div className={`flex flex-col items-center mt-8 ${bodyStyles} p-8 rounded-md`}>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold mb-4 text-yellow-300 border-b-2 border-yellow-400 inline-block pb-2">
          Credits
        </h2>
      </div>
      <p className="text-lg mb-6 text-justify leading-relaxed">
        <span className="font-semibold">Autori:</span> Rares Gabriel Puiu, Faye Kenoua Diop, Nicola Invernizzi.
      </p>
      <p className="text-lg mb-6 text-justify leading-relaxed">
        Progetto sviluppato nell'ambito delle attività di
        <span className="font-semibold italic text-green-400"> Computing for Social Good </span>
        guidate da Renato Cortinovis, con materiali forniti da Giuseppe Ghidorzi.
      </p>
      {/* <p className="text-lg mb-6 text-justify leading-relaxed">
        Un ringraziamento speciale a tutti i collaboratori che hanno reso possibile questo progetto.
      </p> */}
      <div className="flex flex-col items-center justify-center space-y-2 mt-4">
        <a
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 dark:hover:text-blue-400 transition duration-300 flex flex-col md:flex-row items-center"
        >
          <img src={licenza} alt="Creative Commons BY-NC-SA 4.0 License" className="h-12 w-auto mb-2 md:mb-0 md:mr-3" />
          <span className="text-sm text-gray-400">Licensed under CC BY-NC-SA 4.0</span>
        </a>
      </div>
      {/* <div className="text-sm text-gray-500 mt-4 text-center">
        <p>Tutti i diritti riservati © Museo Valdimagnino. 2024.</p>
      </div> */}
    </div>
  );

  return (
    <div className="z-20 absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 p-4 mt-10 lg:mt-0">
      <main className={`w-full max-w-5xl ${containerStyles} bg-opacity-90 p-8 rounded-md shadow-md text-white overflow-auto max-h-full border-4`}>
        <header className="text-center mb-6">
          <h1 className={`text-4xl font-extrabold mb-4 ${titleStyles} text-justify`}>{contentTitle}</h1>
        </header>
        <article>
          <section>
            {isCredits ? renderCreditsContent() : renderInfoContent()}
          </section>
        </article>
        <footer className="flex justify-center mt-6">
          <button
            id="explore-button"
            className="btn-77 mb-8"
            onClick={onClose}
          >
            Esplora
          </button>
        </footer>
      </main>
    </div>
  );
};

export default InfoComponent;
