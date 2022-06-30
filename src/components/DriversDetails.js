import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CircleLoader } from "react-spinners";

const DriversDetails = () => {
    const [details, setDetails] = useState([]);
    const [races, setRaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        getDriverDetails();
    }, [])

    const getDriverDetails = async () => {
        const id = location.state.driverId;
        const driversUrl = `http://ergast.com/api/f1/2013/drivers/${id}/driverStandings.json`;
        const raceUrl = `http://ergast.com/api/f1/2013/drivers/${id}/results.json`;

        const resposeDriver = await fetch(driversUrl);
        const driverDetails = await resposeDriver.json();
        const responseRace = await fetch(raceUrl);
        const raceDetails = await responseRace.json();
        setDetails(driverDetails.MRData.StandingsTable.StandingsLists[0].DriverStandings)
        setRaces(raceDetails.MRData.RaceTable.Races)
        setIsLoading(false)
    }
    
    if(isLoading) {
        return(<CircleLoader size={70} color="green" />)
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