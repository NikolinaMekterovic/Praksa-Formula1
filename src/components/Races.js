import React from "react";
import * as $ from "jquery";

export default class Races extends React.Component {

    state = {
        races: []
    }

    componentDidMount() {
        this.getRaces()
    }

    getRaces = () => {
        const url = "http://ergast.com/api/f1/2013/results/1.json";
        $.get(url, (data) => {
            console.log("trke", data.MRData.RaceTable.Races);
            this.setState({
                races: data.MRData.RaceTable.Races
            })
        })
    }

    render() {
        return (
            <div>
                <h3>Races Championship - 2013</h3>
                <table>
                    <thead>
                        <th>Round</th>
                        <th>Grand Prix</th>
                        <th>Circuit</th>
                        <th>Date</th>
                        <th>Winner</th>
                    </thead>
                    <tbody>
                        {this.state.races.map(item => {
                            return (
                                <tr>
                                    <td>{item.round}</td>
                                    <td>{item.raceName}</td>
                                    <td>{item.Circuit.circuitName}</td>
                                    <td>{item.date}</td>
                                    <td>{item.Results[0].Driver.familyName}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>


                <h1>Race Calendar</h1>
            </div>
        )
    }
}