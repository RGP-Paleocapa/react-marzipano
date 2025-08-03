interface FullscreenOverlayProps {
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
}

const FullscreenOverlay: React.FC<FullscreenOverlayProps> = ({
  onClick,
  children,
  className = '',
}) => {
  return (
    <div
      className={`fixed flex items-center justify-center bottom-16 inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default FullscreenOverlay;
