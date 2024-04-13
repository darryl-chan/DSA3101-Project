import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { tokens } from '../../theme';
import { useState } from 'react';
import { Box, Button, Typography, useTheme } from "@mui/material";
import Multiselect from 'multiselect-react-dropdown';



const BundleBar = () => {
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
        };
    };
    const onRemove = (selectedList, removedItem) => {
      setSelectedValues(selectedList);
    }

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleSubmit = () => {
        console.log('Selected values', selectedValues);
        const selectedKeys = selectedValues.map(item => item.key);

        if (selectedKeys.length < 2) {
            setSnackbarMessage("Must select more than 1 attraction to bundle.");
            setOpenSnackbar(true);
        } else if (selectedKeys.length === 2) {
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
                setSnackbarMessage("Bundle must have at least 1 MFLG attraction.");
                setOpenSnackbar(true);
              }
        } else if (selectedKeys.length === 3) {
            // bundles of 3
        }
      };

    return (
      <Box>
      {/* Multiselect Component*/}
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
          </Box>
    )

  };

    export default BundleBar;
