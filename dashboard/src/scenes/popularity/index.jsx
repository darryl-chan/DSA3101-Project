import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios"; // Import Axios library


const Popularity = () => {
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

  // Define columns of table
  const columns = [    
    {
      field: "name",
      headerName: "Name of Attraction",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      valueGetter: (params) => {
        // Check if name matches certain set of names
        if (params.row.name === "Wings of Time" || params.row.name === "Singapore cable car"|| params.row.name === "Sky Helix Sentosa") {
          return "MFLG";
        } else {
          return "Competitor";
        }
      },
    },
    {
      field: "revenue",
      headerName: "Monthly Revenue Estimate ($/month)",
      flex: 1.2,
      renderCell: (params) => (
        <Typography>
          {roundToTwoDecimalPlaces(params.row.revenue)}
        </Typography>
      ),
    },
    {
      field: "customers",
      headerName: "Monthly Customer Estimate",
      flex: 1,
      renderCell: (params) => (
        <Typography>
          {roundDown(params.row.customers)}
        </Typography>
      ),      
    },
    {
      field: "rating",
      headerName: "Popularity Rating",
      flex: 1,
      renderCell: (params) => (
        <Typography
        color={
          params.row.pop === "Very Low"
            ? colors.redAccent[500] // Set color to red for "Very Low"
            : params.row.pop === "Very high"
            ? colors.greenAccent[300] // Set color to green for "Very high"
            : colors.grey[100] // Default color for other values
        }
      >
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
            : params.row.pop === "Very high"
            ? colors.greenAccent[300] // Set color to green for "Very High"
            : colors.grey[100] // Default color for other values
        }
      >
        {params.row.pop}
      </Typography>
      ),
    },
  ];

  // Render loading state if data is still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box m="20px">
      <Header title="POPULARITY ANALYSIS" subtitle={<Typography color={colors.greenAccent[100]}>Table of attractions</Typography>} />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
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
            color: `${colors.blueAccent[700]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={popularityData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Popularity;