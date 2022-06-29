import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


const TeamsFormula1Results = () => {
    const [formulaDetails, setformulaDetails] = useState([]);
    const [formulaResults, setFormulaResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        order66();
    }, [])

    const order66 = async () => {
        const id = location.state.constructorId;
        const urlDetails = `http://ergast.com/api/f1/2013/constructors/${id}/constructorStandings.json`;
        const urlResults = `http://ergast.com/api/f1/2013/constructors/${id}/results.json`;
        const flags = `https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json`;
        const responseDetails = await fetch(urlDetails);
        const responseResults = await fetch(urlResults);
        const detailsX = await responseDetails.json();
        const resultsX = await responseResults.json();
        setformulaDetails(detailsX.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        setFormulaResults(resultsX.MRData.RaceTable.Races);
        setIsLoading(false);
    }
    if (isLoading) {
        return (<h1>Is loading...</h1>);
    }
    return (

        <div>
            <table>
                {formulaDetails.map(item => {
                    return(
                    <tbody>
                        <tr>
                            <td colSpan="2">{item.Constructor.name}</td>
                            <td>Country:{item.Constructor.nationality}</td>
                            <td>Position:{item.position}</td>
                            <td>Points:{item.points}</td>
                            <td><a href={item.Constructor.url} target="_blank">History</a></td>
                        </tr>
                    </tbody>
                    );
                })}
            </table>
            <table>
                <thead>
                    <tr>Formula 1</tr>
                    <tr>
                        <th>Round</th>
                        <th>Grand Prix</th>
                        <th>{formulaResults[0].Results[0].Driver.familyName}</th>
                        <th>{formulaResults[0].Results[1].Driver.familyName}</th>
                        <th>Points</th>
                    </tr>
                </thead>
                {formulaResults.map((item=>{
                    return(
                        <tbody>
                            <tr>
                                <td>{item.round}</td>
                                <td>{item.raceName}</td>
                                <td>{item.Results[0].position}</td>
                                <td>{item.Results[1].position}</td>
                                <td>{parseInt(item.Results[0].points) + parseInt(item.Results[1].points)}</td>
                            </tr>
                        </tbody>
                    );
                }))}
            </table>
        </div>
    );
}

export default TeamsFormula1Results;
