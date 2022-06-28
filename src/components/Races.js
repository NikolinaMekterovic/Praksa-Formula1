import React, { useState, useEffect } from "react";
import * as $ from "jquery";

const Races = () => {
    const [races, getRaces] = useState([])

    useEffect(() => {
       addRaces()
    }, [])
    const addRaces = () => {
        const url = "http://ergast.com/api/f1/2013/results/1.json";
        $.get(url, (data) => {
            getRaces(data.MRData.RaceTable.Races)
        })
    }

    return(
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
                        {races.map(item => {
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

export default Races;