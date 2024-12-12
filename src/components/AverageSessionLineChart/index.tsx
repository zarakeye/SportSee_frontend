
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    value: number;
  }[] | null;
  label?: string;
} 

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

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const day = label;

      setActiveDay(day as string);
      return (
        <div className="custom-tooltip bg-quaternary p-[17px]">
          <p className="desc text-secondary text-[8px]">{`${payload[0].value} min`}</p>
        </div>
      );
    }
  
    return null;
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
      onMouseLeave={handleMouseLeave}
    >
      <CartesianGrid strokeDasharray="3 3" fill="#E60000" vertical={false} horizontal={false} />
      <XAxis dataKey="day" /*tickLine={false} tickMargin={-32} padding={{ left: 14, right: 14 }} tick={{fill: '#FFFFFF', fillOpacity: 0.5}}*/ />
      <YAxis hide={true} />
      <Tooltip /*content={<CustomTooltip />} cursor={false}*/  />
      <Line
        type="monotone"
        dataKey="sessionLength"
        // fill="#FFF"
        stroke="#FFF"
        // fillOpacity={0.5}
        dot={false}
        // activeDot={{ r: 4, strokeWidth: 8, strokeOpacity: 0.5}}
        strokeWidth={2}
      />
      {/* {activeDay && ( */}
        <ReferenceArea
          // x1={activeDay}
          x1="M"
          // x2={arrayData[arrayData.length - 1].day}
          x2="V"
          fillOpacity={0.4}
          ifOverflow="extendDomain"
        />
      {/* )} */}
    </LineChart>
  );
};

export default AverageSessionLineChart;
