import React from "react";
import { Link } from "react-router-dom";


const NavBar = (props) => {
console.log(window.location.pathname);

    return(
        <div className="navContainer">
            <div><a href="https://f1feederseries.com/" className="navFeederHome"/>F-1 Feeder</div>
            <div><Link to="/" className="navCurrentPage" />{props.pageName}</div>
            <div><input type="search" placeholder="Search" className="navSearch"/></div>
            
        </div>
    )
}

export default NavBar;