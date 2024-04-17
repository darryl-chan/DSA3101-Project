import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
// import GeographyChart from "../../components/GeographyChart";
// import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
// import ProgressCircle from "../../components/ProgressCircle";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from 'react';
import axios from "axios"; // npm install axios
import { ResponsiveLine } from "@nivo/line";
// import { Link } from 'react-router-dom';


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

  // Function to round down to whole number
  const roundDown = (num) => {
    return Math.floor(num); // Use Math.floor() to round down
  };

  // Function to round to one decimal place
  const roundToOneDecimalPlace = (num) => {
    return Math.floor(num * 10) / 10; // Round to one decimal place
  };

  // Function to round to two decimal places
  const roundToTwoDecimalPlaces = (num) => {
    return num.toFixed(2); // Use toFixed(2) to round to two decimal places
  };

  // format popularityData so it can be passed into Line Chart
  const formattedPopularityData = [
    {
      id: 'customers',
      data: popularityData.map(item => ({
        x: item.name,
        y: roundDown(item.customers)
      }))
    },
  ];
  

  // creating a line chart for visitation data
  const CustomerLineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
  
    return (
      <ResponsiveLine
        data={formattedPopularityData}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.grey[100],
              },
            },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.grey[100],
              },
            },
          },
          legends: {
            text: {
              fill: colors.grey[100],
            },
          },
          tooltip: {
            container: {
              color: colors.primary[500],
            },
          },
        }}
        colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "Name of Attraction", // added
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickValues: 5, // added
          tickSize: 3,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "", // added
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={8}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    );
  };
  


  // creating headings for a ranked summary popularity rating table
  const columns = [ 
    { field: "rank", headerName: "Ranking", flex: 0.7 },
    {
      field: "name",
      headerName: "Name of Attraction",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "mflg",
      headerName: "Category",
      flex: 0.8,
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
        <Typography color={colors.greenAccent[300]}>
          {roundToOneDecimalPlace(params.row.rating)}
        </Typography>
      ),
    },
    {
      field: "pop",
      headerName: "Degree of Popularity",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[300]}>
          {params.row.pop}
        </Typography>
      ),
    },
  ];


  // creating rows for the summary rank table which returns the top 3 results by popularity rating
  const top3Rowsx = popularityData.slice().sort((a, b) => b.rating - a.rating).slice(0, 3);
  const top3Rows = top3Rowsx.map((row, rank) => ({ ...row, rank: rank + 1 }))


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
          {/* <Link to="/popularity" style={{ textDecoration: 'none' }}> */}
          <StatBox
          
            title={popularityData
              .filter(item => ["Wings of Time", "Singapore cable car", "Sky Helix Sentosa"].includes(item.name))
              .reduce((prev, current) => (prev.revenue > current.revenue) ? prev : current, {})
              .name
          }
            subtitle="MFLG's Top Rated Attraction"
            progress="1"
          />
           {/* </Link> */}
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
          {/* <Link to="/popularity" style={{ textDecoration: 'none' }}> */}
          <StatBox
          
            title={popularityData
              .filter(item => ["Wings of Time", "Singapore cable car", "Sky Helix Sentosa"].includes(item.name))
              .reduce((prev, current) => (prev.revenue > current.revenue) ? prev : current, {})
              .name
          }
            subtitle="MFLG's Top Rated Attraction"
            progress="1"
          />
           {/* </Link> */}
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
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >Average Monthly Visitation by Attraction
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                Most Visited Attraction: {` `}

                {popularityData
                  .reduce((prev, current) => (prev.customers > current.customers) ? prev : current, {})
                  .name
          }
              </Typography>
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
            <CustomerLineChart />
          </Box>
        </Box>
        

        {/* ROW 3 : top 3 ranking of attractions by popularity rating */}
        
        <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          p="40px"
        >
          <Header title={<Typography fontSize={25} fontWeight={"bold"} >Top Attractions by Popularity Rating</Typography>} />
          
          
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
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
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
