import React from "react";

export default function Navbar(props) {

    

    return (
        <nav className={props.darkMode ? "dark--nav" : "navbar"}>
            <div className="navbar--header">
                <img className="navbar--logo" src="./images/react-logo.png" alt="react-logo" />
                <h1 className="navbar--title">ReactFacts</h1>
            </div>
            <div className="navbar--toggle">
                <h4 className={props.darkMode ? "dark--light" : "mode light"}>Light</h4>
                <div className="navbar--toggle" onClick={props.toggleDarkMode}>
                    <img className="navbar--button" src="./images/radio-button-off.svg" alt="light-mode" />
                    <img className={props.darkMode ? "dark--button" : "navbar--button on"} src="./images/radio-button-on.svg" alt="dark-mode" />
                </div>
               <h4 className={props.darkMode ? "dark--dark" : "mode dark"}>Dark</h4>
            </div>
        </nav>
    )

}