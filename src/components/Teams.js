import React, { useState, useEffect } from "react";
import * as $ from "jquery";
import { useNavigate } from 'react-router-dom';

const Teams = () => {
    const [teams, getTeams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        addTeams()
    }, [])
    const addTeams = () => {
        const url = "http://ergast.com/api/f1/2013/constructorStandings.json";
        $.get(url, (data) => {
            getTeams(data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings)
        })
    }

    const handleClickDetails = (constructorId) => {
        navigate("/teamsForumla1Results", { state: { constructorId: constructorId } });
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
                                <td onClick={() => { handleClickDetails(item.Constructor.constructorId) }}>{item.Constructor.name}</td>
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