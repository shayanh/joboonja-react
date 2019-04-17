import './NavBar.css'
import React from "react";
import logo from '../logo_v1.png';

function NavBar(props) {
    return (
        <nav className="navbar navbar-expand-md bg-white navbar-light fixed-top">
            <div className="container">
                <div className="nav navbar-nav">
                    <a className="navbar-brand" href="#">
                        <img src={logo} alt="Joboonja"/>
                    </a>
                </div>
                <ul className="nav navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">حساب کاربری</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="#">خروج</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;