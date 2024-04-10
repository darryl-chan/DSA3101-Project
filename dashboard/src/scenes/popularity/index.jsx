import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataInvoices } from "../../data/mockData";
import { mockDataPopularity } from "../../data/mockData";

import Header from "../../components/Header";

const Popularity = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name of Attraction",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Popularity Rating",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Degree of Popularity",
      flex: 1,
      
    },
    {
      field: "customers",
      headerName: "Estimated Number of Customers",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.customers}/yr
        </Typography>
      ),
      
    },
    {
      field: "revenue",
      headerName: "Estimated Revenue",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.revenue}/yr
        </Typography>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="POPULARITY ANALYSIS" subtitle="List of popularity rankings" />
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
        <DataGrid checkboxSelection rows={mockDataPopularity} columns={columns} />
      </Box>
    </Box>
  );
};

export default Popularity;