
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";
import useFetchAverageSessions from "../../hooks/useFetchAverageSessions";
import { CategoricalChartState } from "recharts/types/chart/types";
import { Legend } from "recharts";

interface AverageSessionProps {
  userId: string;
  width: number;
  height: number;
  backgroundColor: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    value: number;
  }[] | null;
  label?: string;
}

interface CustomTickProps {
  x: number;
  y: number;
  payload: {
    value: number;
  };
  index?: number;
  visibleTickCount?: number;
}

/**
 * Displays a line chart of a user's average session lengths over the days of the week.
 * The chart is responsive and will resize based on the width and height provided.
 * The chart is also interactive, with a tooltip that displays the average session length
 * for the day hovered over. A legend is also displayed that shows the average session length
 * for the week.
 *
 * @param {{userId: string, width: number, height: number, backgroundColor: string}} props
 * The properties for the component.
 * @prop {string} userId The id of the user to display the chart for.
 * @prop {number} width The width of the chart.
 * @prop {number} height The height of the chart.
 * @prop {string} backgroundColor The background color of the chart.
 */
const AverageSessionLineChart: React.FC<AverageSessionProps> = ({userId, width, height, backgroundColor}) => {
  const { userAverageSessions, loading, error } = useFetchAverageSessions(userId);
  const [activeDay, setActiveDay] = useState<number | null>(null);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const {sessions} = userAverageSessions || {};


  /**
   * A custom tooltip component that displays the average session length for the day hovered over.
   * The tooltip is only displayed when the user hovers over a bar in the line chart.
   * The tooltip displays the average session length in minutes with a precision of one decimal place.
   * @param {{ active: boolean, payload: {value: number}[] | null }} props The properties for the component.
   * @prop {boolean} active Whether the tooltip is currently active.
   * @prop {{value: number}[] | null} payload The data associated with the currently hovered over bar.
   * If the payload is null, the tooltip will not be displayed.
   * @returns {React.ReactElement} The custom tooltip element.
   */
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

  /**
   * Set the active day in the state when the user moves the mouse over a line chart bar.
   * The active day is set to the day of the week that corresponds to the bar's day.
   * @param {{ activePayload?: { payload: { day: number } } }} e The line chart mouse move event.
   */
  const handleMouseMove = (e: CategoricalChartState) => {
    if (e && e.activePayload) {
      const { day } = e.activePayload[0].payload;
      setActiveDay(day - 1);
    }
  };

  /**
   * Set the active day to null when the user moves the mouse out of the line chart.
   * This is used to reset the active day when the user is not hovering over the chart.
   */
  const handleMouseLeave = () => {
    setActiveDay(null);
  };

/**
 * A custom tick component for rendering day labels on the X-axis of the line chart.
 * Calculates the horizontal position for uniform spacing between labels.
 *
 * @param {CustomTickProps} props The properties for the custom tick component.
 * @prop {number} props.y The y-coordinate for positioning the tick label.
 * @prop {Object} props.payload The payload containing data for the tick, including the value.
 * @prop {number} props.payload.value The numerical value for determining the label.
 * @prop {number} [props.index] The index of the tick, used to calculate horizontal spacing.
 * @returns {React.ReactElement} The SVG element for the custom tick label.
 */
  const CustomTick: React.FC<CustomTickProps> = (props: CustomTickProps) => {
    const { y, payload, index } = props;
    const value = payload.value;
    const label = value >= 0 && value <= 7 ? dayLabels[Math.floor(value - 1)] || '' : '';
    
    // Calculer la position horizontale pour un espacement uniforme
    const totalWidth = 258 - 14 * 2;
    const spacing = totalWidth / 6; // Largeur totale divisée par (nombre de labels - 1)
    const adjustedX = (index || 0) * spacing;

    return (
      <g transform={`translate(${adjustedX + 14},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="middle"
          fill="#FFFFFF"
          fillOpacity={0.5}
          fontSize={12}
        >
          {label}
        </text>
      </g>
    );
  };

  return (
    <div className={`relative col-span-1 row-start-3 row-span-2 flex flex-col bg-[${backgroundColor}] justify-center items-center rounded-[5px] w-[${width}px] h-[${height}px] `}>
      <ResponsiveContainer
        width="100%"
        height={260}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: "5px"
        }}
      >
        <LineChart
          data={sessions}
          margin={{
            top: 80,
            right: 0,
            left: 0,
            bottom: 5,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#000" stopOpacity={0}/>
              <stop offset="100%" stopColor="#000" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FF6666"/>
              <stop offset="100%" stopColor="#FFFFFF"/>
            </linearGradient>
          </defs>
          <Legend
            verticalAlign="top"
            align="left"
            content={() => {
              return (
                <div style={{
                  color: '#FFFFFF',
                  fontSize: '15px',
                  fontWeight: 500,
                  opacity: 0.5,
                  lineHeight: '20px',
                  width: '147px',
                  height: '57px',
                  transform: 'translate(34px, -55px)',
                }}>
                  Durée moyenne des<br/>
                  sessions
                </div>
              );
            }}
          />
          <CartesianGrid
            strokeDasharray="3 3"
            fill="#E60000"
            vertical={false}
            horizontal={false}
          />
          <XAxis
            axisLine={false}
            dataKey="day"
            tickFormatter={(value) => {
              if (value < 0 || value > 7) return '';
              return dayLabels[Math.floor(value - 1)] || '';
            }}
            tick={<CustomTick x={0} y={0} payload={{
              value: 0
            }} />}
            tickLine={false}
            tickMargin={0}
            domain={[0, 7]}
            interval={0}
            scale="point"
          />
          <YAxis
            hide={true}
            orientation="right"
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="url(#lineGradient)"
            dot={false}
            activeDot={{
              r: 4,
              strokeWidth: 8,
              strokeOpacity: 0.5,
            }}
            strokeWidth={2}
            connectNulls={true}
          />
          {activeDay !== null && (
            <ReferenceArea
              x1={activeDay + 1}
              x2={7}
              y1={-80}
              y2={265}
              fill="#000"
              fillOpacity={.1}
              ifOverflow="visible"
            />
          )}

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AverageSessionLineChart;
