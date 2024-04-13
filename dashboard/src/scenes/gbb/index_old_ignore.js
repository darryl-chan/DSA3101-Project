
// STILL USING 4 STATBOXES
// import { Box, Grid, Button, IconButton, Typography, useTheme } from "@mui/material";
// import { tokens } from "../../theme";
// import { mockTransactions } from "../../data/mockData";
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import EmailIcon from "@mui/icons-material/Email";
// import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import TrafficIcon from "@mui/icons-material/Traffic";
// import Header from "../../components/Header";
// import LineChart from "../../components/LineChart";
// import StatBox from "../../components/StatBox";
// import BarChart from "../../components/BarChart";
// import PieChart from "../../components/PieChart";
// import ProgressCircle from "../../components/ProgressCircle";
// import TableBundle from "../../components/TableBundle";

// const GBB = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   return (
//     <Box m="15px">
//       <Header title="Generate Best Bundle" />
//       <Box
//         display="grid"
//         gridTemplateColumns="repeat(12, 1fr)"
//         gridAutoRows="140px"
//         gap="20px"
//       >
//         {/* ROW 1 */}
//         <Box
//           gridColumn="span 3"
//           backgroundColor={colors.primary[400]}
//           display="flex"
//           // alignItems="center"
//           justifyContent="center"
//         >
//           <StatBox
//             title="12,361"
//             subtitle="Recommended Bundle Pricing"
          
//           />
//         </Box>
//         <Box
//           gridColumn="span 3"
//           backgroundColor={colors.primary[400]}
//           display="flex"
//           // alignItems="left"
//           justifyContent="center"
//         >
//           <StatBox
//             title="431,225"
//             subtitle="Total Revenue of Bundle"
//           />
//         </Box>
//         <Box
//           gridColumn="span 3"
//           backgroundColor={colors.primary[400]}
//           display="flex"
//           // alignItems="center"
//           justifyContent="space-between"
//         >
//           <StatBox
//             subtitle="Breakdown of Total Revenue"
//             progress="0.75"
//           >
//             {/* Use flexGrow to allow the PieChart to take up remaining space */}
//             {/* <Box flexGrow={1}> 
//               hi = < PieChart />
//             </Box> */}
//           </StatBox> 

//         </Box>
//         <Box
//           gridColumn="span 3"
//           backgroundColor={colors.primary[400]}
//           display="flex"
//           // alignItems="center"
//           justifyContent="space-between"
//         >
//           <StatBox
//             subtitle="Change (%) in MFLG Revenue"
//           >
//             <Typography variant="h4" fontSize = "30px" fontWeight="bold"> +20% </Typography>
//             <BarChart />

//           </StatBox>
          
//         </Box>
//       </Box>

//       {/* Header for Peak Period */}
//       <Box mt={5} mb={2}>
//         <Typography variant="h3" component="div">
//           Peak Period: [Add your peak period text here]
//         </Typography>
//       </Box>

//       {/* Line Chart and Table */}
//       <Box mt={3} mb={2}>
//         <Grid container spacing={2}>
//           {/* Line Chart */}
//           <Grid item xs={12} md={6}>
//             {/* grid item to occupy full width of container on XS screen and half the width on medium screen */}
//             <Header subtitle="Best Bundle Pricing" />
//             <Box height="40vh" width="100%">
//               <LineChart />
//             </Box>
//           </Grid>
//           {/* Table */}
//           <Grid item xs={12} md={6}>
//             <Header subtitle="Best Bundle Includes" />
//             <Box height="100%" width="100%">
//               <TableBundle />
//             </Box>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default GBB;

// CODE BEFORE MAJOR CHANGES
// import { Box, Grid, Button, IconButton, Typography, useTheme } from "@mui/material";
// import { tokens } from "../../theme";
// import { mockTransactions } from "../../data/mockData";
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import EmailIcon from "@mui/icons-material/Email";
// import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import TrafficIcon from "@mui/icons-material/Traffic";
// import Header from "../../components/Header";
// import LineChart from "../../components/LineChart";
// import StatBox from "../../components/StatBox";
// import ProgressCircle from "../../components/ProgressCircle";
// import TableBundle from "../../components/TableBundle";

// const GBB = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   return (
//     <Box m="15px">
//       <Header title="Generate Best Bundle" />
//       <Box
//         display="grid"
//         gridTemplateColumns="repeat(12, 1fr)"
//         gridAutoRows="140px"
//         gap="20px"
//       >
//         {/* ROW 1 */}
//         <Box
//           gridColumn="span 3"
//           backgroundColor={colors.primary[400]}
//           display="flex"
//           // alignItems="center"
//           //justifyContent="center"
//         >
//           <StatBox
//             title="12,361"
//             subtitle="Recommended Bundle Pricing"
//             // progress="0.75"
//             // increase="+14%"
//             // icon={
//             //   <EmailIcon
//             //     sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//             //   />
//             // }
//           />
//         </Box>
//         <Box
//           gridColumn="span 3"
//           backgroundColor={colors.primary[400]}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <StatBox
//             title="431,225"
//             subtitle="Total Revenue of Bundle"
//             progress="0.50"
//             increase="+21%"
//             icon={
//               <PointOfSaleIcon
//                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//               />
//             }
//           />
//         </Box>
//         <Box
//           gridColumn="span 3"
//           backgroundColor={colors.primary[400]}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <StatBox
//             title="32,441"
//             subtitle="Breakdown of Total Revenue"
//             progress="0.30"
//             increase="+5%"
//             icon={
//               <PersonAddIcon
//                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//               />
//             }
//           />
//         </Box>
//         <Box
//           gridColumn="span 3"
//           backgroundColor={colors.primary[400]}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <StatBox
//             title="1,325,134"
//             subtitle="Percentage Change of MFLG Revenue"
//             progress="0.80"
//             increase="+43%"
//             icon={
//               <TrafficIcon
//                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//               />
//             }
//           />
//         </Box>
//       </Box>

//       {/* Header for Peak Period */}
//       <Box mt={5} mb={2}>
//         <Typography variant="h3" component="div">
//           Peak Period: [Add your peak period text here]
//         </Typography>
//       </Box>

//       {/* Line Chart and Table */}
//       <Box mt={3} mb={2}>
//         <Grid container spacing={2}>
//           {/* Line Chart */}
//           <Grid item xs={12} md={6}>
//             {/* grid item to occupy full width of container on XS screen and half the width on medium screen */}
//             <Header subtitle="Best Bundle Pricing" />
//             <Box height="40vh" width="100%">
//               <LineChart />
//             </Box>
//           </Grid>
//           {/* Table */}
//           <Grid item xs={12} md={6}>
//             <Header subtitle="Best Bundle Includes" />
//             <Box height="100%" width="100%">
//               <TableBundle />
//             </Box>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default GBB;


// import { Box, Grid } from "@mui/material";
// import Header from "../../components/Header";
// import LineChart from "../../components/LineChart";
// import TableBundle from "../../components/TableBundle";

// const GBB = () => {
//   return (
//     <Box m="20px">
//       <Header title="Generate Best Bundle" />
//       <Grid container spacing={2} alignItems="stretch">
//         {/* Section 1 */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Box p={2} bgcolor="primary.light" color="primary.contrastText">
//             <Header title="Total Revenue of Bundle" subtitle="Highest Revenue across all Possible Bundles" />
//           </Box>
//         </Grid>
//         {/* Section 2 */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Box p={2} bgcolor="secondary.light" color="secondary.contrastText">
//             <Header title="MFLG Share of Revenue" />
//           </Box>
//         </Grid>
//         {/* Section 3 */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Box p={2} bgcolor="info.light" color="info.contrastText">
//             <Header title="Percentage change of MFLG Revenue" />
//           </Box>
//         </Grid>
//         {/* Section 4 */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Box p={2} bgcolor="warning.light" color="warning.contrastText">
//             <Header title="Revenue of attractions before bundling" />
//           </Box>
//         </Grid>
//       </Grid>
//       {/* Line Chart and Table */}
//       <Box mt={5} mb={2}>
//         <Grid container spacing={2}>
//           {/* Line Chart */}
//           <Grid item xs={12} md={6}> {/* grid item to occupy full width of container on XS screen and half the width on medium screen */}
//             <Header subtitle="Best Bundle Pricing" />
//             <Box height="40vh" width="100%">
//               <LineChart />
//             </Box>
//           </Grid>
//           {/* Table */}
//           <Grid item xs={12} md={6}>
//             <Header subtitle="Best Bundle Includes" />
//             <Box height="100%" width="100%">
//               <TableBundle />
//             </Box> 
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default GBB;
