
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
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
  payload?: { value: string }[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-quaternary p-[17px]">
        <p className="desc text-secondary text-[8px]">{`${payload[0].value} min`}</p>
      </div>
    );
  }

  return null;
};

const AverageSession: React.FC<AverageSessionProps> = ({userId}) => {
  const { userAverageSessions, loading, error } = useFetchAverageSessions(userId);

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

  return (
    <LineChart
      width={258}
      height={263}
      data={arrayData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" fill="#E60000" vertical={false} horizontal={false} />
      <XAxis dataKey="day" tickLine={false} tickMargin={-32} padding={{ left: 14, right: 14 }} tick={{fill: '#FFFFFF', fillOpacity: 0.5}} />
      <YAxis hide={true} />
      <Tooltip content={<CustomTooltip payload={[]}/>}/>
      <Line
        type="monotone"
        dataKey="sessionLength"
        fill="#FFF"
        stroke="#FFF"
        fillOpacity={0.5}
        dot={false}
        activeDot={{ r: 4, strokeWidth: 8, strokeOpacity: 0.5 }}
      />
    </LineChart>
  );
};

export default AverageSession;
