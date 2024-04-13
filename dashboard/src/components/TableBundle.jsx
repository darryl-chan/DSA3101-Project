import React from "react";
// import { Box, Typography, useTheme } from "@mui/material";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
// import Header from "../components/Header";

const TableBundle = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Define columns for the DataGrid
  const columns = [
    { field: "id", headerName: "No.", width: 20 },
    { field: "attraction", headerName: "Attraction", flex: 1 },
    { field: "company", headerName: "Company", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Box
        m="40px 0 0 0"
        height="40vh"
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
          // "& .MuiDataGrid-footerContainer": {
          //   borderTop: "none",
          //   backgroundColor: colors.blueAccent[700],
          // },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        {/* Render DataGrid with empty rows */}
        <DataGrid
          checkboxSelection
          rows={[]}
          columns={columns}
          pagination={false} // Disable pagination since one page is sufficient
          autoPageSize // Automatically adjust height based on content
          hideFooterPagination // Hide pagination footer
        />
      </Box>
    </Box>
  );
};

export default TableBundle;
