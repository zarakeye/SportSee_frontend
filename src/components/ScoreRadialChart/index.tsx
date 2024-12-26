import React from 'react';
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis, Legend } from 'recharts';

interface ScoreRadialChartProps {
  todayScore: number;
  score: number;
  width: number;
  height: number;
}

/**
 * A ScoreRadialChart component that displays a user's score in a radial bar chart format.
 * The chart is responsive and displays the score as a percentage of the user's daily goal.
 * If no score is available, the component will display a message indicating that no score is available.
 * @param {ScoreRadialChartProps} props - The properties for the component.
 * @prop {number} props.todayScore - The user's score for today.
 * @prop {number} props.score - The user's overall score.
 * @prop {number} props.width - The width of the component.
 * @prop {number} props.height - The height of the component.
 * @returns {JSX.Element} A radial bar chart wrapped in a responsive container.
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

  const InnerCircleDiameter = Math.min(width * 60 / 100 - 25);

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
          startAngle={210}
          endAngle={-60}
          
        >
          <Legend
            verticalAlign="top"
            align="left"
            content={() => {
              return (
                <div style={{
                  position: 'relative',
                  color: '#000',
                  fontSize: '15px',
                  fontWeight: 500,
                  lineHeight: '20px',
                  width: '39px',
                  height: '24x',
                  lineHeightStep: '24px',
                  transform: 'translate(30px, 24px)',
                }}>
                  <p>Score</p>
                  <p style={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFF',
                    width: InnerCircleDiameter,
                    height: InnerCircleDiameter,
                    top: '36px',
                    left: '30px',
                    lineHeight: '26px',
                    borderRadius: '50%',
                    paddingLeft: '10px',
                    paddingRight: '10px',
                  }}
                  >
                    <p style={{color: 'black', fontSize: '26px', fontWeight: 700}}>{scoreValue}%</p>
                    <p style={{color: '#74798C', fontSize: '16px', fontWeight: 500, textAlign: 'center'}}> de votre objectif</p>
                  </p>
                </div>
              );
            }}
          />
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
    </div>
  )
}

export default ScoreRadialChart