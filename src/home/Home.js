import React from "react";
import BlueBar from "../common/BlueBar";
import './Home.css';

function JobOonjaTitle(props) {
    return (
        <div>
            <div id="joboonja-title" className="text-right">
                جاب‌اونجا خوب است!
            </div>
            <div id="joboonja-desc" className="text-right">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک
                است. چاپگرها و متون بلکه روزنامه و مجله در
            </div>
        </div>
    );
}

function SearchInput(props) {
    return (
        <div id="searchDiv" className="text-center">
            <input type="text" placeholder="جستجو در جاب‌اونجا"/>
        </div>
    );
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const defaultHTML = (
            <div>
                <BlueBar/>
                <div className="container-fluid" id="main-home">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <JobOonjaTitle/>
                                <SearchInput/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        return defaultHTML;
    }
}

export default Home;