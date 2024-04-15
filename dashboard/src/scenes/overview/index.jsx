import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
// import GeographyChart from "../../components/GeographyChart";
// import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
// import ProgressCircle from "../../components/ProgressCircle";
import { mockDataPopularity } from "../../data/mockData";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from 'react';
import axios from "axios"; // npm install axios
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
      flex: 0.6,
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
      field: "revenue",
      headerName: "Monthly Revenue Estimate ($/month)",
      flex: 1.4,
      renderCell: (params) => (
        <Typography>
          {roundToTwoDecimalPlaces(params.row.revenue)}
        </Typography>
      ),
    },
    {
      field: "customers",
      headerName: "Monthly Customer Estimate",
      flex: 1.1,      
      renderCell: (params) => (
        <Typography>
          {roundDown(params.row.customers)}
        </Typography>
      ),  
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
  

  // finding the MFLG attraction with highest revenue

  const HighestRevenueOfMflg = () => {
  
    const filteredData = popularityData.filter(entry => entry.mflg);

    const entryWithHighestRevenue = filteredData.reduce((prev, current) => {
      return (prev.revenue > current.revenue) ? prev : current;
    });

    return (
      <div>
        <h1>Name with the Highest Revenue (mflg=true)</h1>
        <p>{entryWithHighestRevenue.name}</p>
      </div>
    );
  };


  // finding the competitor attraction with highest revenue

  const HighestRevenueOfComp = () => {

    const filteredData = popularityData.filter(entry => !entry.mflg);
  
    const entryWithHighestRevenue = filteredData.reduce((prev, current) => {
      return (prev.revenue > current.revenue) ? prev : current;
    });
  
    return (
      <div>
        <h1>Name with the Highest Revenue (mflg=false)</h1>
        <p>{entryWithHighestRevenue.name}</p>
      </div>
    );
  };


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
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {/* <Link to="/popularity" style={{ textDecoration: 'none' }}> */}
          <StatBox
            // title={popularityData.filter(item => item.mflg === true).reduce((prev, current) => (prev.revenue > current.revenue) ? prev : current, {}).name}
            title={popularityData
              .filter(item => item.mflg === true) // Filter MFLG attractions based on category
              .reduce((prev, current) => (prev.revenue > current.revenue) ? prev : current, {}).name // Get attraction name with highest revenue
            }
            subtitle="MFLG's Top Rated Attraction"
            progress="1"
          />
           {/* </Link> */}
        </Box>
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={popularityData
              .filter(item => item.mflg === false)
              .reduce((prev, current) => (prev.revenue > current.revenue) ? prev : current, {})
              .name
            }
            subtitle="Competitor's Top Rated Attraction"
            progress="1"
          />
        </Box>

        {/* ROW 2 : weekly visitation and peak vs non-peak revenue */}
        
        <Box
          gridColumn="span 6"
          gridRow="span 2"
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
              >Average Weekly Visitation by Attraction
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                Weekly Average: 59,342 visitors
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
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Increase in Revenue during Peak vs Non-Peak Hours
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>
        

        {/* ROW 3 : top 3 ranking of attractions by popularity rating */}
        
        <Box
          gridColumn="span 12"
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
