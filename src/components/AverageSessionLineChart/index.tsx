
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";
import useFetchAverageSessions from "../../hooks/useFetchAverageSessions";
import { CategoricalChartState } from "recharts/types/chart/types";

interface AverageSessionProps {
  userId: string;
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
  const [activeDay, setActiveDay] = useState<number | null>(null);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const {data} = userAverageSessions || {};

  const sessions = data?.sessions as { day: number; sessionLength: number }[];

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
      setActiveDay(day);
    }
  };

  const handleMouseLeave = () => {
    setActiveDay(null);
  };

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      // style={{
      //   display: 'flex',
      //   // justifyContent: 'center',
      //   // alignItems: 'center',
      //   borderRadius: "5px"
      // }}
    >
      <LineChart
        // width={258}
        // height={263}
        data={sessions}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <CartesianGrid strokeDasharray="3 3" fill="#E60000" vertical={false} horizontal={false} />
        <XAxis
          axisLine={false}
          dataKey="day"
          tickFormatter={(value) => dayLabels[Math.floor(value - 1)]}
          tick={{ fill: '#FFFFFF', fillOpacity: 0.5}}
          tickLine={false}
          // tickMargin={-32}
          
          padding={{ left: 14, right: 14 }}
        />
        <YAxis hide={true} />
        <Tooltip content={<CustomTooltip />} cursor={false} />
        <Line
          type="monotone"
          dataKey="sessionLength"
          stroke="#FFF"
          dot={false}
          activeDot={{ r: 4, strokeWidth: 8, strokeOpacity: 0.5, style: { transform: "translate(-14px, 32px)" }}}
          strokeWidth={2}
          style={{
            transform: "translate(-14px, 32px)",
          }}
        />
        {activeDay && (
          <ReferenceArea
            x1={activeDay}
            x2={sessions.length}
            height={300}
            fill="#000"
            fillOpacity={.15}
            ifOverflow="extendDomain"
            style={{
              transform: "translate(-14px, 32px)",
            }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AverageSessionLineChart;
