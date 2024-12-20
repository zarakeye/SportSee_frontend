
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea
} from "recharts";
import useFetchAverageSessions from "../../hooks/useFetchAverageSessions";
import { CategoricalChartState } from "recharts/types/chart/types";

interface AverageSessionProps {
  userId: string;
  width: number;
  height: number;
  backgroundColor: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    value: number;
  }[] | null;
  label?: string;
}

interface CustomTickProps {
  x: number;
  y: number;
  payload: {
    value: number;
  };
  index?: number;
  visibleTickCount?: number;
}

const AverageSessionLineChart: React.FC<AverageSessionProps> = ({userId, width, height, backgroundColor}) => {
  const { userAverageSessions, loading, error } = useFetchAverageSessions(userId);
  const [activeDay, setActiveDay] = useState<number | null>(null);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const {sessions} = userAverageSessions || {};


  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      
      
      return (
        <div style={{transform: "translateX(-14px)"}} className="custom-tooltip bg-quaternary p-[17px]">
          <p className="desc text-secondary text-[8px]">{`${payload[0].value} min`}</p>
        </div>
      );
    }
  
    return null;
  };

  const dayLabels = [
    "L",
    "M",
    "M",
    "J",
    "V",
    "S",
    "D"
  ];

  const handleMouseMove = (e: CategoricalChartState) => {
    if (e && e.activePayload) {
      const { day } = e.activePayload[0].payload;
      console.log('Mouse move - payload:', e.activePayload[0].payload);
      setActiveDay(day - 1);
      console.log('activeDay:', activeDay);
    }
  };

  const handleMouseLeave = () => {
    setActiveDay(null);
    console.log('activeDay:', activeDay);
  };

  const CustomTick: React.FC<CustomTickProps> = (props: CustomTickProps) => {
    const { y, payload, index } = props;
    const value = payload.value;
    const label = value >= 0 && value <= 7 ? dayLabels[Math.floor(value - 1)] || '' : '';
    
    // Calculer la position horizontale pour un espacement uniforme
    const totalWidth = 258 - 14 * 2;
    const spacing = totalWidth / 6; // Largeur totale divisée par (nombre de labels - 1)
    const adjustedX = (index || 0) * spacing;

    return (
      <g transform={`translate(${adjustedX + 14},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="middle"
          fill="#FFFFFF"
          fillOpacity={0.5}
          fontSize={12}
        >
          {label}
        </text>
      </g>
    );
  };

  return (
    <div className={`relative col-span-1 row-start-3 row-span-2 flex flex-col bg-[${backgroundColor}] justify-center items-center rounded-[5px] w-[${width}px] h-[${height}px] `}>
      <ResponsiveContainer
        width="100%"
        height={260}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: "5px"
        }}
      >
        <LineChart
          data={sessions}
          margin={{
            top: 80,
            right: 0,
            left: 0,
            bottom: 5,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#000" stopOpacity={0}/>
              <stop offset="100%" stopColor="#000" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            fill="#E60000"
            vertical={false}
            horizontal={false}
          />
          <XAxis
            axisLine={false}
            dataKey="day"
            tickFormatter={(value) => {
              if (value < 0 || value > 7) return '';
              return dayLabels[Math.floor(value - 1)] || '';
              // (value) => dayLabels[Math.floor(value - 1)]
        
            }}
            // tick={{ fill: '#FFFFFF', fillOpacity: 0.5}}
            tick={<CustomTick x={0} y={0} payload={{
              value: 0
            }} />}
            tickLine={false}
            tickMargin={0}
            domain={[0, 7]}
            // padding={{ left: 14, right: 14 }}
            interval={0}
            scale="point"
          />
          <YAxis
            hide={true}
            orientation="right"
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="#FFF"
            dot={false}
            activeDot={{
              r: 4,
              strokeWidth: 8,
              strokeOpacity: 0.5,
            }}
            strokeWidth={2}
            connectNulls={true}
          />
          {activeDay !== null && (
            <ReferenceArea
              x1={activeDay + 1}
              x2={7}
              y1={-80}
              y2={265}
              fill="#000"
              fillOpacity={.1}
              ifOverflow="visible"
            />
          )}

        </LineChart>
      </ResponsiveContainer>
      <p className="absolute text-[15px] font-medium top-[29px] left-[34px] text-quaternary bg-transparent z-10 w-[147px] h-[48px]">Durée moyenne des sessions</p>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/15 to-transparent z-[20] pointer-events-none rounded-[5px]"></div>
      {/*{activeDay !== null && (
        <div style={{ width: `${width - ((activeDay * 258 / 7)) + 32}px` }} className="absolute top-0 h-full right-0 bg-secondary opacity-10 z-[1000] pointer-events-none"></div>
      )}*/}
    </div>
  );
};

export default AverageSessionLineChart;
