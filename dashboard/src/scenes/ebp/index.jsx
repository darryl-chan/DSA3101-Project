import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import LineChart from "../../components/LineChart";

const ebp = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode);

    return(
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Explore Bundle Prices" subtitle="Bundle Pricing" />
            </Box>
        </Box>

        {/* ROW 1 */}
        <Box> 
            gridColumn="span 3"
            backgroundColor
        </Box>
        


    )
}