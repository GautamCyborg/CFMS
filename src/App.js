import ChloropathPage from "./Pages/ChloropathPage";
import CustomIconPage from "./Pages/CustomIconPage";
import DrawPage from "./Pages/DrawPage";
import SearchPage from "./Pages/SearchPage";
import LoginPage from "./Pages/LandingPage";
import Dashboard from "./Pages/Dashboard";
import Signup from "./Pages/Signup";
import StartAudit from "./Pages/StartAudit"
import VerifyPage from "./Pages/VerifyPage";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//for map tiles visit https://leaflet-extras.github.io/leaflet-providers/preview/index.html

function App() {
  return (
    <Router>
    <div>
      <Routes>
      <Route path="/Dashboard" element={<Dashboard/>}/>
      <Route path="/Signup" element={<Signup/>}/>
      <Route path="/SearchMap" element={<SearchPage/>}/>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/CustomIcon" element={<CustomIconPage />} />
        <Route path="/Draw" element={<DrawPage />} />
        <Route path="/ChloropathMap" element={<ChloropathPage />} />
        <Route path="/Audit" element={<StartAudit/>} />
        <Route path="/GeojsonVerify" element={<VerifyPage/>} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
