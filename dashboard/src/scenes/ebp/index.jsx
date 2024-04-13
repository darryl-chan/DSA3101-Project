import { Box } from "@mui/material";
import Header from "../../components/Header";
import BundleBar from "./BundleBar";


const EBP = () => {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Explore Bundle Prices" subtitle="Bundle Prices" />
      </Box>

      <Box>
        <BundleBar />
        </Box>
    </Box>
  );
};

export default EBP;