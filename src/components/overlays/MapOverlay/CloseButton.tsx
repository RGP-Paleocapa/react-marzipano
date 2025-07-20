interface CloseButtonProps {
  onClick: () => void;
  className?: string;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick, className = '' }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className={`absolute cursor-pointer bg-red-700 text-white w-12 h-12 border-2 rounded-lg shadow-lg ${className}`}
  >
    X
  </button>
);

export default CloseButton;
