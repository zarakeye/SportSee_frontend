import { ResponsiveContainer } from "recharts";

interface ChartResponsiveContainerProps {
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  children: React.ReactElement;
}

const ChartResponsiveContainer: React.FC<ChartResponsiveContainerProps> = ({ children }) => {
  return (
    <ResponsiveContainer width="100%" height="100%" >
      {children}
    </ResponsiveContainer>
  );
};

export default ChartResponsiveContainer;