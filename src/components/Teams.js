import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Flag from 'react-flagkit';


const Teams = () => {
    const [teamsDetails, setTeams] = useState([]);
    const [flagsDetails, setFlags] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        addTeams()
    }, [])
    const addTeams = async () => {
        const urlTeams = "http://ergast.com/api/f1/2013/constructorStandings.json";
        const urlFlags = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json"
        const responseTeams = await fetch (urlTeams);
        const responseFlags = await fetch (urlFlags);
        const teamsX = await responseTeams.json();
        const flagsX = await responseFlags.json();
        setTeams(teamsX.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        setFlags(flagsX)
    }

    const handleClickDetails = (constructorId) => {
        navigate("/teamsForumla1Results", { state: { constructorId: constructorId } });
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th colSpan={3}>Constructor Championship Standings - 2013</th>
                    </tr>
                </thead>
                <tbody>
                    {teamsDetails.map(item => {
                        return (
                            <tr key={item.Constructor.constructorId}>
                                <td>{item.position}</td>
                                <td onClick={() => { handleClickDetails(item.Constructor.constructorId) }}>
                                    {flagsDetails.map((flag,i) =>{
                                        if(item.Constructor.nationality === flag.nationality){
                                            return <Flag key={i} country={flag.alpha_2_code}/>}
                                            else if(item.Constructor.nationality === "British" && flag.nationality === "British, UK") {
                                                return (<Flag key ={i}country="GB" />)
                                            }
                                    })}
                                    {item.Constructor.name}
                                    </td>
                                <td><a href={item.Constructor.url} target="_blank">Details</a></td>
                                <td>{item.points}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default Teams;