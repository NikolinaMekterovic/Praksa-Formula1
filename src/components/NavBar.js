import React from "react";
import { useState } from "react";
import { HomeOutlined } from '@ant-design/icons';

const NavBar = (props) => {

    const [inputText, setInputText] = useState("");


    const handleSearchDetails = () => {
        props.handleSearch(inputText);
        setInputText("");
    }

    const isLast = (index) => {
        return index === props.crumbs.length - 1;
    }

    return (
        <div className="navContainer">
            <a href="https://f1feederseries.com/" target="_blank" className="navFeederHome">{<HomeOutlined />} F-1 Feeder</a>
            <div>
                <nav>
                    <ol>
                        {props.crumbs.map((crumb, i) => {
                            const disabled = isLast(i) ? "disabled" : "";
                            return (
                                <li
                                    key={i}>
                                    <button className={`${disabled}`} 
                                    onClick={() => props.selected(crumb)}>
                                        {crumb}
                                    </button>
                                </li>
                            )
                        })}
                    </ol>
                </nav>
            </div>
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