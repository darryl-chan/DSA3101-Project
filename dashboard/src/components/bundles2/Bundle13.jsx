import { Box } from "@mui/material";
import Header from "../Header";
import LineChart from "../LineChart";

const Bundle13 = () => {
  return (
    <Box m="20px">
      <Header title="Bundle: SkyHelix Sentosa & iFly" subtitle="Revenue of Bundle" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Bundle13;
