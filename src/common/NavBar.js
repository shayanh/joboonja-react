import './NavBar.css'
import React from "react";
import logo from '../logo_v1.png';

function NavBar(props) {
    return (
        <nav className="navbar navbar-expand-md bg-white navbar-light fixed-top">
            <div className="container">
                <div className="nav navbar-nav">
                    <div className="navbar-brand">
                        <img src={logo} alt="Joboonja"/>
                    </div>
                </div>
                <ul className="nav navbar-nav">
                    <li className="nav-item active">
                        <div className="nav-link">حساب کاربری</div>
                    </li>
                    <li className="nav-item active">
                        <div className="nav-link">خروج</div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;