import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CircleLoader } from "react-spinners";

const GrandPrix = () => {
    const [grandPrix, setGrandPrix] = useState([]);
    const [races, setRaces] = useState([]);
    const [resultRaces, setResultRaces] = useState([]);
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        getRaceDetails();
    }, [])

    const getRaceDetails = async () => {
        const id = location.state.circuitId;
        const grandPrixUrl = `http://ergast.com/api/f1/2013/${id}/results.json`;
        const qualifyingUrl = `http://ergast.com/api/f1/2013/${id}/qualifying.json`;
        const resultsUrl = `http://ergast.com/api/f1/2013/${id}/results.json`;
        const responseGrandPrix = await fetch(grandPrixUrl);
        const prix = await responseGrandPrix.json();
        const responseQualifying = await fetch(qualifyingUrl);
        const qualifying = await responseQualifying.json();
        const responseResults = await fetch(resultsUrl);
        const results = await responseResults.json();
        setGrandPrix(prix.MRData.RaceTable.Races);
        setRaces(qualifying.MRData.RaceTable.Races[0].QualifyingResults);
        setResultRaces(results.MRData.RaceTable.Races[0].Results);
        setIsLoading(false)
    }

    // console.log("resultRaces", resultRaces)
    if (isLoading) {
        return (<CircleLoader size={70} color="green" />)
    }

    return (
        <div>
            <div>
                {grandPrix.map(item => {
                    return (
                        <div key={item.Circuit.circuitId}>
                            <h3>{item.raceName}</h3>
                            <p>Country: {item.Circuit.Location.country}</p>
                            <p>Location:{item.Circuit.Location.locality}</p>
                            <p>Date:{item.date}</p>
                            <p>Full report </p>

                        </div>

                    )
                })}


            </div>
            <h3>Qualifying Results</h3>
            <table>
                <thead>
                    <tr>
                        <th>Pos</th>
                        <th>Driver</th>
                        <th>Team</th>
                        <th>Best Time</th>
                    </tr>
                </thead>
                <tbody>
                    {races.map(item => {
                        let times = []
                        times.push(item.Q1);
                        times.push(item.Q2);
                        times.push(item.Q3);
                        times.sort();
                        console.log(times);
                        return (
                            <tr key={item.Driver.driverId}>
                                <td>{item.position}</td>
                                <td>{item.Driver.familyName}</td>
                                <td>{item.Constructor.name}</td>
                                <td>{times[0]}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <h3>Race Result</h3>
            <table>
                <thead>
                    <tr>
                        <td>Pos</td>
                        <td>Driver</td>
                        <td>Team</td>
                        <td>Result</td>
                        <td>Points</td>
                    </tr>
                </thead>
                <tbody>
                    {resultRaces.map(item => {
                        return (
                            <tr key={item.Driver.driverId}>
                                <td>{item.position}</td>
                                <td>{item.Driver.familyName}</td>
                                <td>{item.Constructor.name}</td>
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