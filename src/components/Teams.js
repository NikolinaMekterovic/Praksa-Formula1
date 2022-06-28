import React from "react";
import * as $ from "jquery";

export default class Teams extends React.Component {

    state = {
        teams: []
    }

    componentDidMount() {
        this.getTeams();
    }

    getTeams = () => {
        const url = "http://ergast.com/api/f1/2013/constructorStandings.json";
        $.get(url, (data) => {
            console.log("timovi", data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
            this.setState({
                teams: data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
            })
        })
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={3}>Constructor Championship Standings - 2013</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.teams.map(item=>{
                            return(
                                <tr>
                                <td>{item.position}</td>
                                <td>{item.Constructor.name}</td>
                                <td>Details</td>
                                <td>{item.points}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}