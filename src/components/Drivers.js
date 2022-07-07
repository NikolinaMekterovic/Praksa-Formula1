import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Flag from "react-flagkit";
import Loader from "./Loader";
import NavBar from "./NavBar";

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [flagsDetails, setFlags] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        addDrivers() 
        return () => {
            // setDrivers(drivers)
            console.warn(drivers)
        }
    }, [])

    const addDrivers = async () => {
        const url = "http://ergast.com/api/f1/2013/driverStandings.json"
        const urlFlags = `https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json`;
        const responseUrl = await fetch(url);
        const responseFlags = await fetch(urlFlags);
        const urlX = await responseUrl.json();
        const flagsX = await responseFlags.json();
        setDrivers(urlX.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setFlags(flagsX);
        setIsLoading(false);
    }

    // const selected = crumb => {
    //     console.log(crumb);
    // }

    const handleSearch = (textSearch) => {
        const driversNames = drivers.filter((item) => {
            return item.Driver.givenName.indexOf(textSearch) !== -1 
            || item.Driver.familyName.indexOf(textSearch) !== -1 
            || item.Driver.givenName.toLowerCase().indexOf(textSearch) !== -1
            || item.Driver.familyName.toLowerCase().indexOf(textSearch) !== -1
        });
        setDrivers(driversNames);
        // console.warn(driversNames);
        // setDrivers(driversNames);
    }

    const handleClickDetails = (driverId) => {
        navigate("/driverDetails", { state: { driverId: driverId } });
    }

    if (isLoading) {
        return (<Loader />)
    }

    const breadCrumb = [{title:"Drivers", url:"/"}];

    return (
        <div>
            <NavBar handleSearch={handleSearch} breadCrumb={breadCrumb} />
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