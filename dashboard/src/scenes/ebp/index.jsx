import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import BundleBar from "./BundleBar";

const EBP = () => {
  
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Explore Bundle Prices"  />
      </Box>

      <Box>
        <BundleBar />
      </Box>

      {/* Note */}
      <Typography variant="body1" mt={2}>
        Note: <strong>After Bundling Option</strong> has 'Individual Revenue' which represents the revenue from ticket sales of the attraction when purchased separately, even with the bundling option offered.
        </Typography>
        <Typography variant="body1" mt={2}>
        Note: For bundling with a competitor's attraction, only information for MFLG's attraction will be displayed. 
        </Typography>
      
    </Box>  
  );
};

export default EBP;