import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./Loader"
import Flag from 'react-flagkit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

const GrandPrix = () => {
    const [grandPrix, setGrandPrix] = useState([]);
    const [qulifyingRaces, setQualifying] = useState([]);
    const [resultRaces, setResultRaces] = useState([]);
    const [flagsDetails, setFlags] = useState([]);
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
        const urlFlags = `https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json`;
        const responseGrandPrix = await fetch(grandPrixUrl);
        const prix = await responseGrandPrix.json();
        const responseQualifying = await fetch(qualifyingUrl);
        const qualifying = await responseQualifying.json();
        const responseResults = await fetch(resultsUrl);
        const results = await responseResults.json();
        const responseFlags = await fetch(urlFlags);
        const flagsX = await responseFlags.json();
        setGrandPrix(prix.MRData.RaceTable.Races);
        setQualifying(qualifying.MRData.RaceTable.Races[0].QualifyingResults);
        setResultRaces(results.MRData.RaceTable.Races[0].Results);
        setFlags(flagsX);
        setIsLoading(false);
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
            <div className="leftSideRaces">
                {grandPrix.map(item => {
                    return (
                        <div key={item.Circuit.circuitId}>
                            <div className="podaci2">
                                {flagsDetails.map((flag, i) => {
                                    if (item.Circuit.Location.country === flag.en_short_name) {
                                        return <Flag key={i} country={flag.alpha_2_code} />
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
                            </div>
                            <div>
                                <h3>{item.raceName}</h3>
                            </div>
                            <div className="podaci">
                                <div className="data5">
                                    <p>Country:</p>
                                    <p>Location:</p>
                                    <p>Date:</p>
                                    <p>Full report</p>
                                </div>
                                <div className="data5">
                                    <p>{item.Circuit.Location.country}</p>
                                    <p>{item.Circuit.Location.locality}</p>
                                    <p>{item.date}</p>
                                    <p><span><a href={item.Circuit.url} target="_blank"><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a></span></p>
                                </div>
                            </div>
                        </div>

                    )
                })}
            </div>
            <div className="doubleTable">
                <div className="both">
                    <table className="middle">
                        <thead>
                            <tr>
                                <td colSpan={4} className="subTitle">Qualifying Results</td>
                            </tr>
                            <tr>
                                <th>Pos</th>
                                <th>Driver</th>
                                <th>Team</th>
                                <th>Best Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {qulifyingRaces.map(item => {
                                let times = []
                                times.push(item.Q1);
                                times.push(item.Q2);
                                times.push(item.Q3);
                                times.sort();
                                return (
                                    <tr key={item.position}>
                                        <td>{item.position}</td>
                                        <td>
                                            {flagsDetails.map((flag, i) => {
                                                if (item.Driver.nationality === flag.nationality) {
                                                    return <Flag key={i} country={flag.alpha_2_code} />
                                                } else if (item.Driver.nationality === "British" && flag.nationality === "British, UK") {
                                                    return (<Flag key={i} country="GB" />)
                                                }
                                            })}
                                            {item.Driver.familyName}
                                        </td>
                                        <td>{item.Constructor.name}</td>
                                        <td>{times[0]}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <table className="rightSide">
                        <thead>
                            <tr>
                                <td colSpan={5} className="subTitle">Race Result</td>
                            </tr>
                            <tr>
                                <th>Pos</th>
                                <th>Driver</th>
                                <th>Team</th>
                                <th>Result</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultRaces.map(item => {
                                return (
                                    <tr key={item.position}>
                                        <td>{item.position}</td>
                                        <td>
                                            {flagsDetails.map((flag, i) => {
                                                if (item.Driver.nationality === flag.nationality) {
                                                    return <Flag key={i} country={flag.alpha_2_code} />
                                                } else if (item.Driver.nationality === "British" && flag.nationality === "British, UK") {
                                                    return (<Flag key={i} country="GB" />)
                                                }
                                            })}
                                            {item.Driver.familyName}
                                        </td>
                                        <td>{item.Constructor.name}</td>
                                        <td>{item?.Time?.time}</td>
                                        <td style={{ "backgroundColor": setColor(item.points) }}>{item.points}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default GrandPrix;