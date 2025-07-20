import { usePreventClickOnDrag } from "@hooks/usePreventClickingOnDrag";

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
  const { onMouseDown, onMouseMove, shouldTriggerClick } = usePreventClickOnDrag();

  const handleClick = () => {
    if (shouldTriggerClick()) {
      onClick();
    }
  }
  return (
    <div
      className={`fixed flex items-center justify-center bottom-16 inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10 ${className}`}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default FullscreenOverlay;
