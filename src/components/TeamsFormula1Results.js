import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as $ from "jquery"

const TeamsFormula1Results = () => {
    const [formulaResults, getFormulaResults] = useState([]);
    const location = useLocation();


    useEffect(() => {
        addFormulaResults();
    }, [])

    const addFormulaResults = () => {
        const id = location.state.constructorId;
        console.warn("this is id", id);
        const url = `http://ergast.com/api/f1/2013/constructors/${id}/results.json`;

        $.get(url, (data) => {
            getFormulaResults(data.MRData.RaceTable.Races)
            console.log("results", data)
        })
    }

    return (
        <div>
            <div></div>

            {formulaResults.map(item => {
                console.log("team formula results", item);
                return (
                <table>
                    <thead>
                        <tr>
                            <td>Round</td>
                            <td>Grand Prix</td>
                            <td>{item.Results[0].Driver.familyName}</td>
                            <td>{item.Results[1].Driver.familyName}</td>
                            <td>Points</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{item.round}</td>
                            <td>{item.raceName}</td>
                            <td>{item.Results[0].position}</td>
                            <td>{item.Results[1].position}</td>
                            <td>{parseInt(item.Results[0].points) + parseInt(item.Results[1].points)}</td>
                        </tr>
                    </tbody>
                </table>
                )
            })}


        </div>
    );
}

export default TeamsFormula1Results;