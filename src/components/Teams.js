import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Flag from 'react-flagkit';
import Loader from "./Loader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";

const Teams = () => {
    const [teamsDetails, setTeams] = useState([]);
    const [results, setResults] = useState([]);
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
        setResults(teamsX.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        setFlags(flagsX)
        setIsLoading(false)
    }

    const handleSearch = (textSearch) => {
        const teamsNames = results.filter((item) => {
            return item.Constructor.name.indexOf(textSearch) !== -1
            || item.Constructor.name.toLowerCase().indexOf(textSearch) !== -1
        });
        setTeams(teamsNames);
    }

    const handleClickDetails = (constructorId) => {
        navigate("/teamsForumla1Results", { state: { constructorId: constructorId } });
    }
    if (isLoading) {
        return (<Loader />)
    }

    const breadCrumb = [{title:"Teams", url:""}];

    return (
        <div>
            <div className="searchButton"><SearchBar handleSearch={handleSearch} /></div>
            <div className="navContainer"><NavBar breadCrumb={breadCrumb} /></div>
                <div className="tabeleContainer">
                    <h1 className="pageTitle">Constructors Championship</h1>
                    <table className="driversTable">
                        <thead>
                            <tr>
                                <td colSpan={4} className="subTitle">Constructor Championship Standings - 2013</td>
                            </tr>
                        </thead>
                        <tbody>
                            {teamsDetails.map(item => {
                                return (
                                    <tr key={item.Constructor.constructorId}>
                                        <td className="tdr">{item.position}</td>
                                        <td className="tdr clickTable" onClick={() => { handleClickDetails(item.Constructor.constructorId) }}>
                                            {flagsDetails.map((flag, i) => {
                                                if (item.Constructor.nationality === flag.nationality) {
                                                    return <Flag key={i} country={flag.alpha_2_code} />
                                                }
                                                else if (item.Constructor.nationality === "British" && flag.nationality === "British, UK") {
                                                    return (<Flag key={i} country="GB" />)
                                                }
                                            })}
                                            {<span></span>}{item.Constructor.name}
                                        </td>
                                        <td className="tdr"><a href={item.Constructor.url} target="_blank" className="icon">Details <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a></td>
                                        <td className="tdr">{item.points}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
        </div>
    )
}

export default Teams;