import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { tokens } from '../../theme';
import { useEffect, useState } from 'react';
import { Box, Button, Typography, useTheme } from "@mui/material";
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios'; // npm install axios
import StatBoxGbb from '../../components/StatBoxGbb';
import { ResponsiveBar } from '@nivo/bar';

const BundleBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [selectedValues, setSelectedValues] = useState([]);
    const options = [
        { cat: 'MFLG', key: 'Singapore Cable Car'},
        { cat: 'MFLG', key: 'SkyHelix Sentosa'},
        { cat: 'MFLG', key: 'Wings Of Time'},
        { cat: 'Competitor', key: 'Sea Aquarium'},
        { cat: 'Competitor', key: 'Adventure Cove'},
        { cat: 'Competitor', key: 'Singapore Flyer'},
        { cat: 'Competitor', key: 'iFly'},     
        { cat: 'Competitor', key: 'ArtScience Museum'}  
    ];

    const onSelect = (selectedList, selectedItem) => {
      console.log("selected items", selectedList);
        if (selectedValues.length <= 3) {
            setSelectedValues(selectedList);
        };
    };

    const [listCleared, setlistCleared] = useState(false);

    const clearlist = () => {
      setlistCleared(true);
      console.log("is it cleared", listCleared);
      console.log("after clearing", selectedValues);
    };

    const onRemove = (removedItem) => {
      const updatedList = selectedValues.filter(item => item.id !== removedItem.id);
      setSelectedValues(updatedList);
      // console.log(selectedValues);
  };

   
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        } 
        setOpenSnackbar(false);
    };

    const [peakSelected, setPeakSelected] = useState(false);

    const handlePeak = () => {
      if (selectedValues.length <2 ) {
        setSnackbarMessage("Please select attractions to bundle first, before selecting season.");
        setOpenSnackbar(true);
        return;
      } else if (!peakSelected) {
        // If "Peak" is not selected, set it as selected
        const updatedSelectedValues = selectedValues.filter(item => item.key !== "off-peak");
        setSelectedValues([...updatedSelectedValues, { cat: "Season", key: "peak" }]);
        setPeakSelected(true);
       } else {
        // If "Peak" is already selected, deselect it
        setSelectedValues(selectedValues);
      }
    };
  
    const handleOffPeak = () => {
      if (selectedValues.length < 2) {
        setSnackbarMessage("Please select attractions to bundle first, before selecting season.");
        setOpenSnackbar(true);
        return;
      } else if (peakSelected) {
        // If "Peak" is selected, deselect it
        const updatedSelectedValues = selectedValues.filter(item => item.key !== "peak");
        setSelectedValues([...updatedSelectedValues, { cat: "Season", key: "off-peak" }]);
        setPeakSelected(false);
      } else if (!peakSelected && selectedValues.some(item => item.key === "off-peak")) {
        // If "Peak" is not selected and "Off-Peak" is not already selected, set "Off-Peak" as selected
        setSelectedValues(selectedValues);
        setPeakSelected(false);
      } else {
        // If "Peak" is not selected, set it as selected=
        setSelectedValues([...selectedValues, { cat: "Season", key: "off-peak" }]);
        setPeakSelected(false);
      }
    };

    const [ barAdata, setbarAdata ] = useState([]);
    const [ barBdata, setbarBdata ] = useState([]);

    const [name1, setname1 ] = useState('Attraction 1');
    const [name2, setname2 ] = useState('Attraction 2');

    // to two decimal places
    const roundToTwoDecimalPlaces = (num) => {
      return num.toFixed(2); // Use toFixed(2) to round to two decimal places
    };

    const roundtoWhole = (num) => {
      return Math.round(num);
    };

    const [BundlePrice, setBundlePrice] = useState(0);

    const [A1, setA1] = useState({mflg: true, name: ''});
    const [A2, setA2] = useState({mflg: true, name: ''});

    const [bA1Rev, setbA1Rev] = useState(0);
    const [bA2Rev, setbA2Rev] = useState(0);
    const [A1Rev, setA1Rev] = useState(0);
    const [A2Rev, setA2Rev] = useState(0);

    const [BSA1, setBSA1] = useState(0);
    const [BSA2, setBSA2] = useState(0);

    const [A1Change, setA1Change] = useState(0);
    const [A2Change, setA2Change] = useState(0);

    const selectedKeys = selectedValues.map(item => item.key);

    useEffect(() => {
      
      async function fetchData() {
        if (selectedKeys.length === 1) {
          setSnackbarMessage("Please select more than 1 attraction to bundle.");
          setOpenSnackbar(true);
          return;
        }
        if (!selectedValues.some(item => item.key === 'peak' || item.key === 'off-peak')) {
          setSnackbarMessage("Please select season for bundling.");
          setOpenSnackbar(true);
          return;
        }
        try {

          if (selectedKeys.includes("Singapore Cable Car") || selectedKeys.includes("SkyHelix Sentosa") || selectedKeys.includes("Wings Of Time")) {
            const [response, splitrev_response] = await Promise.all([
              axios.post('http://localhost:5000/bundle', selectedKeys),
              axios.post('http://localhost:5000/revenue_split', selectedKeys)
            ]);
  
            const indivValues = Object.values(response.data);
            const splitValues = Object.values(splitrev_response.data);
  
           
  
            setA1(indivValues[1]);
            setA2(indivValues[2]);
  
            setBundlePrice(roundToTwoDecimalPlaces(indivValues[0].price));    
  
            setbA1Rev(parseFloat(indivValues[1].revenue));
            setbA2Rev(parseFloat(indivValues[2].revenue));
            setA1Rev(parseFloat(indivValues[3].revenue));
            setA2Rev(parseFloat(indivValues[4].revenue));
  
            setBSA1(parseFloat(splitValues[0].revenue));
            setBSA2(parseFloat(splitValues[1].revenue));     

              const temp = [
                
                { key: 'Before Bundling Option', 'Individual Revenue': roundtoWhole(A1Rev), 'Revenue from Bundle': 0 },
                { key: 'After Bundling Option', 'Individual Revenue': roundtoWhole(bA1Rev), 'Revenue from Bundle': roundtoWhole(BSA1) },
              ];
              const temp2 =  [ 
                
                { key: 'Before Bundling Option', 'Individual Revenue': roundtoWhole(A2Rev), 'Revenue from Bundle': 0 },
                { key: 'After Bundling Option', 'Individual Revenue': roundtoWhole(bA2Rev), 'Revenue from Bundle': roundtoWhole(BSA2) },
              ];
    
              
    
              let newbarA, newname1, newbarB, newname2;
              if (A1.mflg && A2.mflg) { // both are MFLG's
                newbarA = temp;
                newname1 = A1.name;
                newbarB = temp2;
                newname2 = A2.name
        
                setA1Change(roundToTwoDecimalPlaces((bA1Rev + BSA1 - A1Rev) / A1Rev * 100));
                setA2Change(roundToTwoDecimalPlaces((bA2Rev + BSA2 - A2Rev) / A2Rev * 100));
    
    
              } else if (A1.mflg && !A2.mflg) {  // only first option is MFLG's
                newbarA = temp;
                newname1 = A1.name;
                newbarB = [];
                newname2 = '';
                setname2('');
    
                setA1Change(roundToTwoDecimalPlaces((bA1Rev + BSA1 - A1Rev) / A1Rev * 100));
                setA2Change(0);
    
              } else { // other one must be MFLG if first isn't
                newbarA = temp2;
                newname1 = A2.name;
                newbarB = []
                newname2 = '';
    
                setA1Change(roundToTwoDecimalPlaces((bA2Rev + BSA2 - A2Rev) / A2Rev * 100));
                setA2Change(0);
    
              }; 
    
              setbarAdata(newbarA);
              setname1(newname1);
              setbarBdata(newbarB);
              setname2(newname2);   
            } else {
              setSnackbarMessage("Bundle must be with at least 1 MFLG attraction.");
              setOpenSnackbar(true);
              return;
            }

        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      }

      if (listCleared) {
        setSelectedValues([]);
        setBundlePrice(0);
        setA1({ mflg: true, name: '' });
        setA2({ mflg: true, name: '' });
        setbA1Rev(0);
        setbA2Rev(0);
        setBSA1(0);
        setBSA2(0);
        setA1Change(0);
        setA2Change(0);
        setbarAdata([]);
        setbarBdata([]);

        setlistCleared(false);
      } else if (selectedKeys.length > 0) {
        fetchData();
        return;
      };

      console.log("testing 2", listCleared)      
      
    }, [clearlist]);


    const displayPerc = (number) => {
      return '+' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '%';
    };

    const pastelColors = ["#9cadce", "#d1cfe2"];

    const bartheme = {
      axis: {
          ticks: {
              line: {
                  stroke: '#efefef' // Color for the tick lines
              },
              text: {
                  fill: colors.grey[400]  // Color for the tick text
              }
          },
          legend: {
              text: {
                  fill: colors.grey[400] // Color for the Y-axis label
              }
          }
      }
  };
  
  

    return (
      <Box>
        <Box>
        {/* Multiselect Component*/}
        <Typography variant="h3">
              Customize Bundle
              </Typography>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <Button 
                  variant="contained"
                  color="primary"
                  onClick={clearlist}
                  style={ {backgroundColor: colors.blueAccent[700]} }
                  >
                    Clear
                  </Button>
                <Multiselect
                    displayValue="key"
                    onSelect={onSelect}
                    onRemove={onRemove} // may want to change                 
                    options={selectedValues.length === 2 ? [] : options}
                    selectedValues={selectedValues}
                    isObject={true}                
                    style={ {
                        option: {
                            color: colors.blueAccent[700]
                        }
                    }}
                />

                  <Button
                  color="primary"
                  style={{ backgroundColor: peakSelected ? "lightgrey" : "grey" }}
                  onClick={handlePeak}>
                    Peak
                  </Button> 

                  <Button 
                  color="primary"
                  style={{ backgroundColor: peakSelected ? "grey" : "lightgrey"  }}
                  onClick={handleOffPeak}>
                    Off-Peak
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

          <Box
            display="flex"
            mb={3} // Add margin bottom for spacing
          >
            <Typography variant="h3" component="div" fontWeight="bold">
              Current Bundle includes: {name1} & {name2} 
            </Typography> 
          </Box>      

          {/* Row of Statboxes and boxes */}
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
            mx={3}
          >
              
            {/* ROW 1 */}
            <Box
              gridColumn="span 4"
              backgroundColor={colors.primary[400]}
              display="flex"
              justifyContent="center"
            >
              {BundlePrice && ( // need this so that the dashboard does not show undefined while fetching data, will only show statbox component when it is not undefined
                <StatBoxGbb                
                  title = {`$${(BundlePrice).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
                  subtitle="Recommended Bundle Pricing"
                />
              )}
            </Box>

            <Box
              gridColumn="span 4"
              backgroundColor={colors.primary[400]}
              display="flex"
              flexDirection="column" // Arrange children vertically
            >
              {/* Original content */}
              <Box
                display="flex"
                justifyContent="center"
              >
                <StatBoxGbb
                  subtitle="% Change of MFLG Revenue"
                />
              </Box>

              {/* Split the empty space into two sections */}
              <Box
                display="grid"
                gridTemplateColumns="auto auto" // Divide the grid into two col
                textAlign="center"
                pt={1} // Add padding top for spacing
                mt={-2} // Decrease margin top to reduce the gap
                mx={1.5} // Increase horizontal margin for spacing
              >
                {/* Left section */}
                <Box>
                  <Typography variant="h6" mb={1}>
                    {name1}
                  </Typography>
                  {/* Calculate and display percentage increase for bA1 */}
                  <Typography fontWeight="bold" sx={{ fontSize: "1.5rem" }}>
                    {displayPerc(A1Change)}
                  </Typography>
                </Box>

                {/* Right section */}
                <Box>
                  <Typography variant="h6" mb={1}>
                    {name2}
                  </Typography>
                  {/* Calculate and display percentage increase for bA2 */}
                  <Typography fontWeight="bold" sx={{ fontSize: "1.5rem" }}>
                    {displayPerc(A2Change)}
                  </Typography>
                </Box>
            </Box>
          </Box>
          </Box>



        <Box style={{ display: 'flex', flexDirection: 'row'}}>
          <div style={{ width: '100%', height: '400px' }}>
          <Typography
              variant="h5" 
              fontWeight="bold"
              sx={{
                color: colors.greenAccent[400]
              }} 
            >
              {name1}
            </Typography>           
            <ResponsiveBar
              data={barAdata}
              keys={['Individual Revenue', 'Revenue from Bundle']}
              indexBy="key"
              margin={{ top: 50, right: 50, bottom: 50, left: 80 }} 
              padding={0.3}
              colors={pastelColors}
              borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Revenue ($)", // Add y-axis label
                legendPosition: "middle",
                legendOffset: -60, // Adjust offset of the Y-axis label
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              groupMode='stacked'
              theme={bartheme}
              tooltip={({ id, value }) => (
                <div style={{ color: colors.grey[400], background: 'white', borderRadius: '8px', padding: '4px', margin: '4px' }}>
                  <strong>{id}</strong>: {value}
                </div>
              )}
            />
          </div>
          <div style={{ width: '100%', height: '400px', marginTop: '20px' }}>
          <Typography
              variant="h5" 
              fontWeight="bold"
              sx={{
                color: colors.greenAccent[400]
              }} 
            >
              {name2}
            </Typography>
            <ResponsiveBar
              data={barBdata}
              keys={['Individual Revenue', 'Revenue from Bundle']}
              indexBy="key"
              margin={{ top: 50, right: 50, bottom: 50, left: 80 }} 
              padding={0.3}
              colors={pastelColors}
              borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Revenue ($)", // Add y-axis label
                legendPosition: "middle",
                legendOffset: -60, // Adjust offset of the Y-axis label
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}        
              groupMode='stacked'
              theme={bartheme}
              tooltip={({ id, value }) => (
                <div style={{ color: colors.grey[400], background: 'white', borderRadius: '8px', padding: '4px', margin: '4px' }}>
                  <strong>{id}</strong>: {value}
                </div>
              )}
            />
          </div>
          </Box>
          </Box>
    )
  };

export default BundleBar;
