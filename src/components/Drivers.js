import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Flag from "react-flagkit";
import Loader from "./Loader";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [results, setResults] = useState([]);
    const [flagsDetails, setFlags] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        addDrivers() 
    }, [])

    const addDrivers = async () => {
        const url = "http://ergast.com/api/f1/2013/driverStandings.json"
        const urlFlags = `https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json`;
        const responseUrl = await fetch(url);
        const responseFlags = await fetch(urlFlags);
        const urlX = await responseUrl.json();
        const flagsX = await responseFlags.json();
        setDrivers(urlX.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setResults(urlX.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setFlags(flagsX);
        setIsLoading(false);
    }

    const handleSearch = (textSearch) => {
        const driversNames = results.filter((item) => {
            return item.Driver.givenName.includes(textSearch) 
            || item.Driver.familyName.includes(textSearch) 
            || item.Driver.givenName.toLowerCase().includes(textSearch)
            || item.Driver.familyName.toLowerCase().includes(textSearch)
        });
        setDrivers(driversNames);
    }

    const handleClickDetails = (driverId) => {
        navigate("/driverDetails", { state: { driverId: driverId } });
    }

    if (isLoading) {
        return (<Loader />)
    }

    const breadCrumb = [{ title: "Drivers", url: "" }];
    
    return (
        <div>
            <div className="searchButton"><SearchBar handleSearch={handleSearch} /></div>
            <div className="navContainer"><NavBar breadCrumb={breadCrumb} /></div>
            <h1 className="pageTitle">Drivers Championship</h1>
            <table className="driversTable">
                <thead>
                    <tr>
                        <td colSpan={4} className="subTitle">Drivers Championship Standings - 2013</td>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map(item => {
                        return (
                            <tr key={item.position}>
                                <td className="tdr">{item.position}</td>
                                <td className="tdr" onClick={() => { handleClickDetails(item.Driver.driverId) }}>
                                    {flagsDetails.map((flag, i) => {
                                        if (item.Driver.nationality === flag.nationality) {
                                            return <Flag key={i} country={flag.alpha_2_code} />
                                        } else if (item.Driver.nationality === "British" && flag.nationality === "British, UK") {
                                            return (<Flag key={i} country="GB" />)
                                        } else if (item.Driver.nationality === "Dutch" && flag.nationality === "Dutch, Netherlandic") {
                                            return (<Flag key={i} country="NL" />)
                                        }
                                    })}
                                    {<span></span>} {item.Driver.givenName} {item.Driver.familyName}</td>
                                <td className="tdr">{item.Constructors[0].name}</td>
                                <td className="tdr">{item.points}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Drivers;