import React from 'react';

interface OverlayProps {
  activeIndex: number | null;
}

const Overlay: React.FC<OverlayProps> = ({ activeIndex }) => {
  return (
    <div className={`absolute top-0 left-[${activeIndex}px] right-0 bottom-0 bg-black opacity-50 z-20`}></div>
  );
};

export default Overlay;