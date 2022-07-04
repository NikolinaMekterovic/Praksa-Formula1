import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Flag from 'react-flagkit';
import Loader from "./Loader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare} from '@fortawesome/free-solid-svg-icons';


const TeamsFormula1Results = () => {
    const [formulaDetails, setformulaDetails] = useState([]);
    const [formulaResults, setFormulaResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [flagsDetails, setFlags] = useState([]);
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
        console.warn(detailsX.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.Constructor)
    }

    const setColor = (position) => {
        let color = "";
        switch (position) {
            case "1":
                color = "yellow";
                break;
            case "2":
                color = "gray";
                break;
            case "3":
                color = "orange";
                break;
            case "4":
                color = "lightgreen";
                break;
            case "5":
                color = "lightblue";
                break;
            case "6":
                color = "lavender";
                break;
            case "7":
                color = "lightsolmon";
                break;
            case "8":
                color = "lemonchiffon";
                break;
            case "9":
                color = "lightcoral";
                break;
            case "10":
                color = "lightpink";
                break;
            default:
                color = "darkgrey";
                break;
        }
        return color;
    }

    if (isLoading) {
        return (<Loader size={70} color="green" />)
    }

    return (
        <div className="divDetails">
            <div className="leftSide">
                {formulaDetails.map((item,i) => {
                    return (
                        <div>
                            <div key={i}>
                                <img src={require(`./../img/teams/${item.Constructor.constructorId}.png`).default} className="imgTeams"/>
                                <div className="flag">
                                <p>{flagsDetails.map((flag, i) => {
                                    if (item.Constructor.nationality === flag.nationality) {
                                        return (<Flag key={i} country={flag.alpha_2_code} />)
                                    } else if (item.Constructor.nationality === "British" && flag.nationality === "British, UK") {
                                        return (<Flag key={i} country="GB" />)
                                    }
                                })}
                                </p>
                                <p>{item.Constructor.name}</p>
                                </div>
                                <p>Country:{item.Constructor.nationality}</p>
                                <p>Position:{item.position}</p>
                                <p>Points:{item.points}</p>
                                <p><a href={item.Constructor.url} target="_blank"><FontAwesomeIcon icon={faArrowUpRightFromSquare}/></a></p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <table className="driversTable">
                <thead>
                    <tr>
                        <td colSpan={5} className="subTitle">Formula 1  2013 Results</td>
                        </tr>
                    <tr>
                        <th>Round</th>
                        <th>Grand Prix</th>
                        <th>{formulaResults[0].Results[0].Driver.familyName}</th>
                        <th>{formulaResults[0].Results[1].Driver.familyName}</th>
                        <th>Points</th>
                    </tr>
                </thead>
                {formulaResults.map((item,i) => {
                    return (
                        <tbody>
                            <tr key={i}>
                                <td>{item.round}</td>
                                <td>
                                    {flagsDetails.map((flag, i) => {
                                        if (item.Circuit.Location.country === flag.en_short_name) {
                                            return (<Flag key={i} country={flag.alpha_2_code} />)
                                        } else if (item.Circuit.Location.country === "UK" && flag.en_short_name === "United Kingdom of Great Britain and Northern Ireland") {
                                            return (<Flag key={i} country="GB" />)
                                        } else if (item.Circuit.Location.country === "USA" && flag.en_short_name === "United States of America") {
                                            return (<Flag key={i} country="US" />)
                                        } else if (item.Circuit.Location.country === "Korea" && flag.en_short_name === "Korea (Democratic People's Republic of)") {
                                            return (<Flag key={i} country="KR" />)
                                        } else if (item.Circuit.Location.country === "UAE" && flag.en_short_name === "United Arab Emirates") {
                                            return (<Flag key={i} country="AE" />)
                                        }
                                    })}
                                    {item.raceName}</td>
                                <td style={{ "backgroundColor": setColor(item.Results[0].position) }}>{item.Results[0].position}</td>
                                <td style={{ "backgroundColor": setColor(item.Results[1].position) }}>{item.Results[1].position}</td>
                                <td>{parseInt(item.Results[0].points) + parseInt(item.Results[1].points)}</td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>
        </div>
    );
}

export default TeamsFormula1Results;
