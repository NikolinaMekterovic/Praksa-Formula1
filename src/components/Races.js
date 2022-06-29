import React, { useState, useEffect } from "react";
import * as $ from "jquery";
import { useNavigate } from 'react-router-dom';

const Races = () => {
    const [races, getRaces] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        addRaces()
    }, [])

    const addRaces = () => {
        const url = "http://ergast.com/api/f1/2013/results/1.json";
        $.get(url, (data) => {
            getRaces(data.MRData.RaceTable.Races)
        })
    }

    const handleClickDetails = (circuitId) => {
        const url = "http://ergast.com/api/f1/2013/qualifying.json";
        $.get(url, (data) => {
            getRaces(data.MRData.RaceTable.Races.QualifyingResults)
        })
        navigate("/racesGrandPrix", { state: { circuitId: circuitId } });
    }

    return (
        <div>
            <h3>Races Championship - 2013</h3>
            <table>
                <thead>
                    <tr>
                        <th>Round</th>
                        <th>Grand Prix</th>
                        <th>Circuit</th>
                        <th>Date</th>
                        <th>Winner</th>
                    </tr>
                </thead>
                <tbody>
                    {races.map(item => {
                        console.log(item);
                        return (
                            <tr key={item.Circuit.circuitId}>
                                <td>{item.round}</td>
                                <td onClick={() => { handleClickDetails(item.round) }}>{item.raceName}</td>
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

export default Races;