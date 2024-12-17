import React from "react";
import { BarChart, Text, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useFetchUserActivity from "../../hooks/useFetchUserActivity";

interface UserActivityReturn {
  name: string;
  kilogram: number;
  calories: number;
}

interface DailyActivityProps {
  userId: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
}

interface CustomTooltipProps {
  payload: {value: string}[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ payload }) => {
  if (payload && payload.length) {
    return (
      <div className="custom-tooltip bg-primary flex flex-col gap-[7px] justify-around items-center text-[8px] gap[7px] font-medium w-[39px] h-[63px] mx-[12px] my-[4px] py-[4px]">
        <p className="label text-quaternary h-[24px]">{`${payload[0].value}kg`}</p>
        <p className="label text-quaternary h-[24px]">{`${payload[1].value}kcal`}</p>
      </div>
    );
  }

  return null;
};

const DailyActivityBarPlot: React.FC<DailyActivityProps> = ({userId, width, height, backgroundColor}) => {
  const { userActivity, loading, error } = useFetchUserActivity(userId);
  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const {data} = userActivity || {};
  
  const sessions = data?.sessions as { day: string; kilogram: number; calories: number }[];
  console.log(sessions);
  const arrayData: UserActivityReturn[] = [];
  sessions.forEach((session) => {
    arrayData.push({
      name: session.day,
      kilogram: session.kilogram,
      calories: session.calories,
    });
  });

  return (
    // <div className={`relative col-span-1 row-start-3 row-span-2 flex flex-col bg-[${backgroundColor}] justify-center items-center rounded-[5px] w-[${width}px] h-[${height}px] `}>
      <ResponsiveContainer width="100%" height="100%" >
        <BarChart
          width={700}
          height={145}
          data={sessions}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barGap={8}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false}/>
          <XAxis
            dataKey="day"
            // axisLine={false}
            stroke="#9B9EAC"
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickCount={5}
            orientation="right"
          />
          <Tooltip content={<CustomTooltip payload={[]} />}  />
          <Legend
            iconType="circle"
            iconSize={8}
            verticalAlign="top"
            align="right"
            formatter={(value) => {
              return value === 'kilogram' ? 'Poids (kg)' : 'Calories brûlées (kCal)';
            }}
            markerHeight={10}
            wrapperStyle={{ marginRight: 32 }}
          />
          <Text x={130} y={24} fill="#000000" textAnchor="start" dominantBaseline="hanging" fontSize={15}>Activité quotidienne</Text>
          <Bar dataKey="kilogram" fill="#282D30" barSize={7} radius={[3, 3, 0, 0]} />
          <Bar dataKey="calories" fill="#E60000" barSize={7} radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    // </div>
  );
};

export default DailyActivityBarPlot;