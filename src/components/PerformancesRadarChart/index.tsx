import React from "react";
import useFetchUserPerformance from "../../hooks/useFetchUserPerformance";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { PerformanceType } from "../../services/api.types";

interface UserPerformancesReturn {
  value: number;
  kind: PerformanceType;
}

interface PerformancesRadarChartProps {
  userId: string;
}

/**
 * Displays a radar chart representing a user's performance metrics.
 * The chart is responsive and visualizes various performance types such as cardio,
 * energy, endurance, strength, speed, and intensity in a radar chart format.
 *
 * @param {PerformancesRadarChartProps} props - The properties for the component.
 * @prop {string} props.userId - The ID of the user whose performance data is to be displayed.
 * 
 * @returns {JSX.Element} A radar chart wrapped in a responsive container.
 * Displays a loading indicator when data is being fetched and an error message if there is any error.
 */
const PerformancesRadarChart: React.FC<PerformancesRadarChartProps> = ({ userId }) => {
  const { userPerformance, loading, error } = useFetchUserPerformance(userId);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const { data } = userPerformance || {};
  const arrayData: UserPerformancesReturn[] = [];
  data?.forEach((performance) => {
    arrayData.push({
      value: performance.value,
      kind: performance.kind === 1 ? 'cardio' : performance.kind === 2 ? 'energy' : performance.kind === 3 ? 'endurance' : performance.kind === 4 ? 'strength' : performance.kind === 5 ? 'speed' : 'intensity',
    });
  });

  const performanceTypesTranslations_Fr: { [key: string]: string } = {
    'cardio': 'Cardio',
    'energy': 'Énergie',
    'endurance': 'Endurance',
    'strength': 'Force',
    'speed': 'Vitesse',
    'intensity': 'Intensité'
  };
 
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <RadarChart
        cx="50%"
        cy="50%"
        outerRadius= "60%"
        data={arrayData}
        style={{
          backgroundColor: '#282D30',
          width: '100%',
          height: '95%'
        }}
      >
        <PolarGrid
          fill="#000"
          stroke="#fff"
          radialLines={false}
          
        />
        <PolarAngleAxis
          dataKey="kind"
          tickFormatter={(value => performanceTypesTranslations_Fr[value])}
          stroke="#fff"
          fontSize="12px"
          tickLine={false}
          transform="translateY(10px)"
        />
        <Radar
          name="Performance"
          dataKey="value"
          fill="#F00"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default PerformancesRadarChart;