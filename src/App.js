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
        <div className="appContainer">
            <Router>
            <div className="appTableContainer appTableContainer2 appTableContainer3">
                <div className="td1 center">
                    <div><img src={require(`./img/F1-2013-Legends-Edition.jpg`).default} /></div>
                    <ul>
                        <li className="navBtn">
                            <Link to="/" className="lnk" >
                                <img src={require(`./img/Kaciga.png`).default} />
                                Drivers
                            </Link>
                        </li>
                        <li className="navBtn">
                            <Link to="/teams" className="lnk">
                                <img src={require(`./img/Teams.png`).default} />
                                Teams
                            </Link>
                        </li>
                        <li className="navBtn">
                            <Link to="/races" className="lnk">
                                <img src={require(`./img/Races.png`).default} />
                                Races
                            </Link>
                        </li>
                    </ul>
                </div>
                 <div className="td2">
                    <Routes>
                        <Route path="/" element={<Drivers />}></Route>
                        <Route path="/races" element={<Races />}></Route>
                        <Route path="/teams" element={<Teams />}></Route>
                        <Route path="/driverDetails" element={<DriversDetails />}></Route>
                        <Route path="/racesGrandPrix" element={<RacesGrandPrix />}></Route>
                        <Route path="/teamsForumla1Results" element={<TeamsFormula1Results />}></Route>
                    </Routes>
                </div>
                </div>
            </Router>
        </div>
    )
}

export default App;