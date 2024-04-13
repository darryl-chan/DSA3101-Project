// USE 2 STATBOXES AND 2 BOXES
import { Box, Grid, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart_gbb from "../../components/LineChart_gbb";
import StatBox_gbb from "../../components/StatBox_gbb";
import BarChart_gbb from "../../components/BarChart_gbb";
import PieChart_gbb from "../../components/PieChart_gbb";
import ProgressCircle from "../../components/ProgressCircle";
import TableBundle from "../../components/TableBundle";

const GBB = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="15px">
      <Header title="Generate Best Bundle" />
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          // alignItems="center"
          justifyContent="center"
        >
          <StatBox_gbb
            title="12,361"
            subtitle="Recommended Bundle Pricing"
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          // alignItems="left"
          justifyContent="center"
        >
          <StatBox_gbb
            title="431,225"
            subtitle="Total Revenue of Bundle"
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection="column" // Align items vertically
          justifyContent="center"
          alignItems="center"
          textAlign="center" // Center-align text
          height="100%" // Ensure the Box fills the entire height of the parent
        >
          <Typography
            variant="h5" 
            sx={{ 
              color: colors.greenAccent[500],
              textAlign: "left",
              marginTop: "10px",
              marginBottom: "20px"
            }}
            mt="25px" // Add margin-top to create space between text and top of the Box
          >
            Breakdown of Total Revenue
          </Typography>
          <Box
            height="calc(100% - 48px)" // Adjust height to fit PieChart
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <PieChart_gbb />
          </Box>
        </Box>



        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="grid"
          gridTemplateRows="auto 1fr" // Divide the grid into two rows, the first row adjusts to its content, the second row takes the remaining space
          height="100%" // Ensure the Box fills the entire height of the parent
          alignItems="center"
          
        >
          {/* Text at the top */}
          <Typography
            variant="h5" 
            sx={{ 
              color: colors.greenAccent[500],
              marginTop: "10px",
              marginBottom: "20px",
              textAlign: "center"
            }}
          >
            % Change of MFLG Revenue
          </Typography>

          {/* Grid container for the number and bar chart */}
          <Box 
            display="grid" 
            gridTemplateColumns="20% 80%" 
            margin="0"
          >
            {/* Number */}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              <Typography
                variant="h5" 
                sx={{ 
                  color: colors.greenAccent[500],
                  marginTop: "5px",
                  marginBottom: "10px"
                }}
              >
                +20%
              </Typography>
            </Box>
            
            {/* Bar Chart */}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              
            >
              <BarChart_gbb isDashboard={true} />
            </Box>
          </Box>
        </Box>

      </Box>

      {/* Header for Peak Period */}
      <Box mt={5} mb={2}>
        <Typography variant="h3" component="div">
          Peak Period: [Add your peak period text here]
        </Typography>
      </Box>

      {/* Line Chart and Table */}
      <Box mt={3} mb={2}>
        <Grid container spacing={2}>
          {/* Line Chart */}
          <Grid item xs={12} md={6}>
            {/* grid item to occupy full width of container on XS screen and half the width on medium screen */}
            <Header subtitle="Best Bundle Pricing" />
            <Box height="40vh" width="100%">
              <LineChart_gbb />
            </Box>
          </Grid>
          {/* Table */}
          <Grid item xs={12} md={6}>
            <Header subtitle="Best Bundle Includes" />
            <Box height="100%" width="100%">
              <TableBundle />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default GBB;
