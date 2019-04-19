import './BlueBar.css'
import React from "react";

function BlueBar(props) {
    if (props.home) {
        return (
            <div className="container-fluid" id="blue-bar-home">
            </div>
        );
    }
    return (
        <div className="container-fluid" id="blue-bar">
        </div>
    );
}

export default BlueBar;