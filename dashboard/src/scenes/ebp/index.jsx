import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

const EBP = () => {
  return (
    <Box m="20px">
      <Header title="Explore Bundle Prices" subtitle="Graph of Revenue against Price />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>n
  );
};

export default EBP;