import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const StatBoxGbb = ({ title, subtitle, children }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box 
        display="flex" 
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Subtitle */}
        <Typography 
          variant="h5" 
          sx={{ 
            color: colors.greenAccent[500],
            textAlign: "left",
            marginTop: "10px",
            marginBottom: "20px"
          }}
        >
          {subtitle}
        </Typography>
      </Box>

      {/* Title */}
      <Box 
        display="flex" 
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            fontSize="40px"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            {/* Children (e.g., BarChart, Increase, PieChart) */}
            {children}
          </Box>
        </Box>
      </Box> 

      {/* Progress Circle
      <Box>
        <ProgressCircle progress={progress} />
      </Box>      */}

    </Box>
  );
};

export default StatBoxGbb;



// import { Box, Typography, useTheme } from "@mui/material";
// import { tokens } from "../theme";
// import ProgressCircle from "./ProgressCircle";

// const StatBox = ({ title, subtitle, icon, progress, increase }) => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   return (
//     <Box width="100%" m="0 30px">
//       <Box display="flex" justifyContent="space-between">
//         <Box>
//           {icon}
//           <Typography
//             variant="h4"
//             fontWeight="bold"
//             sx={{ color: colors.grey[100] }}
//           >
//             {title}
//           </Typography>
//         </Box>
//         <Box>
//           <ProgressCircle progress={progress} />
//         </Box>
//       </Box>
//       <Box display="flex" justifyContent="space-between" mt="2px">
//         <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
//           {subtitle}
//         </Typography>
//         <Typography
//           variant="h5"
//           fontStyle="italic"
//           sx={{ color: colors.greenAccent[600] }}
//         >
//           {increase}
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default StatBox;