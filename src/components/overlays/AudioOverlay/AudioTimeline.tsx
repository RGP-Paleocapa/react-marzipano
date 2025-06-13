interface Props {
  progress: number;
  onSeek: (value: number) => void;
}

const AudioTimeline: React.FC<Props> = ({ progress, onSeek }) => {
  return(
    <input
      type="range"
      min="0"
      max="100"
      value={progress}
      step="0.1"
      onChange={(e) => onSeek(parseFloat(e.target.value))}
      className="flex-1 h-2 accent-blue-600 cursor-pointer"
    />
  );
}

export default AudioTimeline;
