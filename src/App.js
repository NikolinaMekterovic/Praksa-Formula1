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
        <div className="divGlavni">
            <Router>
                <table className="divTabele">
                    <tr>
                        <td className="td1">
                            <div>
                                <h1><img src={require(`./img/F1-2013-Legends-Edition.jpg`).default} /></h1>
                                <ul className="ul">
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
                                    <li className="navBtn"><Link to="/races" className="lnk">
                                        <img src={require(`./img/Races.png`).default} />
                                        Races
                                    </Link>
                                    </li>
                                </ul>
                            </div>
                        </td>
                        <td className="td2">
                            <div>
                                <table>
                                    <tr>
                                        <td>
                                            <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                                                <div class="container-fluid">
                                                    <a class="navbar-brand" href="https://f1feederseries.com/">F-1 Feeder</a>
                                                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                                                        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                                                        <span class="navbar-toggler-icon"></span>
                                                    </button>
                                                    <div class="collapse navbar-collapse" id="navbarCollapse">
                                                        <ul class="navbar-nav me-auto mb-2 mb-md-0">
                                                            <li class="nav-item">
                                                                <a class="nav-link active" aria-current="page" href="./drivers">Drivers</a>
                                                            </li>
                                                        </ul>
                                                        <form class="d-flex">
                                                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                                                            </input>
                                                            <button class="btn btn-outline-success" type="submit">Search</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </nav>
                                        </td>
                                    </tr>
                                </table>

                                <Routes>
                                    <Route path="/" element={<Drivers />}></Route>
                                    <Route path="/races" element={<Races />}></Route>
                                    <Route path="/teams" element={<Teams />}></Route>
                                    <Route path="/driverDetails" element={<DriversDetails />}></Route>
                                    <Route path="/racesGrandPrix" element={<RacesGrandPrix />}></Route>
                                    <Route path="/teamsForumla1Results" element={<TeamsFormula1Results />}></Route>
                                </Routes>
                            </div>
                        </td>
                    </tr>
                </table>
            </Router>
        </div>
    )
}

export default App;