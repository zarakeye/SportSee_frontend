import React from "react";
import { BarChart, Text, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
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

interface CustomLegendProps {
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

const CustomLegend: React.FC<CustomLegendProps> = ({payload}) => {
  return (
    <ul className="flex mt-[-155px] mr-[-50px]">
      {payload.map((item, index) => (
        <li
          key={`item-${index}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '32px'
          }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ marginRight: '10px'}}>
            <circle cx="4" cy="4" r="4" fill={index === 0 ? '#000' : '#E60000'} />
          </svg>
          <span className="text-tertiary text-[14px] font-medium">{item.value === 'kilogram' ? 'Poids (kg)' : 'Calories brûlées (kCal)'}</span>
        </li>
      ))}
    </ul>
  )
}

const DailyActivityBarPlot: React.FC<DailyActivityProps> = ({userId}) => {
  const { userActivity, loading, error } = useFetchUserActivity(userId);
  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const {sessions} = userActivity || {};
  
  console.log(sessions);
  const arrayData: UserActivityReturn[] = [];
  sessions?.forEach((session) => {
    arrayData.push({
      name: session.day,
      kilogram: session.kilogram,
      calories: session.calories,
    });
  });

  return (
    <>
      <ResponsiveContainer width="100%" height="100%" >
        <BarChart
          width={700}
          height={100}
          data={sessions}
          margin={{
            top: 112.5,
            right: 40,
            left: 43,
            bottom: 62.5,
          }}
          barGap={8}
        >
          <Text fill="#000000" textAnchor="middle" dominantBaseline="hanging" fontSize={15} fontWeight={500}>Activité quotidienne</Text>
          <CartesianGrid strokeDasharray="3 3" vertical={false}/>
          <XAxis
            dataKey="day"
            // axisLine={false}
            stroke="#9B9EAC"
            tickLine={false}
          >
            <Label
              value="Activité quotidienne"
              position="end"
              offset={-40}
              style={{
                fontSize: '15px',
                fill: '#20262E',
                fontWeight: 500,
                textAnchor: 'end',
                transform: 'translate(-225px, -210px)',
                
              }}
            />
          </XAxis>
          <YAxis
            axisLine={false}
            tickLine={false}
            tickCount={5}
            orientation="right"
          >
          </YAxis>
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
            wrapperStyle={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '50px'
            }}
            content={<CustomLegend payload={[{value: 'kilogram'}, {value: 'calories'}]}/>}
          />
          
          <Bar dataKey="kilogram" fill="#282D30" barSize={7} radius={[3, 3, 0, 0]} />
          <Bar dataKey="calories" fill="#E60000" barSize={7} radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default DailyActivityBarPlot;