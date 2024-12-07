interface ProgressBarProps {
  videoRef: React.RefObject<HTMLVideoElement>
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ videoRef, progress }) => {
  return (
    <div
      className="w-full h-2 bg-gray-600 cursor-pointer z-20"
      onClick={event => {
        event.stopPropagation();
        const rect = event.currentTarget.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        if (videoRef.current) {
          const newTime = (offsetX / rect.width) * videoRef.current.duration;
          videoRef.current.currentTime = newTime;
        }
      }}
    >
      <div className="h-full bg-red-500" style={{ width: `${progress}%` }}></div>
    </div>
  );
}

export default ProgressBar;
