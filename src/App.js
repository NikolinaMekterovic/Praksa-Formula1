import React from "react";
import { BrowserRouter as Router , Link , Routes , Route } from "react-router-dom";
import Drivers from "./components/Drivers";
import Races from "./components/Races"
import Teams from "./components/Teams";

export default class App extends React.Component {
    render() {
        return(
            <div>
                <h1>Praksa</h1>
                <Router>
                    <ul>
                        <li><Link to="/">Drivers</Link></li>
                        <li><Link to="/races">Races</Link></li>
                        <li><Link to="/teams">Teams</Link></li>
                    </ul>
                    <Routes>
                        <Route path="/" element={<Drivers/>}></Route>
                        <Route path="/races" element={<Races/>}></Route>
                        <Route path="/teams" element={<Teams/>}></Route>
                    </Routes>
                </Router>
            </div>
        )
    }
}