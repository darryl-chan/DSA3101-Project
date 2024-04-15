import { Box } from "@mui/material";
import Header from "../../components/Header";
import BundleBar from "./BundleBar";
import { ResponsiveBar } from "@nivo/bar";
import { mockLineData as data } from "../../data/mockData";
import BarChartEBP from "./BarChartEBP";
import { useState } from "react";

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