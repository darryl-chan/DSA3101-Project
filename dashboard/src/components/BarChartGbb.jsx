import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const BarChartGbb = ({ beforeBundleRevenue, afterBundleRevenue }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const pastelColors = ["#9cadce", "#ffefd3"];

  // Define data for the bar chart
  const data = [
    {
      category: "Before Bundling Option",
      revenue: beforeBundleRevenue,
    },
    {
      category: "After Bundling Option",
      revenue: afterBundleRevenue,
    },
  ];

  return (
    <ResponsiveBar
      data={data}
      keys={["revenue"]}
      indexBy="category"
      colors={pastelColors}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
      }}
      margin={{ top: 50, right: 80, bottom: 50, left: 80 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Revenue (units of $100,000)", // Add y-axis label
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={true} // switch to true to see the labels directly on barchart
      labelSkipWidth={12}
      labelSkipHeight={12}
      label={(label) => `$${(label.value * 100000).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} // Format label to 2 decimal places
      // labelTextColor={{
      //   from: "color",
      //   modifiers: [["darker", 2]],
      // }}

      // for the popup when hovering around the barchart
      tooltip={(tooltip) => (
        <div style={{ color: colors.grey[400], background: 'white', borderRadius: '8px', padding: '4px', margin: '4px' }}>
          {tooltip.data.category}: ${(tooltip.data.revenue * 100000).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
        </div>
      )}
    />
  );
};

export default BarChartGbb;
