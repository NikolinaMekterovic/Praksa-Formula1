import React, { useState, useEffect } from "react";
import * as $ from "jquery";

const Teams = () => {
    const [teams, getTeams] = useState([])

    useEffect(() => {
        addTeams()
    }, [])
    const addTeams = () => {
        const url = "http://ergast.com/api/f1/2013/constructorStandings.json";
        $.get(url, (data) => {
            getTeams(data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings)
        })
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th colSpan={3}>Constructor Championship Standings - 2013</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map(item => {
                        return (
                            <tr key={item.Constructor.constructorId}>
                                <td>{item.position}</td>
                                <td>{item.Constructor.name}</td>
                                <td><a href={item.Constructor.url} target="_blank">Details</a></td>
                                <td>{item.points}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default Teams;