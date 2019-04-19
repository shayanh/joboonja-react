import React from "react";
import axios from "axios";
import {toast} from 'react-toastify';
import BlueBar from "../common/BlueBar";
import "./Project.css";
import SkillsList from "../common/SkillsList";
import getRemainingTime from "../common/utils";

function ProjectDetails(props) {
    let deadline;
    if (props.finished) {
        deadline = (
            <div className="deadline deadline-finished">
                <span className="flaticon-deadline"/>
                <span className="icon-text">مهلت تمام شده</span>
            </div>
        );
    } else {
        deadline = (
            <div className="deadline">
                <span className="flaticon-deadline"/>
                <span className="icon-text">
                    زمان باقی‌مانده:
                    &nbsp;
                    <span className="my-not-bold">
                    {getRemainingTime(props.duration)}
                    </span>
                </span>
            </div>
        );
    }
    let winner;
    if (props.data.winner) {
        winner = (
            <div className="winner">
                <span className="flaticon-check-mark"/>
                <span className="icon-text text-center">
                    برنده:
                    &nbsp;
                    {props.data.winner}
                </span>
            </div>
        );
    }

    return (
        <div className="info-box">
            <img className="project-picture img-thumbnail rounded float-right" src={props.data.imageUrl}
                 alt="project pic"/>
            <div className="info-box-inside">
                <div className="title">
                    {props.data.title}
                </div>
                {deadline}
                <div className="budget">
                    <span className="flaticon-money-bag"/>
                    <span className="icon-text">
                        بودجه:
                        &nbsp;
                        {props.data.budget}
                        &nbsp;
                        تومان
                    </span>
                </div>
                {winner}
                <div className="description-starter">
                    توضیحات
                </div>
                <div className="description">
                    {props.data.description}
                </div>
            </div>
        </div>
    );
}

class AddBid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value,
        });
    }

    handleSubmit(event) {
        const bidRequest = {
            bidAmount: parseInt(this.state.value),
        };
        if (isNaN(bidRequest.bidAmount)) {
            toast.error("Invalid input");
        } else {
            axios.post("http://localhost:8080/projects/" + this.props.project + "/bid", bidRequest).then(() => {
                toast.success("Bid added");
                this.props.updater();
            }).catch(err => {
                toast.error("Cannot add bid: " + err.message);
            });
        }
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="bid-title">ثبت پیشنهاد</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="bid-input">
                            <input type="text" onChange={this.handleChange} className="bid-text-box" placeholder="پیشنهاد خود را وارد کنید"/>
                            <span id="toman">تومان</span>
                        </div>
                        <button className="bid-button" type="submit" onClick={this.handleSubmit}>ارسال</button>
                    </div>
                </div>
            </div>
        );
    }
}

function BidDetails(props) {
    let content;
    if (props.bidBefore) {
        content = (
            <div className="row">
                <div className="col-sm-12">
                    <div className="already-bid">
                        <span className="flaticon-check-mark"/>
                        <span>شما قبلا پیشنهاد خود را ثبت کرده‌اید</span>
                    </div>
                </div>
            </div>
        );
    } else if (props.finished) {
        content = (
            <div className="row">
                <div className="col-sm-12">
                    <div className="bidding-finished">
                        <span className="flaticon-danger"/>
                        <span>مهلت ارسال پیشنهاد برای این پروژه به پایان رسیده است!</span>
                    </div>
                </div>
            </div>
        );
    } else {
        content = (
            <AddBid project={props.projectID} user={props.loggedInUser} updater={props.updater}/>
        )
    }

    return (
        <div className="bid-box">
            {content}
        </div>
    );
}

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectData: {},
            hasError: false,
            bidBefore: false,
        };
        this.updateBidDetails = this.updateBidDetails.bind(this);
    }

    componentDidMount() {
        const projectID = this.props.match.params.id;
        axios.get("http://localhost:8080/projects/" + projectID).then(res => {
            const projectData = res.data;
            // console.log(projectData);
            this.setState({
                projectData: projectData,
            })
        }).catch(err => {
            this.setState({
                hasError: true,
            });
            toast.error(err.message);
        });
        this.updateBidDetails();
    }

    updateBidDetails() {
        const projectID = this.props.match.params.id;
        // console.log("update bid details");
        axios.get("http://localhost:8080/projects/" + projectID + "/bid").then(() => {
            this.setState({
                bidBefore: true,
            })
        }).catch(()=>{});
    }

    render() {
        const projectID = this.props.match.params.id;
        const loggedInUser = this.props.loggedInUser;
        const deadline = 1655537257000;
        const finished = Date.now() > deadline; // TODO
        const duration = new Date(deadline - Date.now());
        console.log("Month: " + duration.getMonth());
        console.log("Day: " + duration.getDay());
        console.log(duration.toString());

        const defaultHTML = (
            <div>
                <BlueBar/>
                <div className="container-fluid" id="main-project">
                    <div className="container">
                        <div id="project-box">
                            <div className="row">
                                <div className="col-lg-12">
                                    <ProjectDetails data={this.state.projectData} finished={finished} duration={duration}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="skills-box">
                                        <div className="skills-title text-right">
                                            مهارت‌های لازم:
                                        </div>
                                        <SkillsList skills={this.state.projectData.skills} disabled={true}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <BidDetails bidBefore={this.state.bidBefore} finished={finished}
                                                projectID={projectID} loggedInUser={loggedInUser} updater={this.updateBidDetails}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        if (this.state.hasError) {
            return (
                <div>
                    <BlueBar/>
                    <div className="container-fluid" id="main"/>
                </div>
            );
        } else {
            return defaultHTML;
        }
    }
}

export default Project;