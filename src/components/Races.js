import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Flag from 'react-flagkit';
import Loader from "./Loader";
import NavBar from "./NavBar";

const Races = () => {
    const [racesDetails, setRaces] = useState([]);
    const [flagsDetails, setFlags] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [crumbs, setCrumbs] = useState(["Races", "Details"]);

    useEffect(() => {
        addRaces()
    }, [])

    const addRaces = async () => {
        const urlRaces = "http://ergast.com/api/f1/2013/results/1.json";
        const urlFlags = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json"
        const responseRaces = await fetch(urlRaces);
        const responseFlags = await fetch(urlFlags);
        const racesX = await responseRaces.json();
        const flagsX = await responseFlags.json();
        setRaces(racesX.MRData.RaceTable.Races);
        setFlags(flagsX);
        setIsLoading(false)
    }

    const selected = crumb => {
        console.log(crumb);
    }

    const handleSearch = (textSearch) => {
        const racesName = racesDetails.filter((item) => {
            return item.raceName.indexOf(textSearch) !== -1
            || item.raceName.toLowerCase().indexOf(textSearch) !== -1
            || item.Circuit.circuitName.indexOf(textSearch) !== -1
            || item.Circuit.circuitName.toLowerCase().indexOf(textSearch) !== -1
        });
        setRaces(racesName);
    }

    const handleClickDetails = (circuitId) => {
        navigate("/racesGrandPrix", { state: { circuitId: circuitId } });
    }

    if (isLoading) {
        return (<Loader size={70} color="green" />)
    }

    return (
        <div>
            <NavBar handleSearch={handleSearch} crumbs={crumbs} selected={selected}/>
            <h1 className="pageTitle">Race Calendar</h1>
            <table className="driversTable driversTableRaces">
                <thead>
                    <tr>
                        <td colSpan={5} className="subTitle">Race Calendar - 2013</td>
                    </tr>
                    <tr>
                        <th>Round</th>
                        <th>Grand Prix</th>
                        <th>Circuit</th>
                        <th>Date</th>
                        <th>Winner</th>
                    </tr>
                </thead>
                <tbody>
                    {racesDetails.map(item => {
                        return (
                            <tr key={item.Circuit.circuitId}>
                                <td>{item.round}</td>
                                <td onClick={() => { handleClickDetails(item.round) }}>
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
                                <td>{item.Circuit.circuitName}</td>
                                <td>{item.date}</td>
                                <td>
                                    {flagsDetails.map((flag, i) => {
                                        if (item.Results[0].Driver.nationality === flag.nationality) {
                                            return <Flag key={i} country={flag.alpha_2_code} />
                                        } else if (item.Results[0].Driver.nationality === "British" && flag.nationality === "British, UK") {
                                            return (<Flag key={i} country="GB" />)
                                        }
                                    })}
                                    {<span></span>}{item.Results[0].Driver.familyName}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Races;