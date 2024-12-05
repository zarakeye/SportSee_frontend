import React from "react";
import { BarChart, Text, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, CartesianAxis } from 'recharts';
import useFetchUserActivity from "../../hooks/useFetchUserActivity";

interface UserActivityReturn {
  name: string;
  kilogram: number;
  calories: number;
}

interface DailyActivityProps {
  userId: string
}

interface CustomTooltipProps {
  payload: {value: string}[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ payload }) => {
  if (payload && payload.length) {
    return (
      <div className="custom-tooltip bg-primary flex flex-col gap-[7px] items-center mx-[12px] my-[4px]">
        <p className="label text-quaternary h-[24px]">{`${payload[0].value}kg`}</p>
        <p className="label text-quaternary h-[24px]">{`${payload[1].value}kcal`}</p>
      </div>
    );
  }

  return null;
};

const DailyActivity: React.FC<DailyActivityProps> = ({userId}) => {
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
    <ResponsiveContainer width={835} height={320}>
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
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip content={<CustomTooltip payload={[]} />}  />
        <Legend
          iconType="circle"
          iconSize={8}
          verticalAlign="top"
          align="right"
          formatter={(value) => {
            return value === 'kilogram' ? 'Poids (kg)' : 'Calories brûlées (kCal)';
          }}
        />
        <Text x={130} y={24} fill="#000000" textAnchor="start" dominantBaseline="hanging" fontSize={15}>Activité quotidienne</Text>
        <Bar dataKey="kilogram" fill="#282D30" barSize={7} radius={[3, 3, 0, 0]} />
        <Bar dataKey="calories" fill="#E60000" barSize={7} radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DailyActivity;