import './NavBar.css'
import React from "react";
import logo from '../logo_v1.png';
import {Link} from "react-router-dom";

function NavBar(props) {
    if (!props.loggedIn) {
        return <div/>;
    }

    const jwtDecode = require("jwt-decode");
    // console.log(props.jwtToken);
    const loggedInUser = jwtDecode(props.jwtToken).userId;
    return (
        <nav className="navbar navbar-expand-md bg-white navbar-light fixed-top">
            <div className="container">
                <div className="nav navbar-nav">
                    <Link to='/' className="navbar-brand">
                        <img src={logo} alt="Joboonja"/>
                    </Link>
                </div>
                <ul className="nav navbar-nav">
                    <Link to={'/users/' + loggedInUser} className="nav-item active">
                        <div className="nav-link">حساب کاربری</div>
                    </Link>
                    <Link to='#' className="nav-item active">
                        <div className="nav-link" onClick={props.onLogout}>خروج</div>
                    </Link>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;