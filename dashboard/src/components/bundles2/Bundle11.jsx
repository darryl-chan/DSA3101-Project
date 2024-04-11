import { Box } from "@mui/material";
import Header from "../Header";
import LineChart from "../LineChart";

const Bundle11 = () => {
  return (
    <Box m="20px">
      <Header title="Bundle: SkyHelix Sentosa & Adventure Cove" subtitle="Revenue of Bundle" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Bundle11;
