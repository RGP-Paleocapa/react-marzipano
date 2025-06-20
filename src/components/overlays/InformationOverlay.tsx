import React, { useEffect, useRef } from 'react';
import { useViewStore, useAudioStore } from '@store';
import { iconInfo, iconLicense, iconLink, iconLinkGreen, iconLinkRed } from '@icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

interface InfoComponentProps {
  onClose: () => void;
  isCredits: boolean;
  setRunTour: (val: boolean) => void;
}

const InfoComponent: React.FC<InfoComponentProps> = ({ onClose, isCredits, setRunTour }) => {
  const isRotating = useViewStore(state => state.isRotating);
  const toggleRotation = useViewStore(state => state.toggleRotation);
  const setAudioInvisible = useAudioStore(state => state.setAudioInvisible);
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
  }, []);


  const handleButtonClick = () => {
    onClose();
    setAudioInvisible(false);
    requestAnimationFrame(() => setRunTour(true));
  }

  const contentTitle = isCredits
    ? 'Visita Virtuale <br /> alla <br /> Nevera del Museo Valdimagnino'
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

  const renderVideoSpot = () => (
    <span className="bg-red-500 p-1 w-6 h-6 mr-2">
      <FontAwesomeIcon
        icon={faVideo as IconProp}
        className="text-white"
      />
    </span>
  );

  const renderInfoContent = () => (
    <section className="flex flex-col lg:flex-row lg:space-x-8 text-justify">
      {/* Main Info Content */}
      <div className="flex-1 mb-8 lg:mb-0">
        <hr className="mb-6" />
        <div className="mb-6 text-justify text-xl">
          <p>
            Benvenuto nel museo Valdimagnino! <br />
            {/*Per navigare all'interno del museo e visitare la nevera,
            trascina il cursore per visualizzare al meglio le varie scene possibili e clicca le <b className="italic text-yellow-300">frecce colorate</b>
            <img src={iconLink} alt="Linkspot" className="w-6 h-6 mx-2 inline" />
            per spostarti in un altro scena.*/}
            {/* Una breve panoramica: */}
          </p>
        </div>

        <div className="text-justify text-xl space-y-6">
          <hr />
          <div className="flex items-start">
            <img src={iconLinkGreen} alt="Linkspot" className="w-8 h-8 mr-2" />
            <p className="flex-1">
              Le <b className="italic text-green-300">Freccie verdi</b> indicano il percorso principale da seguire all'interno del museo e consentono di spostarsi tra diverse scenari.
            </p>
          </div>
          <div className="flex items-start">
            <img src={iconLink} alt="Linkspot" className="w-8 h-8 mr-2" />
            <p className="flex-1">
              Le <b className="italic text-white">Frecce bianche</b> offrono una breve deviazione con scenari ed informazioni aggiuntive del museo.
            </p>
          </div>
          <div className="flex items-start">
            <img src={iconLinkRed} alt="Linkspot" className="w-8 h-8 mr-2" />
            <p className="flex-1">
              Le <b className="italic text-red-300">Frecce rosse</b> indicano lo scena precedente a quello attuale.
            </p>
          </div>
          <hr />
          <div className="flex items-start">
            <img src={iconInfo} alt="Infospot" className="w-8 h-8 mr-2" />
            <p className="flex-1">
              Gli <b className="italic text-blue-300">infospot bianchi</b> mostrano informazioni su oggetti o luoghi del museo e possono includere anche
            </p>
          </div>
          <div className="flex items-start">
            <p className="flex-1">
              {renderVideoSpot()}
              I <b className="italic text-red-300">video esplicativi</b>, usati per approfondire il contenuti.
            </p>
          </div>
        </div>
      </div>

      {/* Map Navigation Info */}
      {/* <div className="w-full lg:w-2/5 bg-gray-900 bg-opacity-80 p-6 rounded-md border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-center text-yellow-300">Come Usare la Mappa</h2>
        <p className="text-xl mb-6 text-justify">
          La mappa interattiva bidimensionale (2D) offre un ulteriore strumento per navigare tra le scene 3D del museo.
          I <b className="text-red-300">punti rossi</b> indicano i luoghi o le scene visitabili, mentre il <b className="text-green-300">punto verde</b> mostra la tua posizione attuale.
          È possibile passare dalla mappa 2D alle scene 3D cliccando sui puntini rossi, e viceversa cliccando sulla mappa.
          È possibile ingrandire la mappa, per una visione più chiara, con un semplice click sulla stessa.
        </p> */}
        {/* Legend */}
        {/*<div className="flex items-center space-x-4 mt-4">
          <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
          <span className="text-white">Stanze del museo</span>
        </div>
        <div className="flex items-center space-x-4 mt-2">
          <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          <span className="text-green-300">Posizione attuale</span>
        </div>
      </div>*/}
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
        sotto la guida di Renato Cortinovis, con materiali forniti da Giuseppe Ghidorzi.
      </p>
      <div className="flex flex-col items-center justify-center space-y-2 mt-4">
        <a
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 dark:hover:text-blue-400 transition duration-300 flex flex-col-reverse md:flex-row items-center gap-y-4"
        >
          <img src={iconLicense} alt="Creative Commons BY-NC-SA 4.0 License" className="h-12 w-auto mb-2 md:mb-0 md:mr-3" />
          <span className="text-sm text-gray-400">
            {/* Licensed under CC BY-NC-SA 4.0 */}
            Prodotto multimediale disponibile secondo la licenza <b>Creative Commons Attribuzione - Non Commerciale - Condividi allo Stesso Modo 4.0 Internazionale</b>
          </span>
        </a>
      </div>
    </div>
  );

  return (
    <div className="z-20 absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 p-4 mb-16">
      <main className={`w-full max-w-5xl ${containerStyles} bg-opacity-90 p-8 rounded-md shadow-md text-white overflow-auto max-h-full border-4`}>
        <header className="text-center mb-6">
          <h1 className={`text-4xl font-extrabold mb-4 ${titleStyles} text-justify lg:text-center`} dangerouslySetInnerHTML={{ __html: contentTitle }} />
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
            onClick={handleButtonClick}
          >
            Esplora
          </button>
        </footer>
      </main>
    </div>
  );
};

export default InfoComponent;
