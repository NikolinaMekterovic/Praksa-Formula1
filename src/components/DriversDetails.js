import React, { useState, useEffect } from "react";
import * as $ from "jquery";
import { useLocation } from "react-router-dom";

const DriversDetails = () => {
    const [details, getDetails] = useState([]);
    const [races, getRaces] = useState([])
    // const [pictures, getPictures] = useState([]);
    const location = useLocation();

    useEffect(() => {
        addDetails();
    }, [])

    const addDetails = () => {
        const id = location.state.driverId;
        console.log(id);
        const url = `http://ergast.com/api/f1/2013/drivers/${id}/driverStandings.json`;

        $.get(url, (data) => {
            getDetails(data.MRData.StandingsTable.StandingsLists[0].DriverStandings)
        })
    }

    useEffect(() => {
        addRaces()
    }, [])

    const addRaces = () => {
        const id = location.state.driverId;
        const url = `http://ergast.com/api/f1/2013/drivers/${id}/results.json`
        $.get(url, (data) => {
            console.log("results", data)
            getRaces(data.MRData.RaceTable.Races)
        })
    }

    return (
        <div>
            <div>
                {details.map(driver => {
                    console.log("map details", driver);
                    return (
                        <div key={driver.position}>
                            <img src={require(`./../img/drivers/${driver.Driver.driverId}.jpg`).default} />
                            <img src={"./../img/drivers/Adrian_Sutil.jpg"} alt="" />
                            <p>{driver.Driver.givenName}</p>
                            <p>{driver.Driver.familyName}</p>
                            <p>{driver.Driver.nationality}</p>
                            <p>{driver.Constructors[0].name}</p>
                            <p>{driver.Driver.dateOfBirth}</p>
                            <p>Biografy {driver.Driver.url}</p>
                        </div>
                    )
                })}


            </div>

            <table>
                <thead>
                    <tr>
                        <td colSpan={5}>Formula 1 2013 Results</td>
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
                        console.log(item);
                        return (
                            <tr key={item.round}>
                                <td>{item.round}</td>
                                <td>{item.raceName}</td>
                                <td>{item.Results[0].Constructor.name}</td>
                                <td>{item.Results[0].grid}</td>
                                <td>{item.Results[0].position}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default DriversDetails;