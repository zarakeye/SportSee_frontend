
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Area,
  ReferenceArea,
} from "recharts";
import useFetchAverageSessions from "../../hooks/useFetchAverageSessions";

interface AverageSessionProps {
  userId: string;
}

interface UserAverageSessionsReturn {
  day: string;
  sessionLength: number;
}

interface averageSessions {
  day: number;
  sessionLength: number;
}

// interface CustomTooltipProps {
//   active?: boolean;
//   payload?: {
//     day: number;
//     sessionLength: number;
//   }[];
//   setActiveDot: (activeDotData: averageSessions) => void;
// }

const AverageSessionLineChart: React.FC<AverageSessionProps> = ({userId}) => {
  const { userAverageSessions, loading, error } = useFetchAverageSessions(userId);
  const [activeDay, setActiveDay] = useState<string | null>(null);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const {data} = userAverageSessions || {};

  const sessions = data?.sessions as { day: number; sessionLength: number }[];
  const arrayData: UserAverageSessionsReturn[] = [];
  sessions.forEach((session) => {
    arrayData.push({
      day: session.day === 1 ? 'L' : session.day === 2 ? 'M' : session.day === 3 ? 'M' : session.day === 4 ? 'J' : session.day === 5 ? 'V' : session.day === 6 ? 'S' : session.day === 7 ? 'D' : '',
      sessionLength: session.sessionLength,
    });
  });

  const CustomTooltip: React.FC<averageSessions> = (/*{ active, payload }*/ activeDotData) => {
    if (/*active && payload && payload.length*/ activeDotData) {
      // setActiveDot(payload[0]);
      return (
        <div className="custom-tooltip bg-quaternary p-[17px]">
          <p className="desc text-secondary text-[8px]">{`${/*payload[0].sessionLength*/activeDotData?.sessionLength} min`}</p>
        </div>
      );
    }
  
    return null;
  };

  const handleMouseMove = (state: MouseEvent) => {
    const activeItem = ;
    if (e.active && e.payload.length) {
      setActiveDay(e.payload[0]);
    }
  };

  const handleMouseLeave = () => {
    setActiveDay(null);
  };

  return (
    <LineChart
      width={278}
      height={283}
      data={arrayData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <CartesianGrid strokeDasharray="3 3" fill="#E60000" vertical={false} horizontal={false} />
      <XAxis dataKey="day" tickLine={false} tickMargin={-32} padding={{ left: 14, right: 14 }} tick={{fill: '#FFFFFF', fillOpacity: 0.5}} />
      <YAxis hide={true} />
      <Tooltip
        
        content={<CustomTooltip activeDotData={activeDotData} />} cursor={false}  />
      {/* <Area
        type="monotone"
        dataKey={"sessionLength"}
        stroke="#E69999"
      /> */}
      <Line
        type="monotone"
        dataKey="sessionLength"
        fill="#FFF"
        stroke="#FFF"
        fillOpacity={0.5}
        dot={false}
        activeDot={{ r: 4, strokeWidth: 8, strokeOpacity: 0.5}}
        strokeWidth={2}
      />
      {activeDotData && (
        <ReferenceArea
          x1={activeDotData.day}
          x2={arrayData[arrayData.length - 1].day}
          fill="#E69999"
          fillOpacity={0.2}
        />
      )}
    </LineChart>
  );
};

export default AverageSessionLineChart;
