import { Box } from "@mui/material";
import Header from "../Header";
import LineChart from "../LineChart";

const Bundle17 = () => {
  return (
    <Box m="20px">
      <Header title="Bundle: Central Beach Bazaar & Singapore Flyer" subtitle="Revenue of Bundle" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Bundle17;
