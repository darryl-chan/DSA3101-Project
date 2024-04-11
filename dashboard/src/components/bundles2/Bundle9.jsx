import { Box } from "@mui/material";
import Header from "../Header";
import LineChart from "../LineChart";

const Bundle9 = () => {
  return (
    <Box m="20px">
      <Header title="Bundle: SkyHelix Sentosa & Wings Of Time" subtitle="Revenue of Bundle" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Bundle9;
