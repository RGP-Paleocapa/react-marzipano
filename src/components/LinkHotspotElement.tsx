import React from 'react';

interface LinkHotspotElementProps {
  switchToScene: () => void;
}

const LinkHotspotElement: React.FC<LinkHotspotElementProps> = ({ switchToScene }) => {
  return (
    <div className="link-hotspot bg-slate-800 p-10" onClick={switchToScene}>
      <div className="link-hotspot__icon cursor-pointer">🔗</div>
    </div>
  );
};

export default LinkHotspotElement;
