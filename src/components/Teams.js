import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Flag from 'react-flagkit';
import Loader from "./Loader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import NavBar from "./NavBar";

const Teams = () => {
    const [teamsDetails, setTeams] = useState([]);
    const [flagsDetails, setFlags] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [crumbs, setCrumbs] = useState(["Teams", "/teams"]);

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

    const selected = crumb => {
        console.log(crumb);
    }

    const handleSearch = (textSearch) => {
        const teamsNames = teamsDetails.filter((item) => {
            return item.Constructor.name.indexOf(textSearch) !== -1
            || item.Constructor.name.toLowerCase().indexOf(textSearch) !== -1
        });
        setTeams(teamsNames);
    }

    const handleClickDetails = (constructorId) => {
        navigate("/teamsForumla1Results", { state: { constructorId: constructorId } });
    }
    if (isLoading) {
        return (<Loader size={70} color="green" />)
    }

    const breadCrumb = [{title:"Teams", url:"/teams"}];

    return (
        <div className="tabeleContainer">
            <NavBar handleSearch={handleSearch} breadCrumb={breadCrumb} selected={selected} />
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
                                <td className="tdr" onClick={() => { handleClickDetails(item.Constructor.constructorId) }}>
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
    )
}

export default Teams;