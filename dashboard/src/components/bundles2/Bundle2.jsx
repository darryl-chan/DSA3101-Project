import { Box } from "@mui/material";
import Header from "../Header";
import LineChart from "../LineChart";

const Bundle2 = () => {
  return (
    <Box m="20px">
      <Header title="Bundle: Singapore Cable Car & Central Beach Bazaar" subtitle="Revenue of Bundle" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Bundle2;
