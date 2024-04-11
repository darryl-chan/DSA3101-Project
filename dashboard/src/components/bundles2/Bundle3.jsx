import { Box } from "@mui/material";
import Header from "../Header";
import LineChart from "../LineChart";

const Bundle3 = () => {
  return (
    <Box m="20px">
      <Header title="Bundle: Singapore Cable Car & Wings Of Time" subtitle="Revenue of Bundle" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Bundle3;
