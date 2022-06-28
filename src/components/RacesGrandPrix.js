import React, { useState, useEffect } from "react";
import * as $ from "jquery";
import { useLocation } from "react-router-dom";

const GrandPrix = () => {
    const [races, setRaces] = useState([]);
    const [resultRaces, setResultRaces] = useState([]);
    const location = useLocation();

    useEffect(() => {
        getRaceDetails();
    }, [])

    const getRaceDetails = async () => {
        const id = location.state.circuitId;
        const qualifyingUrl = `http://ergast.com/api/f1/2013/${id}/qualifying.json`;
        const resultsUrl = `http://ergast.com/api/f1/2013/${id}/results.json`;
        const responseQualifying = await fetch(qualifyingUrl);
        const qualifying = await responseQualifying.json();
        const responseResults = await fetch(resultsUrl);
        const results = await responseResults.json();
        setRaces(qualifying.MRData.RaceTable.Races[0].QualifyingResults);
        setResultRaces(results.MRData.RaceTable.Races[0].Results);
    }






        /*const id = location.state.circuitId;
        console.log(id);
        const url = `http://ergast.com/api/f1/2013/${id}/qualifying.json`;
        $.get(url, (data) => {
            console.log("GrandPrix", data.MRData.RaceTable.Races)
            setRaces(data.MRData.RaceTable.Races[0].QualifyingResults);
        })*/


    /*useEffect(() => {
        addRaceResults()
    }, [])

    const addRaceResults = () => {
        const id = location.state.circuitId;
        console.log(id);
        const url = `http://ergast.com/api/f1/2013/${id}/results.json`;
        $.get(url, (data) => {
            // console.log("Results", data.MRData.RaceTable.Races)
            setResultRaces(data.MRData.RaceTable.Races[0].Results);
        })
    }*/

    console.log("resultRaces",resultRaces)
    return (
        <div>
            <h3>Qualifying Results</h3>
            <table>
                <thead>
                    <th>Pos</th>
                    <th>Driver</th>
                    <th>Team</th>
                    <th>Best Time</th>
                </thead>
                <tbody>
                    {races.map(item => {
                        return (
                            <tr>
                                <td>{item.position}</td>
                                <td>{item.Driver.familyName}</td>
                                <td></td>
                                <td></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>


            <h3>Race Result</h3>
                <table>
                <thead>
                    <td>Pos</td>
                    <td>Driver</td>
                    <td>Team</td>
                    <td>Result</td>
                    <td>Points</td>
                </thead>
                <tbody>
                    {resultRaces.map(item => {
                        return (
                            <tr>
                                <td>{item.position}</td>
                                <td>{item.Driver.familyName}</td>
                                <td>{item.Constructor.name}</td>
                                {/* Moze i ternary operator ili upitnici koji pitaju da li podatak postoji, ukoliko postoji prikazace ga a ukoliko ne onda ce ga preskociti */}
                                <td>{item?.Time?.time}</td>
                                <td>{item.points}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default GrandPrix;
