import { Box } from "@mui/material";
import Header from "../Header";
import LineChart from "../LineChart";

const Bundle10 = () => {
  return (
    <Box m="20px">
      <Header title="Bundle: SkyHelix Sentosa & Sea Aquarium" subtitle="Revenue of Bundle" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Bundle10;
