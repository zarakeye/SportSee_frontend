import React from 'react';

interface OverlayProps {
  activeIndex: number | null;
}

/**
 * Overlay renders a semi-transparent black background that overlays the chart
 * at a given x position, determined by the activeIndex prop.
 *
 * @param {number | null} activeIndex - The x position of the overlay. If null,
 * the overlay is not rendered.
 *
 * @returns {JSX.Element} A div element with the overlay styles.
 */
const Overlay: React.FC<OverlayProps> = ({ activeIndex }) => {
  return (
    <div className={`absolute top-0 left-[${activeIndex}px] right-0 bottom-0 bg-black opacity-50 z-20`}></div>
  );
};

export default Overlay;