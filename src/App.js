import Rockets from "./components/Rockets";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MissionDetails from "./components/MissionDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Rockets/>}/>
          <Route exact path="/mission-details/:mission_name" element={<MissionDetails/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
