import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataPopularity } from "../../data/mockData";
import Header from "../../components/Header";
import axios from "axios"; // Import Axios library


const Popularity = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Define state to store fetched data
  const [popularityData, setPopularityData] = useState([]);

  // Function to fetch data from Flask backend
  const fetchPopularityData = async () => {
    try {
      const response = await axios.get("/popularity"); // Make GET request to Flask route
      setPopularityData(response.data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchPopularityData();
  }, []);
  
  const columns = [    
    {
      field: "name",
      headerName: "Name of Attraction",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "category",
      headerName: "Category",
      flex: 0.8,
    },
        {
      field: "revenue",
      headerName: "Monthly Revenue Estimate ($/month)",
      flex: 1.2,
    },
    {
      field: "customers",
      headerName: "Monthly Customer Estimate",
      flex: 1,      
    },
    {
      field: "rating",
      headerName: "Popularity Rating",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[300]}>
          {params.row.rating}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Degree of Popularity",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[300]}>
          {params.row.status}
        </Typography>
      ),
    },
  ];

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
      >
        {/* <DataGrid checkboxSelection rows={mockDataPopularity} columns={columns} /> */}
        <DataGrid checkboxSelection rows={popularityData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Popularity;