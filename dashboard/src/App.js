import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Overview from "./scenes/overview";
import EBP from "./scenes/ebp";
import GBB from "./scenes/gbb";
import Popularity from "./scenes/popularity";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
// import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
// import Calendar from "./scenes/calendar/calendar"
import Bundle1 from "./components/bundles2/Bundle1";
import Bundle2 from "./components/bundles2/Bundle2";
import Bundle3 from "./components/bundles2/Bundle3";
import Bundle4 from "./components/bundles2/Bundle4";
import Bundle5 from "./components/bundles2/Bundle5";
import Bundle6 from "./components/bundles2/Bundle6";
import Bundle7 from "./components/bundles2/Bundle7";
import Bundle8 from "./components/bundles2/Bundle8";
import Bundle9 from "./components/bundles2/Bundle9";
import Bundle10 from "./components/bundles2/Bundle10";
import Bundle11 from "./components/bundles2/Bundle11";
import Bundle12 from "./components/bundles2/Bundle12";
import Bundle13 from "./components/bundles2/Bundle13";
import Bundle14 from "./components/bundles2/Bundle14";
import Bundle15 from "./components/bundles2/Bundle15";
import Bundle16 from "./components/bundles2/Bundle16";
import Bundle17 from "./components/bundles2/Bundle17";
import Bundle18 from "./components/bundles2/Bundle18";
import Bundle19 from "./components/bundles2/Bundle19";
import Bundle20 from "./components/bundles2/Bundle20";
import Bundle21 from "./components/bundles2/Bundle21";
import Bundle22 from "./components/bundles2/Bundle22";
import Bundle23 from "./components/bundles3/Bundle23";



function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/ebp" element={<EBP />} />
              <Route path="/gbb" element={<GBB />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/popularity" element={<Popularity />} />
              {/* <Route path="/form" element={<Form />} /> */}
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              {/* <Route path="/faq" element={<FAQ />} /> */}
              {/* <Route path="/calendar" element={<Calendar />} /> */}
              <Route path="/geography" element={<Geography />} />
              <Route path="/bundle1" element={<Bundle1 />} />
              <Route path="/bundle2" element={<Bundle2 />} />
              <Route path="/bundle3" element={<Bundle3 />} />
              <Route path="/bundle4" element={<Bundle4 />} />
              <Route path="/bundle5" element={<Bundle5 />} />
              <Route path="/bundle6" element={<Bundle6 />} />
              <Route path="/bundle7" element={<Bundle7 />} />
              <Route path="/bundle8" element={<Bundle8 />} />
              <Route path="/bundle9" element={<Bundle9 />} />
              <Route path="/bundle10" element={<Bundle10 />} />
              <Route path="/bundle11" element={<Bundle11 />} />
              <Route path="/bundle12" element={<Bundle12 />} />
              <Route path="/bundle13" element={<Bundle13 />} />
              <Route path="/bundle14" element={<Bundle14 />} />
              <Route path="/bundle15" element={<Bundle15 />} />
              <Route path="/bundle16" element={<Bundle16 />} />
              <Route path="/bundle17" element={<Bundle17 />} />
              <Route path="/bundle18" element={<Bundle18 />} />
              <Route path="/bundle19" element={<Bundle19 />} />
              <Route path="/bundle20" element={<Bundle20 />} />
              <Route path="/bundle21" element={<Bundle21 />} />
              <Route path="/bundle22" element={<Bundle22 />} />
              <Route path="/bundle23" element={<Bundle23 />} />

            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;