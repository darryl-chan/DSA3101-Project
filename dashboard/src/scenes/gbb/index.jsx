import { Box, Grid } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import TableBundle from "../../components/TableBundle";

const GBB = () => {
  return (
    <Box m="20px">
      <Header title="Generate Best Bundle" />
      <Grid container spacing={2} alignItems="stretch">
        {/* Section 1 */}
        <Grid item xs={12} sm={6} md={3}>
          <Box p={2} bgcolor="primary.light" color="primary.contrastText">
            <Header title="Total Revenue of Bundle" subtitle="Highest Revenue across all Possible Bundles" />
          </Box>
        </Grid>
        {/* Section 2 */}
        <Grid item xs={12} sm={6} md={3}>
          <Box p={2} bgcolor="secondary.light" color="secondary.contrastText">
            <Header title="MFLG Share of Revenue" />
          </Box>
        </Grid>
        {/* Section 3 */}
        <Grid item xs={12} sm={6} md={3}>
          <Box p={2} bgcolor="info.light" color="info.contrastText">
            <Header title="Percentage change of MFLG Revenue" />
          </Box>
        </Grid>
        {/* Section 4 */}
        <Grid item xs={12} sm={6} md={3}>
          <Box p={2} bgcolor="warning.light" color="warning.contrastText">
            <Header title="Revenue of attractions before bundling" />
          </Box>
        </Grid>
      </Grid>
      {/* Line Chart and Table */}
      <Box mt={5} mb={2}>
        <Grid container spacing={2}>
          {/* Line Chart */}
          <Grid item xs={12} md={6}> {/* grid item to occupy full width of container on XS screen and half the width on medium screen */}
            <Header subtitle="Best Bundle Pricing" />
            <Box height="40vh" width="100%">
              <LineChart />
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
