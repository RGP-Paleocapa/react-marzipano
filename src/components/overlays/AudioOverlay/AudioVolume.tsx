interface Props {
  isMuted: boolean;
  onToggle: () => void;
}

const AudioVolume: React.FC<Props> = ({ isMuted, onToggle }) => {
  return (
    <button
      id="audio-volume"
      onClick={onToggle}
      className={`text-sm font-medium w-24 px-3 py-1 ${isMuted ? 'bg-red-700 hover:bg-red-900' : 'bg-green-700 hover:bg-green-900'} text-white rounded transition`}
    >
      {isMuted ? "🔇 Mutato" : "🔊 Suono"}
    </button>
  );
}

export default AudioVolume;
