import React from 'react';
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

interface ScoreRadialChartProps {
  todayScore: number;
  score: number;
  width: number;
  height: number;
}

/**
 * ScoreRadialChart is a functional component that renders a radial bar chart
 * representing the score of a user. It takes the score or today's score as a 
 * percentage of the total 100%, along with width and height for the chart dimensions.
 * 
 * Props:
 * - score: The user's score, represented as a number between 0 and 1. 
 * - todayScore: If score is unavailable, today's score can be used.
 * - width: The width of the chart.
 * - height: The height of the chart.
 * 
 * The component computes the score value in percentage and displays it in a radial 
 * chart. If no score is available, it renders a message indicating the absence of a score.
 * The chart has an inner circle to display the score percentage and a label indicating 
 * the user's progress towards their goal.
 */

const ScoreRadialChart: React.FC<ScoreRadialChartProps> = ({score, todayScore, width, height}) => {
  const scoreValue = score !== undefined ? score * 100 : todayScore !== undefined ? todayScore * 100 : 0;

  const chartData = [
    { name: 'Score',
      value: scoreValue,
      fullMark: 100,
    },
  ];

  if (scoreValue === 0) {
    return (
      <div className='flex flex-col justify-center items-center'>
        No score available
      </div>
    )
  }

  const InnerCircleDiameter = Math.min(width * 60 / 100 - 15);

  return (
    <div className={`relative flex flex-col justify-center items-center w-[${width}px] h-[${height}px]`}>
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="100%"
          barSize={10}
          data={chartData}
          startAngle={120}
          endAngle={-240}
          
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
            tickLine={false}
          />
          <RadialBar
            min={-15}
            background={{ fill: '#FBFBFB' }}
            dataKey="value"
            cornerRadius="10%"
            fill='#E60000'
          />
        </RadialBarChart>
      </ResponsiveContainer>

      <div style={{width: InnerCircleDiameter, height: InnerCircleDiameter}} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FFF] rounded-full flex justify-center items-center`}>
        <p className="text-[16px] text-tertiary font-medium w-[95px] text-center">
          <span className='text-secondary text-[26px] text-center font-bold'>{Math.round(scoreValue)}%</span>
          <br/>
          de votre objectif
        </p>
      </div>
      <h2 className='absolute top-[24px] left-[30px] textt-[15px] font-medium'>Score</h2>
    </div>
  )
}

export default ScoreRadialChart