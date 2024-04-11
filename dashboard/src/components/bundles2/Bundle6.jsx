import { Box } from "@mui/material";
import Header from "../Header";
import LineChart from "../LineChart";

const Bundle6 = () => {
  return (
    <Box m="20px">
      <Header title="Bundle: Singapore Cable Car & Singapore Flyer" subtitle="Revenue of Bundle" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Bundle6;
