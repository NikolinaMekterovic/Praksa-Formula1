import React from "react";
import * as $ from "jquery";

export default class Drivers extends React.Component {
    state = {
        drivers: {}
    }

   componentDidMount() {
    this.getDrivers()
   }

    getDrivers = () => {
        const url = "http://ergast.com/api/f1/2013/driverStandings.json";
        $.get(url, (data) => {
            console.log("state", data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
            this.setState({
                drivers: data.MRData.StandingsTable.StandingsLists[0].DriverStandings
            })
        })
    }

    render() {
        console.log("state render", this.state.drivers);

        return(
            <div>
                <table>
                    <thead>
                        <tr>
                        <th colSpan={3}>Drivers Championship Standings - 2013</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        
                    </tbody>
                </table>


                <h1>Drivers</h1>
            </div>
        )
    }
}