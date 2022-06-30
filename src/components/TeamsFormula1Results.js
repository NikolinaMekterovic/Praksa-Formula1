import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Flag from 'react-flagkit';


const TeamsFormula1Results = () => {
    const [formulaDetails, setformulaDetails] = useState([]);
    const [formulaResults, setFormulaResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [flagsDetails, setFlags] = useState([])
    const location = useLocation();

    useEffect(() => {
        order66();
    }, [])

    const order66 = async () => {
        const id = location.state.constructorId;
        const urlDetails = `http://ergast.com/api/f1/2013/constructors/${id}/constructorStandings.json`;
        const urlResults = `http://ergast.com/api/f1/2013/constructors/${id}/results.json`;
        const urlFlags = `https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json`;
        const responseDetails = await fetch(urlDetails);
        const responseResults = await fetch(urlResults);
        const responseFlags = await fetch(urlFlags)
        const detailsX = await responseDetails.json();
        const resultsX = await responseResults.json();
        const flagsX = await responseFlags.json();
        setformulaDetails(detailsX.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        setFormulaResults(resultsX.MRData.RaceTable.Races);
        setFlags(flagsX);
        setIsLoading(false);
    }

    if (isLoading) {
        return (<h1>Is loading...</h1>);
    }

    return (
        <div>
            <table>
                {formulaDetails.map(item => {
                    return (
                        <tbody>
                            <tr key={item.Constructor.constructorId}>
                                <td><img src={require(`./../img/teams/${item.Constructor.constructorId}.png`).default} /></td>
                                <td colSpan="2">{item.Constructor.name}</td>
                                <td>{flagsDetails.map((flag,i) => {
                                    if (item.Constructor.nationality === flag.nationality) {
                                        return <Flag key ={i} country={flag.alpha_2_code} />
                                    }else if(item.Constructor.nationality === "British" && flag.nationality === "British, UK") {
                                        return (<Flag key ={i}country="GB" />)
                                    }
                                })}
                                </td>
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
                {formulaResults.map((item => {
                    return (
                        <tbody>
                            <tr key={item.Circuit.circuitId}>
                                <td>{item.round}</td>
                                <td>
                                {flagsDetails.map((flag, i) => {
                                        if (item.Circuit.Location.country === flag.en_short_name) {
                                            return <Flag key={i} country={flag.alpha_2_code} />
                                        } else if (item.Circuit.Location.country === "UK" && flag.en_short_name === "United Kingdom of Great Britain and Northern Ireland") {
                                            return (<Flag key={i} country="GB" />)
                                        }else if (item.Circuit.Location.country === "USA" && flag.en_short_name === "United States of America") {
                                            return (<Flag key={i} country="US" />)
                                        }else if (item.Circuit.Location.country === "Korea" && flag.en_short_name === "Korea (Democratic People's Republic of)") {
                                            return (<Flag key={i} country="KR" />)
                                        }else if (item.Circuit.Location.country === "UAE" && flag.en_short_name === "United Arab Emirates") {
                                            return (<Flag key={i} country="AE" />)
                                        }
                                    })}
                                    {item.raceName}</td>
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
