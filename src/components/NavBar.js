import React from "react";
import { useState } from "react";
import { HomeOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";

const NavBar = (props) => {

    const [inputText, setInputText] = useState("");


    const handleSearchDetails = () => {
        props.handleSearch(inputText);
        setInputText("");
    }

    const isLast = (index) => {
        return index === props.breadCrumb.length - 1;
    }

    return (
        <div className="navContainer">
            <a href="https://f1feederseries.com/" target="_blank" className="navFeederHome">{<HomeOutlined />} F-1 Feeder</a>
            <nav className="top-nav">
                <ul className="breadcrumb">
                    {/* <Link to="/">Home</Link> */}
                    {props.breadCrumb.map((crumb, i) => {
                        const disabled = isLast(i) ? "disabled" : "";
                        return (
                            <li key={i}>
                                <Link to={crumb.url} className={`disabledClass ${ disabled }`}>{crumb.title}  </Link>
                            </li>
                        );
                    })
                    }
                </ul>
            </nav>
            <div>
                <label htmlFor="search-form">
                    <input
                        type="search"
                        name="search-form"
                        id="search-form"
                        className="searchInput"
                        placeholder="Search..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)} />
                    <input type="button" value="Click" onClick={() => handleSearchDetails(inputText)} />
                </label>
            </div>

        </div>
    )
}

export default NavBar;