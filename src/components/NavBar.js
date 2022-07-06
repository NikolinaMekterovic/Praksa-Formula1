import React from "react";
import { useState } from "react";

const NavBar = (props) => {

    const [inputText, setInputText] = useState ("");


    const handleSearchDetails =() => {
        props.handleSearch(inputText);
    }

    return(
        <div className="navContainer">
            <div><a href="https://f1feederseries.com/" className="navFeederHome"/>F-1 Feeder</div>
            <div>
                <label htmlFor="search-form">
                    <input 
                        type="search"
                        name="search-form"
                        id="search-form"
                        className="searchInput"
                        placeholder="Search..."
                        value={inputText}
                        onChange={(e)=>setInputText(e.target.value)}/>
                    <input type="button" value="Click" onClick={()=>handleSearchDetails(inputText)}/>
                </label>
            </div>
            
        </div>
    )
}

export default NavBar;