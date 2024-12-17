import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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

/**
 * CustomTooltip is a functional component that renders a tooltip
 * for the bar chart displaying daily activity. It shows the 
 * kilogram and calorie values for a specific data point.
 *
 * Props:
 * - payload: An array containing objects with the value field, 
 *   which represents the data to be displayed in the tooltip.
 *
 * Returns a styled tooltip div with the kilogram and calorie values
 * if payload is not empty; otherwise, returns null.
 */
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

/**
 * DailyActivityBarPlot is a functional component that renders a bar chart
 * for the daily activity of a user. It takes the user ID as a prop, fetches
 * the user activity data, and renders the chart with the data.
 *
 * Props:
 * - userId: The ID of the user whose activity data is to be fetched.
 *
 * The chart has a tooltip that displays the kilogram and calorie values for
 * the day the user hovers over. The chart also has a legend that displays
 * the labels for the two bars, with a black circle for "Poids (kg)" and a
 * red circle for "Calories brûlées (kCal)".
 */
const DailyActivityBarPlot: React.FC<DailyActivityProps> = ({userId}) => {
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

/**
 * CustomLegend is a functional component that renders a custom legend
 * for the daily activity bar plot. It takes the payload as a prop, which
 * contains the legend items to be displayed.
 *
 * The component maps over the payload and renders each item as a list element
 * with a corresponding colored circle and label. The first item has a black 
 * circle and represents "Poids (kg)" while the second item has a red circle 
 * and represents "Calories brûlées (kCal)".
 *
 * Props:
 * - payload: An array of objects with a value property, representing the legend items.
 */
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

  return (
    <>
      <ResponsiveContainer  >
        <BarChart
          width={700}
          height={145}
          data={sessions}
          margin={{
            top: 112.5,
            right: 40,
            left: 43,
            bottom: 62.5,
          }}
          barGap={8}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            dataKey="day"
            domain={[sessions[0].day, sessions[sessions.length - 1].day]}
            stroke="#9B9EAC"
            tickLine={false}
            tickMargin={15.5}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickCount={3}
            tickMargin={43}
            orientation="right"
            style={{
              padding: '112.5px 90px 62.5px 43px'
            }}
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
      <h2 className="absolute top-[24px] left-[32px] right-0 bottom-0 bg-black z-20">Activité quotidienne</h2>
    </>
  );
};

export default DailyActivityBarPlot;