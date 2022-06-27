import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/main.css";
import "./scss/styles.scss";

var root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App propString= "String"/>);