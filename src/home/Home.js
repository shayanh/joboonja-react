import React from "react";
import BlueBar from "../common/BlueBar";
import './Home.css';

function JobOonjaTitle(props) {
    return (
        <div>
            <div id="joboonja-title" className="text-right">
                <b>
                جاب‌اونجا خوب است!
                </b>
            </div>
            <div id="joboonja-desc" className="text-right">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک
                است. چاپگرها و متون بلکه روزنامه و مجله در
            </div>
        </div>
    );
}

function JoboonjaSearch(props) {
    return (
        <div id="joboonja-search" className="search-bar">
            <input type="text" className="search-input" placeholder="جستجو در جاب‌اونجا"/>
            <button className="search-button">جستجو</button>
        </div>
    );
}

function UserSearch(props) {
    return (
        <input type="text" placeholder="جستجو نام کاربر"/>
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
                <BlueBar home={true}/>
                <div className="container-fluid" id="main-home">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                        <div className="home-page-top">
                            <div className="row">
                                <div className="col-sm-12">
                                    <JobOonjaTitle/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-3"/>
                                <div className="col-6">
                                    <JoboonjaSearch/>
                                </div>
                                <div className="col-sm-3"/>
                            </div>
                        </div>
                        </div>
                        </div>
                        <div className="home-page-content">
                            <div className="row">
                                <div className="col-sm-3">
                                    <UserSearch/>
                                </div>
                                <div className="col-sm-9">
                                </div>
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