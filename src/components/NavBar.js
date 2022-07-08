import React from "react";
import { HomeOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { nodeName } from "jquery";

const NavBar = (props) => {

    return (
        <div className="navBarDetails">
            <a href="https://f1feederseries.com/" target="_blank" className="navFeederHome">{<HomeOutlined />} F-1 Feeder</a>
            <nav className="top-nav">
                <ul className="breadcrumb navDetails">
                    {props.breadCrumb.map((crumb, i) => {
                        if (crumb.url.length == 0) {
                            return (
                                <div key={i}>
                                    <li>
                                        <button
                                            disabled
                                            style={{
                                                textDecoration: "none",
                                                borderRadius: "7px",
                                                backgroundColor: "blue",
                                                border: "none",
                                                marginLeft: "5px",
                                                marginTop: "5px",
                                            }}
                                        >
                                            <Link to={crumb.url}>{crumb.title}</Link>
                                        </button>
                                    </li>
                                </div>
                            );
                        } else {
                            return (
                                <div key={i}>
                                    <li>
                                        <button
                                            style={{
                                                backgroundColor: "grey",
                                                border: "none",
                                                borderRadius: "7px",
                                                marginLeft: "5px",
                                                marginTop: "5px",
                                            }}
                                        >
                                            <Link to={crumb.url}>{crumb.title}</Link>
                                        </button>
                                    </li>
                                </div>
                            );
                        }
                    })}
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;

/*
// return (
                        //     <li key={i}>
                        //         <button disabled={crumb.url === 0}> <Link to={crumb.url} > {crumb.title} </Link></button>
                        //     </li>
                        // );
*/