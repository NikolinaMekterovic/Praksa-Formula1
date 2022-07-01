import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Flag from 'react-flagkit';
import Loader from "./Loader"

const Teams = () => {
    const [teamsDetails, setTeams] = useState([]);
    const [flagsDetails, setFlags] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        addTeams()
    }, [])
    const addTeams = async () => {
        const urlTeams = "http://ergast.com/api/f1/2013/constructorStandings.json";
        const urlFlags = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json"
        const responseTeams = await fetch(urlTeams);
        const responseFlags = await fetch(urlFlags);
        const teamsX = await responseTeams.json();
        const flagsX = await responseFlags.json();
        setTeams(teamsX.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        setFlags(flagsX)
        setIsLoading(false)
    }

    const handleClickDetails = (constructorId) => {
        navigate("/teamsForumla1Results", { state: { constructorId: constructorId } });
    }
    if (isLoading) {
        return (<Loader size={70} color="green" />)
    }
    
    return (
        <div className="divTabele">
            <table className="driversTable">
                <thead>
                <tr>
                        <th colSpan={4}><h1><i>Constructors Championship</i></h1></th>
                    </tr>
                    <tr>
                        <td colSpan={4} className="podNaslov">Constructor Championship Standings - 2013</td>
                    </tr>
                </thead>
                <tbody>
                    {teamsDetails.map(item => {
                        return (
                            <tr key={item.Constructor.constructorId}>
                                <td className="tdr">{item.position}</td>
                                <td className="tdr" onClick={() => { handleClickDetails(item.Constructor.constructorId) }}>
                                    {flagsDetails.map((flag, i) => {
                                        if (item.Constructor.nationality === flag.nationality) {
                                            return <Flag key={i} country={flag.alpha_2_code} />
                                        }
                                        else if (item.Constructor.nationality === "British" && flag.nationality === "British, UK") {
                                            return (<Flag key={i} country="GB" />)
                                        }
                                    })}
                                    {item.Constructor.name}
                                </td>
                                <td className="tdr"><a href={item.Constructor.url} target="_blank">Details</a></td>
                                <td className="tdr">{item.points}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Teams;