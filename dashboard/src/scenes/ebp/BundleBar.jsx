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
        // { cat: 'MFLG', key: 'Central Beach Bazaar'},
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

    const clearlist = () => {
      setSelectedValues([]);
      setBundlesRev(null);
      setBundlePrice(0);
      setBRevenue(0);
      setbA1Rev(0);
      setbA2Rev(0);
      setA1Rev(0);
      setA2Rev(0);
      setbarAdata([]);
      setbarBdata([]);
      setname1('');
      setname2('');

      console.log("after clearing", selectedValues);
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

    const [dataReceived, setDataReceived] = useState(null);
    const [bundlesRev, setBundlesRev] = useState(null);
    const [singlebAtt1, setSinglebAtt1] = useState(null);
    const [singlebAtt2, setSinglebAtt2] = useState(null);
    const [singleAtt1, setSingleAtt1] = useState({mflg: false});
    const [singleAtt2, setSingleAtt2] = useState({mflg: false});

    const [bundlePrice, setBundlePrice] = useState(0);
    const [bRevenue, setBRevenue] = useState(0);
    const [bA1Rev, setbA1Rev] = useState(0);
    const [bA2Rev, setbA2Rev] = useState(0); 
    const [A1Rev, setA1Rev] = useState(0);
    const [A2Rev, setA2Rev] = useState(0);

    const [ barAdata, setbarAdata ] = useState([]);
    const [ barBdata, setbarBdata ] = useState([]);

    const [name1, setname1 ] = useState('');
    const [name2, setname2 ] = useState('');

    // to two decimal places
    const roundToTwoDecimalPlaces = (num) => {
      return num.toFixed(2); // Use toFixed(2) to round to two decimal places
    };

    // for values to be updated instantly according to user input
    useEffect( () => {
      if(bundlesRev) {
        setBundlePrice(roundToTwoDecimalPlaces(bundlesRev.price));
        setBRevenue(roundToTwoDecimalPlaces(bundlesRev.revenue));
        setbA1Rev(roundToTwoDecimalPlaces(singlebAtt1.revenue));
        setbA2Rev(roundToTwoDecimalPlaces(singlebAtt2.revenue));
        setA1Rev(roundToTwoDecimalPlaces(singleAtt1.revenue));
        setA2Rev(roundToTwoDecimalPlaces(singleAtt2.revenue));
      }
    });

    // for instant update of data
    useEffect(() => {
      console.log('first chart data', barAdata);
      console.log('second chart data', barBdata);
    }, [barAdata, barBdata, name1, name2]);    

    // useEffect(() => {
    //   console.log("after clearing", selectedValues);
    // }, [clearlist]); 

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

      if (selectedKeys.includes("Singapore Cable Car") || selectedKeys.includes("SkyHelix Sentosa") || selectedKeys.includes("Central Beach Bazaar") || selectedKeys.includes("Wings Of Time")) {
        try { 
          console.log('Data sent to backend', selectedKeys);
          const response = await axios.post('http://localhost:5000/bundle', selectedKeys ); 
          console.log('Data received from backend:', response.data); 
          setDataReceived(response.data);
          const indivValues = Object.values(response.data);

          setBundlesRev(indivValues[0]);        
          setSinglebAtt1(indivValues[1]);
          setSinglebAtt2(indivValues[2]);
          setSingleAtt1(indivValues[3]);
          setSingleAtt2(indivValues[4]);

          // need to change bRevenue with split 

          const temp = [
            { key: 'With Bundling Option', 'Individual Revenue': bA1Rev, 'Bundle Revenue': bRevenue },
            { key: 'Without Bundling Option', 'Individual Revenue': A1Rev, 'Bundle Revenue': 0 },
          ];
          const temp2 =  [ 
            { key: 'With Bundling Option', 'Individual Revenue': bA2Rev, 'Bundle Revenue': bRevenue },
            { key: 'Without Bundling Option', 'Individual Revenue': A2Rev, 'Bundle Revenue': 0 },
          ];

          let newbarA = [];
          let newname1 = '';
          let newbarB = [];
          let newname2 = '';

          if (singleAtt1.mflg && singleAtt2.mflg) { // both are MFLG's
            newbarA = temp;
            newname1 = singleAtt1.name;
            newbarB = temp2;
            newname2 = singleAtt2.name;
          } else if (singleAtt1.mflg && !singleAtt2.mflg) {  // only first option is MFLG's
            newbarA = temp;
            newname1 = singleAtt1.name;
            newbarB = []
            newname2 = '';
            setname2('');
          } else { // other one must be MFLG if first isn't
            newbarA = temp2;
            newname1 = singleAtt2.name;
            newbarB = []
            newname2 = '';
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

    const numberWithCommas = (number) => {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

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
          },
          legend: {
              text: {
                  fill: '#bbbbbb' // Color for the axis legend text
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
            // alignItems="center"
            justifyContent="center"
            width="300px"
          >
            <StatBoxGbb
              title={bundlePrice}
              subtitle="Recommended Bundle Pricing"
            />
          </Box>

          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            // alignItems="left"
            justifyContent="center"
            width="300px"
          >
            <StatBoxGbb
              title= {numberWithCommas(bRevenue)}
              subtitle="Total Revenue of Bundle"
            />
          </Box>

        </Box>

        <Box style={{ display: 'flex', flexDirection: 'row'}}>
            <div style={ { width: '100%', height: '400px'} }>
              <h2>{name1}</h2>
              <ResponsiveBar
                data={barAdata}
                keys={['Individual Revenue', 'Bundle Revenue']}
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
              />
            </div>
            <div style={ { width: '100%', height: '400px'} }>
              <h2>{name2}</h2>
              <ResponsiveBar
                data={barBdata}
                keys={['Individual Revenue', 'Bundle Revenue']}
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
                />
            </div>
          
          {/* <div style={ { width: '100%', height: '400px'} }>
            <ResponsiveBar
              data={BarData}
              keys={['Attraction 1', 'Attraction 2', 'Bundle']}
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
            />
          </div> */}
        </Box>

      </Box>
    )
  };

export default BundleBar;
