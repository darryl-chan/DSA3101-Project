// USE 2 STATBOXES AND 2 BOXES
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBoxGbb from "../../components/StatBoxGbb";
import BarChartGbb from "../../components/BarChartGbb";
import PieChartGbb from "../../components/PieChartGbb";
import TableBundle from "../../components/TableBundle";
import React, { useEffect, useState } from 'react';
import axios from "axios"; // Import Axios library


const GBB = () => {
  // For Bundle Price and Total Revenue
  const [GbbbundleData, setGbbBundleData] = useState({});

  // For Revenue Split
  // Name
  const [bA1Name, setbA1Name] = useState(null); //bundled_single_Singapore cable car
  const [bA2Name, setbA2Name] = useState(null); //bundled_single_Wings of Time
  
  // Rev
  const [bA1Rev, setbA1Rev] = useState(0); //bundled_single_Singapore cable car
  const [bA2Rev, setbA2Rev] = useState(0); //bundled_single_Wings of Time
  const [A1Rev, setA1Rev] = useState(0); //single_Singapore cable car
  const [A2Rev, setA2Rev] = useState(0);//single_Wings of Time
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Calculte percentage change
  const calculatePercentageChange = (initialRev, finalRev) => {
    const change = finalRev - initialRev;
    const percentageIncrease = (change / initialRev) * 100;
    return percentageIncrease;
  };
  

  const fetchGbbBundleData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/highest_bundle_revenue_mflg");
      const firstChunk = response.data[0];
      const { price, revenue } = firstChunk[Object.keys(firstChunk)[0]];
      setGbbBundleData({ price, revenue });
    } catch (error) {
      console.error('Error fetching bundle data:', error);
    }
  };
  

  useEffect(() => {
    fetchGbbBundleData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/best_bundle_revenue_split');
        const data = response.data[0]; // Assuming your API returns an array with a single object
        // Update state variables with the fetched data
        // Overall
        const bA1 = Object.keys(data)[0]
        const bA2 = Object.keys(data)[1]
        const A1 = Object.keys(data)[2]
        const A2 = Object.keys(data)[3]

        // Name
        setbA1Name(data[bA1].name);
        setbA2Name(data[bA2].name);

        // REV
        setbA1Rev(data[bA1].revenue);
        setbA2Rev(data[bA2].revenue);
        setA1Rev(data[A1].revenue);
        setA2Rev(data[A2].revenue);
        // setbA1Rev(data['bundled_single_Singapore cable car'].revenue);
        // setbA2Rev(data['bundled_single_Wings of Time'].revenue);
        // setA1Rev(data['single_Singapore cable car'].revenue);
        // setA2Rev(data['single_Wings of Time'].revenue);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); // Empty dependency array means this effect runs only once after the initial render


  return (
    <Box m="15px">
      <Header title="Generate Best Bundle" />

      {/* Header for Peak Period */}
      <Box
        display="flex"
        // justifyContent="center"
        // alignItems="center"
        mb={3} // Add margin bottom for spacing
      >
        <Typography variant="h3" component="div" fontWeight="bold">
          Current Bundle includes: {bA1Name} & {bA2Name} (Peak Period)
        </Typography>
      </Box>      

      {/* Row of Statboxes and boxes */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        mx={3}
      >
          
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          // alignItems="center"
          justifyContent="center"
        >
          {GbbbundleData.price && ( // need this so that the dashboard does not show undefined while fetching data, will only show statbox component when it is not undefined
            <StatBoxGbb
              title={`$${GbbbundleData.price?.toFixed(2)}`} // Access the price from bundleData and round to 2 decimal places
              subtitle="Recommended Bundle Pricing"
            />
          )}
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          // alignItems="left"
          justifyContent="center"
        >
          {GbbbundleData.price && (
            <StatBoxGbb
            title={`$${(GbbbundleData.revenue).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
            subtitle="Total Revenue of Bundle"
            />
          )}
        </Box>

        {/* <Box
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
              color: colors.greenAccent[300],
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
            <PieChartGbb />
          </Box>
        </Box> */}

        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection="column" // Arrange children vertically
          // alignItems="center" // Align items horizontally
          // justifyContent="center" // Center-align content vertically
        >
          {/* Original content */}
          <Box
            display="flex"
            justifyContent="center"
          >
            <StatBoxGbb
              subtitle="% Change of MFLG Revenue"
            />
          </Box>

          {/* Split the empty space into two sections */}
          <Box
            display="grid"
            gridTemplateColumns="auto auto" // Divide the grid into two col
            textAlign="center"
            pt={1} // Add padding top for spacing
            mt={-2} // Decrease margin top to reduce the gap
            mx={1.5} // Increase horizontal margin for spacing
          >
            {/* Left section */}
            <Box>
              <Typography variant="h6" mb={1}>
                {bA1Name}
              </Typography>
              {/* Calculate and display percentage increase for bA1 */}
              <Typography fontWeight="bold" sx={{ fontSize: "1.5rem" }}>
                + {calculatePercentageChange(A1Rev, bA1Rev).toFixed(2)}%
              </Typography>
            </Box>

            {/* Right section */}
            <Box>
              <Typography variant="h6" mb={1}>
                {bA2Name}
              </Typography>
              {/* Calculate and display percentage increase for bA2 */}
              <Typography fontWeight="bold" sx={{ fontSize: "1.5rem" }}>
                + {calculatePercentageChange(A2Rev, bA2Rev).toFixed(2)}%
              </Typography>
            </Box>
          </Box>
        </Box>

        
        {/* with bar chart */}
        {/* <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="grid"
          gridTemplateRows="auto 1fr" // Divide the grid into two rows, the first row adjusts to its content, the second row takes the remaining space
          height="100%" // Ensure the Box fills the entire height of the parent
          alignItems="center"
          justifyContent="center"
          textAlign="center" // Center-align text
          
        > */}
          {/* Text at the top */}
          
          {/* <Typography
            variant="h5" 
            sx={{ 
              color: colors.greenAccent[500],
              textAlign: "center",
              marginTop: "10px",
              marginBottom: "20px"
            }}
            // mt="25px" // Add margin-top to create space between text and top of the Box
            
          >
            % Change of MFLG Revenue
          </Typography> */}

          {/* Grid container for the number and bar chart */}
          {/* <Box 
            display="grid" 
            gridTemplateColumns="20% 80%" 
            margin="auto"
            width="100%"
            
          > */}
            {/* Number */}
            {/* <Box
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
            </Box> */}
            
            {/* Bar Chart */}
            {/* <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              
            >
              <BarChartGbb isDashboard={true} />
            </Box>
          </Box>
        </Box> */}

      </Box>

      


      {/* Bar Chart */}
      <Box mt={5} mb={2}>
        <Grid container spacing={2}>
          {/* Bar Chart Att 1*/}
          <Grid item xs={12} md={6}>
            {/* grid item to occupy full width of container on XS screen and half the width on medium screen */}
            <Typography
              variant="h5" 
              fontWeight="bold"
              sx={{
                color: colors.greenAccent[400]
              }} 
            >
              {bA1Name}
            </Typography>

            <Box height="40vh" width="100%">
            <BarChartGbb
              beforeBundleRevenue={A1Rev.toFixed(2)}
              afterBundleRevenue={bA1Rev.toFixed(2)}
            />
            </Box>
          </Grid>

          {/* Bar Chart Att 2*/}
          <Grid item xs={12} md={6}>
            {/* grid item to occupy full width of container on XS screen and half the width on medium screen */}
            <Typography
              variant="h5" 
              fontWeight="bold"
              sx={{
                color: colors.greenAccent[400]
              }} 
            >
              {bA2Name}
            </Typography>

            <Box height="40vh" width="100%">
            <BarChartGbb
              beforeBundleRevenue={A2Rev.toFixed(2)}
              afterBundleRevenue={bA2Rev.toFixed(2)}
            />
            </Box>
          </Grid>

          {/* Table */}
          {/* <Grid item xs={12} md={6}>
            <Typography
              variant="h5" 
              fontWeight="bold"
              sx={{
                color: colors.greenAccent[400]
              }} 
            >
              Best Bundle Includes
            </Typography>
             
            <Box height="100%" width="100%">
              <TableBundle />
            </Box>
          </Grid> */}
        </Grid>
      </Box>

      {/* Note */}
      <Typography variant="body1" mt={2}>
        Note: <strong>After Bundling Option</strong> includes revenue from the attraction when purchased in a bundle and individually
      </Typography>
    </Box>
  );
};

export default GBB;
