import React from 'react';
import '@/styles/buttons/button-style.css';

interface InfoComponentProps {
  setInfoVisible: (visible: boolean) => void;
}

const InfoComponent: React.FC<InfoComponentProps> = ({ setInfoVisible }) => {
  return (
    <div className="z-20 absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-5xl bg-gray-800 bg-opacity-90 p-8 rounded-md shadow-md text-white overflow-auto max-h-full border-4 border-blue-600">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold mb-4 text-blue-300 text-justify">Nevera Virtual Tour</h1>
          <p className="text-xl mb-6 text-justify">
            Benvenuto. Per navigare all'interno del museo e visitare la nevera trascina il cursore per muovere le immagini a 360° e clicca sugli
            hotspot con le frecce per spostarti in un altro scenario. Puoi spostarti utilizzando anche la mappa in basso a destra.
          </p>
          <div className="flex justify-center">
            <button
              id="explore-button"
              className="btn-77 mb-8"
              onClick={() => setInfoVisible(false)}
            >
              Esplora
            </button>
          </div>
        </div>
        <div className="text-center mt-8 bg-gray-800 bg-opacity-50 p-4 rounded-md">
          <div className="credits text-xs mb-2 opacity-75">
            <span className="font-semibold">Autore:</span> Nicola Invernizzi,
            <span className="font-semibold"> Sviluppatori Attuali:</span> Puiu Rares Gabriel, Faye Kenowa
          </div>
          <div className="text-xs mb-2 opacity-75">
            Progetto sviluppato nel contesto delle attività Computing for Social Good di Renato Cortinovis
          </div>
          <div className="copyright text-xs opacity-75">CC BY-NC-SA 4.0</div>
        </div>
      </div>
    </div>
  );
};

export default InfoComponent;
