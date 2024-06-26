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
    
    const [options, setOptions] = useState([]);
    useEffect(() => {
      const fetchOptions = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:5000/attraction_names');
          const formattedOptions = response.data.map(item => ({ key: item.name, id: item.mflg }));
          setOptions(formattedOptions);
        } catch (error) {
          console.error('Failed to fetch options:', error);
        }
      };
  
      fetchOptions();
    }, []);
  
    const handleChange = (selectedOptions) => {
      setSelectedValues(selectedOptions);
      // console.log("here are", options);
    };

    const [listCleared, setlistCleared] = useState(false);

    const clearlist = () => {
      setlistCleared(true);
      // console.log("is list cleared", listCleared);
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
    const [offpeakSelected, setOffPeakSelected] = useState(false);

    const handlePeak = () => {
      if (selectedValues.length < 2 ) {
        setSnackbarMessage("Please select attractions to bundle first, before selecting season.");
        setOpenSnackbar(true);
        return;
      } else if (!peakSelected && offpeakSelected) { // off-peak selected
        const updatedSelectedValues = selectedValues.filter(item => item.key !== "off-peak");
        setSelectedValues([...updatedSelectedValues, { cat: "Season", key: "peak" }]);
        setPeakSelected(true);
        setOffPeakSelected(false);
      } else if (!peakSelected && !offpeakSelected) { // no selection yet
        setSelectedValues([...selectedValues, { cat: "Season", key: "peak" }]);
        setPeakSelected(true);
      }
    };
  
    const handleOffPeak = () => {
      if (selectedValues.length < 2) {
        setSnackbarMessage("Please select attractions to bundle first, before selecting season.");
        setOpenSnackbar(true);
        return;
      } else if (peakSelected && !offpeakSelected) {
        // If "Peak" is selected, deselect it
        const updatedSelectedValues = selectedValues.filter(item => item.key !== "peak");
        setSelectedValues([...updatedSelectedValues, { cat: "Season", key: "off-peak" }]);
        setPeakSelected(false);
        setOffPeakSelected(true);
      } else if (!peakSelected && !offpeakSelected) { // offpeak selected
        setSelectedValues([...selectedValues, { cat: "Season", key: "off-peak" }]);
        setOffPeakSelected(true);
      }  
    };

    const [ barAdata, setbarAdata ] = useState([]);
    const [ barBdata, setbarBdata ] = useState([]);

    const [name1, setname1 ] = useState('Attraction 1');
    const [name2, setname2 ] = useState('Attraction 2');

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
    const checkMFLG = selectedValues.map(item => item.id);
    
    // useEffect for instant update of values
    useEffect(() => {
      
      async function fetchData() {
        if (selectedKeys.length === 1) {
          setSnackbarMessage("Please select more than 1 attraction to bundle.");
          setOpenSnackbar(true);
          return;
        }
        else if (selectedKeys.length > 1 && (!selectedValues.some(item => item.key === 'peak' || item.key === 'off-peak'))) {
          setSnackbarMessage("Please select season for bundling.");
          setOpenSnackbar(true);
          return;
        } 
        try {
    
          if (checkMFLG.includes("Yes")) {  
            const [response, splitrev_response] = await Promise.all([
              axios.post('http://127.0.0.1:5000/bundle', selectedKeys),
              axios.post('http://127.0.0.1:5000/revenue_split', selectedKeys)
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
        
                setA1Change(roundtoWhole((bA1Rev + BSA1 - A1Rev) / A1Rev * 100));
                setA2Change(roundtoWhole((bA2Rev + BSA2 - A2Rev) / A2Rev * 100));
    
    
              } else if (A1.mflg && !A2.mflg) {  // only first option is MFLG's
                newbarA = temp;
                newname1 = A1.name;
                newbarB = [];
                newname2 = A2.name;
                setname2('');
    
                setA1Change(roundtoWhole((bA1Rev + BSA1 - A1Rev) / A1Rev * 100));
                setA2Change(0);
    
              } else { // other one must be MFLG if first isn't
                newbarA = temp2;
                newname1 = A2.name;
                newbarB = []
                newname2 = A1.name;
    
                setA1Change(roundtoWhole((bA2Rev + BSA2 - A2Rev) / A2Rev * 100));
                setA2Change(0);
    
              }; 
    
              setbarAdata(newbarA);
              setname1(newname1);
              setbarBdata(newbarB);
              setname2(newname2);   
              setOpenSnackbar(false);

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
        setBundlePrice('');
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
        setname1('');
        setname2('');
        setPeakSelected(false);
        setOffPeakSelected(false);

        setlistCleared(false);
      } else if (selectedKeys.length > 0) {
        fetchData();
        return;
      };

      fetchData();
      
    }, [listCleared, selectedKeys]);

    // display values
    const roundToTwoDecimalPlaces = (num) => {
      return num.toFixed(2); // Use toFixed(2) to round to two decimal places
    };
    const roundtoWhole = (num) => {
      return Math.round(num);    
    };
    
    const displayPerc = (number) => {
      return '+' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '%';
    };

    // colours for bar graph
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
                    onSelect={handleChange}
                    onRemove={clearlist}   
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
              Current Bundle includes: {name2 ? `${name1} & ${name2}` : name1}
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
              <StatBoxGbb
                  subtitle="Recommended Bundle Pricing"
                />
                <StatBoxGbb                
                  title = {`$${(BundlePrice).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
                />
              
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
                legend: "Revenue (units of $100,000)", // Add y-axis label
                legendPosition: "middle",
                legendOffset: -60, // Adjust offset of the Y-axis label
                format: value => `${(value / 100000)}`
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              label={(label) => `$${(label.value).toLocaleString('en-US', {minimumFractionDigits: 0})}`}
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
                legend: "Revenue (units of $100,000)", // Add y-axis label
                legendPosition: "middle",
                legendOffset: -60, // Adjust offset of the Y-axis label
                format: value => `${(value / 100000)}`
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}      
              label={(label) => `$${(label.value).toLocaleString('en-US', {minimumFractionDigits: 0})}`}  
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
