import React from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Teams from "./components/Teams";
import Drivers from "./components/Drivers";
import Races from "./components/Races";
import DriversDetails from "./components/DriversDetails";
import RacesGrandPrix from "./components/RacesGrandPrix";
import TeamsFormula1Results from "./components/TeamsFormula1Results";



const App = () => {

    return (
        <div>
            <h1>Praksa</h1>
            <Router>
                <ul>
                    <li><Link to="/">Drivers</Link></li>
                    <li><Link to="/races">Races</Link></li>
                    <li><Link to="/teams">Teams</Link></li>
                </ul>
                <Routes>
                    <Route path="/" element={<Drivers />}></Route>
                    <Route path="/races" element={<Races />}></Route>
                    <Route path="/teams" element={<Teams />}></Route>
                    <Route path="/driverDetails" element={<DriversDetails />}></Route>
                    <Route path="/racesGrandPrix" element={<RacesGrandPrix />}></Route>
                    <Route path="/teamsForumla1Results" element={<TeamsFormula1Results />}></Route>
                </Routes>
            </Router>
        </div>
    )
}

export default App;