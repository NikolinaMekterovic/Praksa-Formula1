import React from "react";
import Drivers from "./components/Drivers";
import { Router , Link , Switch , Route } from "react-router-dom";
import Races from "./components/Races"
import Teams from "./components/Teams";
import history from "./history";

export default class App extends React.Component {
    render() {
        return(
            <div>
                <h1>Praksa</h1>
                <Drivers />

                <Router history={history}>
                    <ul>
                        <li><Link to="/">Drivers</Link></li>
                        <li><Link to="/races">Races</Link></li>
                        <li><Link to="/teams">Teams</Link></li>
                    </ul>
                    <Switch>
                        <Route path="/" component={Drivers}></Route>
                        <Route path="/races" component={Races}></Route>
                        <Route path="/teams" component={Teams}></Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}