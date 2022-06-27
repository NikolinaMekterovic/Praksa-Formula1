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
            this.setState({
                drivers: data
            })
        })
        console.log(this.state.drivers);
    }

    render() {
        

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


            </div>
        )
    }
}