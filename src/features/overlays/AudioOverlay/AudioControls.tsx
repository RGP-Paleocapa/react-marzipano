interface Props {
  isPlaying: boolean;
  onToggle: () => void;
}


const AudioControls: React.FC<Props> = ({ isPlaying, onToggle }) => {
  return(<button
    onClick={onToggle}
    className="text-sm w-24 font-medium px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
  >
    {isPlaying ? "⏸ Avvia" : "▶️ Ferma"}
  </button>
);
}

export default AudioControls;
