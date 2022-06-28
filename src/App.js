import React from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Teams from "./components/Teams";
import Drivers from "./components/Drivers";
import Races from "./components/Races";
import DriversDetails from "./components/DriversDetails";

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
                </Routes>
            </Router>
        </div>
    )
}

export default App;