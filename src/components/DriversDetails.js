import React, { useState, useEffect } from "react";
import * as $ from "jquery";
import { useLocation } from "react-router-dom";

const DriversDetails = () => {
    const [details, getDetails] = useState([]);
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

    return(
        <div>

        </div>
    )
}

export default DriversDetails;