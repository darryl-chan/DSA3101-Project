import { ResponsiveBar } from "@nivo/bar";

const BarChartEBP = ({ isDashboard = false }) => {
  const data = [
    { country: 'A', value1: 10, value2: 20, value3: 15 },
    { country: 'B', value1: 20, value2: 15, value3: 25 },
    { country: 'C', value1: 15, value2: 25, value3: 10 },
    { country: 'D', value1: 25, value2: 10, value3: 20 },
    { country: 'E', value1: 30, value2: 5, value3: 30 },
  ];

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <ResponsiveBar
        data={data}
        keys={['value1', 'value2', 'value3']}
        indexBy="country"
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        padding={0.3}
        colors={{ scheme: 'set1' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        groupMode="stacked"
      />
      
    </div>
  );

};

export default BarChartEBP;
