import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import Multiselect from 'multiselect-react-dropdown'; // may need to npm install multiselect-react-dropdown
import { useState } from "react";
import EmptyChart from "../../components/EmptyChart";
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const EBP = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [selectedValues, setSelectedValues] = useState([]);
  const options = [
    { cat: 'MFLG', key: 'Singapore Cable Car'},
    { cat: 'MFLG', key: 'SkyHelix Sentosa'},
    { cat: 'MFLG', key: 'Central Beach Bazaar'},
    { cat: 'MFLG', key: 'Wings Of Time'},
    { cat: 'Competitor', key: 'Sea Aquarium'},
    { cat: 'Competitor', key: 'Adventure Cove'},
    { cat: 'Competitor', key: 'Singapore Flyer'},
    { cat: 'Competitor', key: 'iFly'}
  ];
  const onSelect = (selectedList, selectedItem) => {
    if (selectedValues.length <= 3) {
        setSelectedValues(selectedList);
    }
  };
  const onRemove = (selectedList, removedItem) => {
    setSelectedValues(selectedList);
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSubmit = () => {
    console.log('Selected values:', selectedValues);
    const selectedKeys = selectedValues.map(item => item.key);
  
    if (selectedKeys.includes('Singapore Cable Car')) {
      if (selectedKeys.includes('SkyHelix Sentosa')) {
        navigate("/bundle1"); // Use the string path, not the component
      }
      else if (selectedKeys.includes('Central Beach Bazaar')) {
        navigate("/bundle2");
      }
      else if (selectedKeys.includes('Wings Of Time')) {
        navigate("/bundle3");
      }
      else if (selectedKeys.includes("Sea Aquarium")) {
        navigate("/bundle4");
      }     
      else if (selectedKeys.includes("Adventure Cove")) {
        navigate("/bundle5");
      }
      else if (selectedKeys.includes("Singapore Flyer")) {
        navigate("/bundle6");
      }
      else if (selectedKeys.includes("iFly")) {
        navigate("/bundle7");
      }
    }
    else if (selectedKeys.includes('SkyHelix Sentosa')) {
      if (selectedKeys.includes("Central Beach Bazaar")) {
        navigate("/bundle8");
      }
      else if (selectedKeys.includes("Wings Of Time")) {
        navigate("/bundle9");
      }
      else if (selectedKeys.includes("Sea Aquarium")) {
        navigate("/bundle10");
      }
      else if (selectedKeys.includes("Adventure Cove")) {
        navigate("/bundle11");
      }
      else if (selectedKeys.includes("Singapore Flyer")) {
        navigate("/bundle12");
      }
      else if (selectedKeys.includes("iFly")) {
        navigate("/bundle13");
      }
    }
    else if (selectedKeys.includes("Central Beach Bazaar")) {
      if (selectedKeys.includes("Wings Of Time")) {
        navigate("/bundle14");
      }
      else if (selectedKeys.includes("Sea Aquarium")) {
        navigate("/bundle15");
      }
      else if (selectedKeys.includes("Adventure Cove")) {
        navigate("/bundle16");
      }
      else if (selectedKeys.includes("Singapore Flyer")) {
        navigate("/bundle17");
      }
      else if (selectedKeys.includes("iFly")) {
        navigate("/bundle18");
      }
    }
    else if (selectedKeys.includes("Wings Of Time")) {
      if (selectedKeys.includes("Sea Aquarium")) {
        navigate("/bundle19");
      }
      else if (selectedKeys.includes("Adventure Cove")) {
        navigate("/bundle20");
      }
      else if (selectedKeys.includes("Singapore Flyer")) {
        navigate("/bundle21");
      }
      else if (selectedKeys.includes("iFly")) {
        navigate("/bundle22");
      }
    }
    else {
      setSnackbarMessage("Bundle must be with MFLG's attraction.");
      setOpenSnackbar(true);
    }
  };
  


  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Explore Bundle Prices" subtitle="Bundle Prices" />

      </Box>

      {/* Multiselect Component*/}
      <div>
      <Typography variant="h5">
            Customize Bundle</Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <Multiselect
                displayValue="key"
                onSelect={onSelect}
                onRemove={onRemove}                
                options={selectedValues.length === 3 ? [] : options}
                selectedValues={selectedValues}
                isObject={true}                
                style={ {
                    option: {
                        color: colors.blueAccent[700]
                    }
                }}

            />
            <Button 
              variant="contained" 
              color="primary"
              style={ {backgroundColor: colors.blueAccent[700]} } 
              onClick={handleSubmit}>
              Bundle!
            </Button>

            <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}>
              <MuiAlert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                {snackbarMessage}
                </MuiAlert>
            </Snackbar>
  


          </div>
      </div>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="--"
            subtitle="Total Revenue of Bundle"
            progress="0"
            increase="--%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="--"
            subtitle="MFLG's Share of Revenue"
            progress="0"
            increase="--%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="--"
            subtitle="Percentage Change in MFLG's Revenue"
            progress="0"
            increase="--%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="--"
            subtitle="Traffic Received"
            progress="0"
            increase="--%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
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
              >
                Revenue of Bundle
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $--
              </Typography>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <EmptyChart isDashboard={true} />
          </Box>
        </Box>
    </Box>
    </Box>
  );
};

export default EBP;