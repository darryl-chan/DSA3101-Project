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
    // const navigate = useNavigate();

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

    const clearlist = () => {
      setSelectedValues([]);
      setBundlePrice(0);
      setA1({mflg: true, name: ''});
      setA2({mflg: true, name: ''});
      setbA1Rev(0);
      setbA2Rev(0);
      setBSA1(0);
      setBSA2(0);
      setA1Change(0);
      setA2Change(0);
      setbarAdata([]);
      setbarBdata([]);

      console.log("after clearing", selectedValues);
    };

    const onRemove = (removedItem) => {
      const updatedList = selectedValues.filter(item => item.id !== removedItem.id);
      setSelectedValues(updatedList);
      console.log(selectedValues);
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

    const [name1, setname1 ] = useState('');
    const [name2, setname2 ] = useState('');

    // to two decimal places
    const roundToTwoDecimalPlaces = (num) => {
      return num.toFixed(2); // Use toFixed(2) to round to two decimal places
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


    
    const handleSubmit = async (e) => { 
      console.log('Selected values', selectedValues);
      const selectedKeys = selectedValues.map(item => item.key);
      e.preventDefault(); 
      if (selectedKeys.length === 0) {
        return;
      } else if (selectedKeys.length === 1) {
        setSnackbarMessage("Please select more than 1 attraction to bundle.");
        setOpenSnackbar(true);
        return;
      }
      if (!selectedValues.some(item => item.key === 'peak' || item.key === 'off-peak')) {
        setSnackbarMessage("Please select season for bundling.");
        setOpenSnackbar(true);
        return;
      }

    // starts here
      if (selectedKeys.includes("Singapore Cable Car") || selectedKeys.includes("SkyHelix Sentosa") || selectedKeys.includes("Wings Of Time")) {
        try { 
          console.log('Data sent to backend', selectedKeys);
          const response = await axios.post('http://localhost:5000/bundle', selectedKeys);    
          console.log('Data received from backend', response.data);
          const indivValues = Object.values(response.data);      

          setBundlePrice(roundToTwoDecimalPlaces(indivValues[0].price));    

          setA1(indivValues[1]);
          setA2(indivValues[2]);

          setbA1Rev(parseFloat(indivValues[1].revenue));
          setbA2Rev(parseFloat(indivValues[2].revenue));
          setA1Rev(parseFloat(indivValues[3].revenue));
          setA2Rev(parseFloat(indivValues[4].revenue));

          const splitrev_response = await axios.post('http://localhost:5000/revenue_split', selectedKeys);
          const splitValues = Object.values(splitrev_response.data);
      
          setBSA1(parseFloat(splitValues[0].revenue));
          setBSA2(parseFloat(splitValues[1].revenue));     

          const temp = [
            { key: 'With Bundling Option', 'Individual Revenue': roundToTwoDecimalPlaces(bA1Rev), 'Revenue from Bundle': roundToTwoDecimalPlaces(BSA1) },
            { key: 'Without Bundling Option', 'Individual Revenue': roundToTwoDecimalPlaces(A1Rev), 'Revenue from Bundle': 0 },
          ];
          const temp2 =  [ 
            { key: 'With Bundling Option', 'Individual Revenue': bA2Rev, 'Revenue from Bundle': BSA2 },
            { key: 'Without Bundling Option', 'Individual Revenue': A2Rev, 'Revenue from Bundle': 0 },
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
          
        } catch (error) { 
          console.error('Error sending data:', error); 
        } 
      } else {
        setSnackbarMessage("Bundle must include at least 1 MFLG attraction.");
        setOpenSnackbar(true);
      }
    };


    const displayPerc = (number) => {
      return '+' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '%';
    }

    const pastelColors = ["#9cadce", "#d1cfe2"];

    const bartheme = {
      axis: {
          ticks: {
              line: {
                  stroke: '#efefef' // Color for the tick lines
              },
              text: {
                  fill: '#aaaaaa' // Color for the tick text
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
                  onClick={clearlist}
                  style={ {backgroundColor: "lightblue"} }
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

                <div style={ {display:'flex', flexDirection:'column'}}>
                  <Button
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: peakSelected ? "lightgrey" : "grey" }}
                  onClick={handlePeak}>
                    Peak
                  </Button> 

                  <Button 
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: peakSelected ? "grey" : "lightgrey"  }}
                  onClick={handleOffPeak}>
                    Off-Peak
                  </Button>          

                </div>          

                <Button 
                  variant="contained" 
                  color="primary"
                  style={ {backgroundColor: colors.blueAccent[700], height: '68px' }} 
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

          <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px">
            <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            justifyContent="center"
            width="300px"
          >
            <StatBoxGbb
              title={BundlePrice}
              subtitle="Recommended Bundle Pricing"
            />
          </Box>

          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            justifyContent="center"
            width="300px"
          >
            <StatBoxGbb
              title= {displayPerc(A1Change)}
              subtitle="MFLG Attraction 1: Percentage change with bundling"
            />
          </Box>

          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            justifyContent="center"
            width="300px"
          >
            <StatBoxGbb
              title= {displayPerc(A2Change)}
              subtitle="MFLG Attraction 2: Percentage change with bundling"
            />
          </Box>

        </Box>

        <Box style={{ display: 'flex', flexDirection: 'row'}}>
            <div style={ { width: '100%', height: '400px'} }>
              <h2>{name1}</h2>
              <ResponsiveBar
                data={barAdata}
                keys={['Individual Revenue', 'Revenue from Bundle']}
                indexBy="key"
                margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
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
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                groupMode='stacked'
                theme={bartheme}
                tooltip={({ id, value }) => (
                  <div style={{ background: colors.blueAccent[700], padding: '12px', color: 'white' }}>
                    <strong>{id}</strong>: {value}
                  </div>
                )}
              />
            </div>
            <div style={ { width: '100%', height: '400px'} }>
              <h2>{name2}</h2>
              <ResponsiveBar
                data={barBdata}
                keys={['Individual Revenue', 'Revenue from Bundle']}
                indexBy="key"
                margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
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
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                groupMode='stacked'
                theme={bartheme}
                tooltip={({ id, value }) => (
                  <div style={{ background: colors.blueAccent[700], padding: '12px', color: 'white' }}>
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
