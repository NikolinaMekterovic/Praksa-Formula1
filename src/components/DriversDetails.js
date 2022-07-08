import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./Loader"
import Flag from 'react-flagkit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import NavBar from "./NavBar";

const DriversDetails = () => {
    const [details, setDetails] = useState([]);
    const [races, setRaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [flagsDetails, setFlags] = useState([]);
    const location = useLocation();

    useEffect(() => {
        getDriverDetails();
    }, [])

    const getDriverDetails = async () => {
        const id = location.state.driverId;
        const driversUrl = `http://ergast.com/api/f1/2013/drivers/${id}/driverStandings.json`;
        const raceUrl = `http://ergast.com/api/f1/2013/drivers/${id}/results.json`;
        const urlFlags = `https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json`;
        const resposeDriver = await fetch(driversUrl);
        const driverDetails = await resposeDriver.json();
        const responseRace = await fetch(raceUrl);
        const raceDetails = await responseRace.json();
        const responseFlags = await fetch(urlFlags)
        const flagsX = await responseFlags.json();
        setDetails(driverDetails.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setRaces(raceDetails.MRData.RaceTable.Races)
        setFlags(flagsX);
        setIsLoading(false)
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

    const breadCrumb = [{title: "Drivers", url:"/"},
                    {title: details[0].Driver.givenName + " " + details[0].Driver.familyName, url:""}
                ]
    return (
        <div>
            <div className="navContainer"><NavBar breadCrumb={breadCrumb}/></div>
            <div className="divDetails">
                <div className="leftSide">
                    {details.map(driver => {
                        return (
                            <div key={driver.position}>
                                <div className="imgFlag">
                                    <div className="data1">
                                        <img src={require(`./../img/drivers/${driver.Driver.driverId}.jpg`).default} className="imgDrivers" />
                                    </div>
                                    <div className="flag data2">
                                        <p>{flagsDetails.map((flag, i) => {
                                            if (driver.Driver.nationality === flag.nationality) {
                                                return <Flag key={i} country={flag.alpha_2_code} />
                                            } else if (driver.Driver.nationality === "British" && flag.nationality === "British, UK") {
                                                return (<Flag key={i} country="GB" />)
                                            } else if (driver.Driver.nationality === "Dutch" && flag.nationality === "Dutch, Netherlandic") {
                                                return (<Flag key={i} country="NL" />)
                                            }
                                        })}</p>
                                        <p>{driver.Driver.givenName}</p>
                                        <p>{driver.Driver.familyName}</p>
                                    </div>
                                </div>
                                <div className="podaci">
                                    <div className="data3">
                                        <p>Country:</p>
                                        <p>Team:</p>
                                        <p>Birth:</p>
                                        <p>Biography:</p>
                                    </div>
                                    <div className="data4">
                                        <p>{driver.Driver.nationality}</p>
                                        <p>{driver.Constructors[0].name}</p>
                                        <p>{driver.Driver.dateOfBirth}</p>
                                        <p><a href={driver.Driver.url} target="_blank" className="iconDet"><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a></p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <table className="driversTable">
                    <thead>
                        <tr>
                            <td colSpan={5} className="subTitle">Formula - 1 2013 Results</td>
                        </tr>
                        <tr>
                            <th>Round</th>
                            <th>Grand Prix</th>
                            <th>Team</th>
                            <th>Grid</th>
                            <th>Race</th>
                        </tr>
                    </thead>
                    <tbody>
                        {races.map(item => {
                            return (
                                <tr key={item.round}>
                                    <td>{item.round}</td>
                                    <td>
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
                                        {<span></span>}{item.raceName}
                                    </td>
                                    <td>{item.Results[0].Constructor.name}</td>
                                    <td>{item.Results[0].grid}</td>
                                    <td style={{ "backgroundColor": setColor(item.Results[0].position) }}>{item.Results[0].position}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            </div>
    )
}

export default DriversDetails;