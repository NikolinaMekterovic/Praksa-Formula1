import React, { useState, useEffect } from "react";
import * as $ from "jquery";
import { useNavigate } from 'react-router-dom';

const Drivers = () => {
    const [drivers, getDrivers] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        addDrivers()
    }, [])

    const addDrivers = () => {
        const url = "http://ergast.com/api/f1/2013/driverStandings.json"
        $.get(url, (data) => {
            getDrivers(data.MRData.StandingsTable.StandingsLists[0].DriverStandings)
        })
    }

    const handleClickDetails = (driverId) => {
        navigate("/driverDetails", { state: { driverId: driverId } });
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th colSpan={3}>Drivers Championship Standings - 2013</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map(item => {
                        return (
                            <tr key={item.position}>
                                <td>{item.position}</td>
                                <td onClick={() => { handleClickDetails(item.Driver.driverId) }}>{item.Driver.givenName} {item.Driver.familyName}</td>
                                <td>{item.Constructors[0].name}</td>
                                <td>{item.points}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default Drivers;