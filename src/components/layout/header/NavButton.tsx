import React from 'react';

interface NavButtonProps {
  btnText: string;
  onClick: () => void;
  className?: string; // Allow custom styles to be passed in
}

const NavButton: React.FC<NavButtonProps> = ({ btnText, onClick, className }) => {
  return (
    <button
      className={`text-white flex items-center justify-center hover:bg-opacity-90 transition-colors duration-200 ease-in-out h-12 w-12 rounded-full ${className}`}
      onClick={onClick}
      aria-label="Show Information"
    >
      {btnText}
    </button>
  );
};

export default NavButton;
