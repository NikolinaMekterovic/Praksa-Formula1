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
            getDetails(data)
        })
    }

    useEffect(() => {
        addRaces()
     }, [])
     const addRaces = () => {
         const url = "http://ergast.com/api/f1/2013/results/1.json";
         $.get(url, (data) => {
             getRaces(data.MRData.RaceTable.Races)
         })
     }

    return (
        <div>
            {/* <table>
                <tbody>
                    {details.map(driver => {
                        return(
                            <tr>
                            <td>{details.givenName}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        )
                    })}
               
                </tbody>    
            </table> */}

            
            <table>
                <thead>
                    <tr>
                        <th colSpan={5}>Formula 1 2013 Results</th>
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