import React from 'react';
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

interface ScoreRadialChartProps {
  todayScore: number;
  score: number;
  width: number;
  height: number;
}

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
          startAngle={90}
          endAngle={-270}
          
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