import React from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Teams from "./components/Teams";
import Drivers from "./components/Drivers";
import Races from "./components/Races";
import DriversDetails from "./components/DriversDetails";
import RacesGrandPrix from "./components/RacesGrandPrix";
import TeamsFormula1Results from "./components/TeamsFormula1Results";
import canonical from "../src/css/bootstrap.min.css"



const App = () => {

    return (
        <div className="appContainer">
            <Router>
                <div className="appTableContainer">
                            <div className="td1">
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
                                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                                    <div className="container-fluid">
                                        <a className="navbar-brand" href="https://f1feederseries.com/">F-1 Feeder</a>
                                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                                            aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                                            <span className="navbar-toggler-icon"></span>
                                        </button>
                                        <div className="collapse navbar-collapse" id="navbarCollapse">
                                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                                <li className="nav-item">
                                                    <a className="nav-link active" aria-current="page" href="/">Drivers</a>
                                                </li>
                                            </ul>
                                            <form className="d-flex">
                                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                                                </input>
                                                <button className="btn btn-outline-success" type="submit">Search</button>
                                            </form>
                                        </div>
                                    </div>
                                </nav>
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