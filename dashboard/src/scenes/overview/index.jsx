import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from 'react';
import axios from "axios"; // npm install axios
import { ResponsivePie } from "@nivo/pie";
import { Link } from 'react-router-dom';


const Overview = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Define state to store fetched data
  const [popularityData, setPopularityData] = useState([]);
  const [loading, setLoading] = useState(true);


  // Function to fetch data from Flask backend
  const fetchPopularityData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/popularity"); // Make GET request to Flask route
      const formattedData = response.data.map((row, index) => ({
        ...row,
        id: index + 1,
      }));
      setPopularityData(formattedData); // Update state with fetched data
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchPopularityData();
  }, []);

  // Function to round to one decimal place
  const roundToOneDecimalPlace = (num) => {
    return Math.floor(num * 10) / 10; // Round to one decimal place
  };

  // format popularityData so it can be passed into Line Chart
  const formattedPopularityData = [
    {id: 'Very Low', value: 1}, // sky helix
    {id: 'Medium', value: 1}, // cable
    {id: 'High', value: 1}, // wings of time
  ]

  const sliceColors = ['#ffa080', '#ffdf80', '#a5d46a']

  
  const CustomerPieChart = () => (
    <ResponsivePie
      data={formattedPopularityData}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={sliceColors}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          translateY: 56,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          symbolSize: 18,
          symbolShape: 'circle',
          effects: []
        }
      ]}
      //animate = {false}
    />
  );


  // creating headings for a ranked summary popularity rating table
  const columns = [ 
    { field: "rank", headerName: "Rank", flex: 0.1 },
    {
      field: "name",
      headerName: "Name of Attraction",
      flex: 0.9,
      cellClassName: "name-column--cell",
    },
    {
      field: "mflg",
      headerName: "Category",
      flex: 0.7,
      valueGetter: (params) => {
        // Check if name matches certain set of names
        if (params.row.name === "Wings of Time" || params.row.name === "Singapore cable car"|| params.row.name === "Sky Helix Sentosa") {
          return "MFLG";
        } else {
          return "Competitor";
        }
      },
      //renderCell: (params) => (<span>{params.row.mflg ? 'MFLG' : 'Competitor'}</span>),
    },
    {
      field: "rating",
      headerName: "Popularity Rating",
      flex: 0.9,
      renderCell: (params) => (
        <Typography 
        color={
          params.row.pop === "Very Low"
            ? colors.redAccent[500] // Set color to red for "Very Low"
            : params.row.pop === "Very High"
            ? colors.greenAccent[300] // Set color to green for "Very high"
            : colors.grey[100] // Default color for other values
        }>
          {roundToOneDecimalPlace(params.row.rating)}
        </Typography>
      ),
    },
    {
      field: "pop",
      headerName: "Degree of Popularity",
      flex: 1,
      renderCell: (params) => (
        <Typography 
        color={
          params.row.pop === "Very Low"
            ? colors.redAccent[500] // Set color to red for "Very Low"
            : params.row.pop === "Very High"
            ? colors.greenAccent[300] // Set color to green for "Very high"
            : colors.grey[100] // Default color for other values
        }>
          {params.row.pop}
        </Typography>
      ),
    },
  ];


  // creating rows for the summary rank table which returns the top 3 results by popularity rating
  const top3Rowsx = popularityData.slice().sort((a, b) => b.rating - a.rating).slice(0, 3);
  const top3Rows = top3Rowsx.map((row, rank) => ({ ...row, rank: rank + 1 }))

  // Render loading state if data is still loading
  if (loading) {
    return <div>Loading...</div>;
  }
  // outlining the page
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="MFLG DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >

        {/* ROW 1 : top rated attractions of MFLG and competitor respectively*/}
        
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
          
            title={popularityData
              .filter(item => ["Wings of Time", "Singapore cable car", "Sky Helix Sentosa"].includes(item.name))
              .reduce((prev, current) => (prev.revenue > current.revenue) ? prev : current, {})
              .name
          }
            subtitle="MFLG's Top Rated Attraction"
            progress="1"
            sx={{ color: 'ffffff'}}
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={popularityData
              .filter(item => !["Wings of Time", "Singapore cable car", "Sky Helix Sentosa"].includes(item.name))
              .reduce((prev, current) => (prev.revenue > current.revenue) ? prev : current, {})
              .name
            }
            subtitle="Competitor's Top Rated Attraction"
            progress="1"
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
          
            title= "Singapore cable car + Wings of Time"
            subtitle="Best Recommended Bundle"
            progress="1"
          />
        </Box>

        {/* ROW 2 : weekly visitation and peak vs non-peak revenue */}
        
        <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Link to="/popularity" style={{ textDecoration: 'none', color: colors.grey[100]}}>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color={colors.grey[100]}
                >Degree of Popularity of MFLG Attractions
                </Typography>
              </Link>
              
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="400px" m="-20px 0 0 0">
            <CustomerPieChart />
          </Box>
        </Box>
        

        {/* top 3 ranking of attractions by popularity rating */}
        
        <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          p="40px"
        >
          <Header 
            title={
              <Link to="/popularity" style={{ textDecoration: 'none', color: colors.grey[100]}}>
                  <Typography fontSize={25} fontWeight={"bold"} >
                      Top Attractions by Popularity Rating
                  </Typography>
              </Link>} />
          
          
          <DataGrid rows={top3Rows} columns={columns} 
          autoHeight={true}
          hideFooter={true}
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {},

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
          />
  
          
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
            
          >
        
           
          </Box>
        </Box>
        

      </Box>
    </Box>

  );
};

export default Overview;
