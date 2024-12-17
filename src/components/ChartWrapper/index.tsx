import React, { useState } from "react";
import ChartResponsiveContainer from "../ChartResponsiveContainer";

interface ChartResponsiveContainerProps {
  width: number;
  height: number;
  backgroundColor: string;
  children: React.ReactElement;
}

const ChartWrapper: React.FC<ChartResponsiveContainerProps> = ({width, height, backgroundColor, children }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  return (
  <div className={`relative col-span-1 row-start-3 row-span-2 flex flex-col bg-[${backgroundColor}] justify-center items-center rounded-[5px] w-[${width}px] h-[${height}px] `}>
    <ChartResponsiveContainer activeIndex={activeIndex} setActiveIndex={() => setActiveIndex} >
      {children}
    </ChartResponsiveContainer>
  </div>
  );
}

export default ChartWrapper;