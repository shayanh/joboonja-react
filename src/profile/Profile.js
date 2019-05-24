import React from "react";
import axios from 'axios';
import './Profile.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SkillsList from "../common/SkillsList";
import BlueBar from "../common/BlueBar";
import {Redirect} from "react-router-dom";

function ProfilePicture(props) {
    return (
        <div className="col-sm-3 align-self-start">
            <img src={props.pictureURL} id="profile-pic" className="img-fluid" alt="profile pic"/>
        </div>
    );
}

function UserDetails(props) {
    return (
        <div className="col-sm-6">
            <div className="row">
                <div className="col-md-3">
                    <div id="trapezoid-bg"/>
                    <div id="trapezoid-fg"/>
                </div>
            </div>
            <div className="row" id="name">
                <div className="col-sm-12 text-right">
                    <span><b>{props.firstName + " " + props.lastName}</b></span>
                </div>
            </div>
            <div className="row" id="bio">
                <div className="col-sm-12 text-right">
                    <span>{props.jobTitle}</span>
                </div>
            </div>
        </div>
    );
}

function Bio(props) {
    return (
        <div className="col-lg-12 text-right">
            <div id="main-text">
                {props.bio}
            </div>
        </div>
    );
}

class AddNewSkill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: [],
            selectedSkill: {},
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_SERVER + '/skill-names',
            {headers: {'Authorization': 'Bearer ' + this.props.jwtToken}}).then(res => {
            const skills = res.data;
            this.setState({
                skills: skills,
            });
        }).catch(err => {
            toast.error("Cannot get skills list: " + err.message);
        });
    }

    handleChange(event) {
        this.setState({
            selectedSkill: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const newSkill = {
            skillName: this.state.selectedSkill
        };
        axios.post(process.env.REACT_APP_SERVER + "/users/" + this.props.user + "/skills", newSkill,
            {headers: {'Authorization': 'Bearer ' + this.props.jwtToken}}).then(() => {
            toast.success("Successfully added");
            this.props.updater();
        }).catch(err => {
            toast.error("Cannot add skill: " + err.message)
        })
    }

    render() {
        return (
            <div className="add-new-skill-box">
                <div id="skills-title">مهارت‌ها:</div>
                <form id="add-skill-form" onSubmit={this.handleSubmit}>
                    <select id="add-skill-select" defaultValue="default" onChange={this.handleChange}>
                        <option value="default" disabled hidden>-- انتخاب مهارت‌ها --</option>
                        {this.state.skills.map((skill, i) => (
                            <option key={i} value={skill.name} dir="ltr">{skill.name}</option>
                        ))}
                    </select>
                    <button type="submit" id="add-skill-button">افزودن مهارت</button>
                </form>
            </div>
        );
    }
}

class Profile extends React.Component {
    constructor(props) {
        super(props);
        const jwtDecode = require("jwt-decode");
        let loggedInUser = '';
        if (props.loggedIn) {
            loggedInUser = jwtDecode(props.jwtToken).userId;
        }
        this.state = {
            profileData: {},
            hasError: false,
            loggedInUser: loggedInUser
        };
        this.deleteSkill = this.deleteSkill.bind(this);
        this.updateSkills = this.updateSkills.bind(this);
        this.endorseSkill = this.endorseSkill.bind(this);
    }

    deleteSkill(event) {
        const userID = this.props.match.params.id;
        const skillName = event.target.value;
        axios.delete(process.env.REACT_APP_SERVER + "/users/" + userID + "/skills?skill-name=" + encodeURIComponent(skillName),
            {headers: {'Authorization': 'Bearer ' + this.props.jwtToken}}).then(() => {
            toast.info(skillName + " skill deleted");
            this.updateSkills()
        }).catch(err => {
            toast.error("Cannot delete skill: " + err.message)
        })
    }

    endorseSkill(event) {
        const userID = this.props.match.params.id;
        const skillName = event.target.value;
        axios.post(process.env.REACT_APP_SERVER + "/users/" + userID + "/skills/endorsements?skill-name=" + encodeURIComponent(skillName),
            {}, {headers: {'Authorization': 'Bearer ' + this.props.jwtToken}}).then(() => {
            this.updateSkills();
        }).catch(err => {
            toast.error("Cannot endorse skill:" + err.message)
        })
    }

    updateSkills() {
        const userID = this.props.match.params.id;
        const profileData = Object.assign({}, this.state.profileData);
        axios.get(process.env.REACT_APP_SERVER + '/users/' + userID + "/skills",
            {headers: {'Authorization': 'Bearer ' + this.props.jwtToken}}).then(res => {
            profileData.skills = res.data;
            this.setState({
                profileData: profileData,
            })
        })
    }

    getData() {
        const userID = this.props.match.params.id;
        axios.get(process.env.REACT_APP_SERVER + '/users/' + userID,
            {headers: {'Authorization': 'Bearer ' + this.props.jwtToken}}).then(res => {
            const profileData = res.data;
            // console.log(profileData);
            this.setState({
                profileData: profileData,
            })
        }).catch(err => {
            this.setState({
                hasError: true,
            });
            toast.error(err.message);
        })
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.getData();
        }
    }

    render() {
        const userID = this.props.match.params.id;
        const loggedInUser = this.state.loggedInUser;
        const selfProfile = Number(userID) === Number(loggedInUser);
        // console.log(userID);
        // console.log(loggedInUser);
        // console.log(selfProfile);

        let addNewSkill;
        if (selfProfile) {
            addNewSkill = (
                <div className="row">
                    <div className="col-md-8">
                        <AddNewSkill user={userID} updater={this.updateSkills} jwtToken={this.props.jwtToken}/>
                    </div>
                </div>
            )
        }

        const defaultHTML = (
            <div>
                <BlueBar/>
                <div className="container-fluid" id="main-profile">
                    <div className="container">
                        <div className="row">
                            <ProfilePicture pictureURL={this.state.profileData["profilePictureURL"]}/>
                            <UserDetails firstName={this.state.profileData["firstName"]}
                                         lastName={this.state.profileData["lastName"]}
                                         jobTitle={this.state.profileData["jobTitle"]}/>
                        </div>
                        <div className="row" id="main-text-col">
                            <div className="col-lg-12 text-right">
                                <Bio bio={this.state.profileData["bio"]}/>
                            </div>
                        </div>
                        {addNewSkill}
                        <div className="row">
                            <div className="col-md-12">
                                <SkillsList skills={this.state.profileData["skills"]}
                                            onClickFn={selfProfile ? this.deleteSkill : this.endorseSkill}
                                            cssClass={selfProfile ? "deletable" : "endorsable"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        if (!this.props.loggedIn) {
            return <Redirect to='/login'/>;
        } else if (this.state.hasError) {
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

export default Profile;