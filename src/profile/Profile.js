import React from "react";
import axious from 'axios';
import './Profile.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        axious.get('http://localhost:8080/skill-names').then(res => {
            const skills = res.data;
            this.setState({
                skills: skills,
            });
        }).catch(err => {
            toast.error("Cannot get skills list: " + err.toString());
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
        console.log(this.props.user);
        axious.post("http://localhost:8080/users/" + this.props.user + "/skills", newSkill).then(() => {
            toast.success("Successfully added");
            this.props.updater();
        }).catch(err => {
            toast.error("Cannot add skill: " + err.toString())
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

function Skill(props) {
   return (
        <div className="skill-individual rounded">
            <span className="skill-text text-center">{props.skill.name.name}</span>
            <button className={"point-box " + props.cssClass} value={props.skill.name.name} onClick={props.onClickFn}><span>{props.skill.point}</span></button>
        </div>
   );
}

function SkillsList(props) {
    const skills = props.skills || [];
    console.log(skills);
    return (
        <div className="col-md-12">
            <div className="skills">
                {skills.map((skill, i) => (
                    <Skill key={i} skill={skill} onClickFn={props.onClickFn} cssClass={props.cssClass}/>
                ))}
            </div>
        </div>
    );
}

class Profile extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            profileData: {},
            hasError: false,
        };
        this.deleteSkill = this.deleteSkill.bind(this);
        this.updateSkills = this.updateSkills.bind(this);
    }

    deleteSkill(event) {
        const userID = this.props.match.params.id;
        const skillName = event.target.value;
        axious.delete("http://localhost:8080/users/" + userID + "/skills?skill-name=" + skillName).then(() => {
            toast.info(skillName + " skill deleted");
            this.updateSkills()
        }).catch(err => {
            toast.error("Cannot delete skill: " + err.toString())
        })
    }

    updateSkills() {
        const userID = this.props.match.params.id;
        const profileData = Object.assign({}, this.state.profileData);
        axious.get('http://localhost:8080/users/' + userID + "/skills").then(res => {
            profileData.skills = res.data;
            this.setState({
                profileData: profileData,
            })
        })
    }

    componentDidMount() {
        const userID = this.props.match.params.id;
        axious.get('http://localhost:8080/users/' + userID).then(res => {
            const profileData = res.data;
            console.log(profileData);
            this.setState({
                profileData: profileData,
            })
        }).catch(err => {
            this.setState({
                hasError: true,
            });
            toast.error(err.toString());
        })
    }

    render() {
        const defaultHTML = (
            <div className="container-fluid" id="main">
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
                    <div className="row">
                        <div className="col-md-8">
                            <AddNewSkill user={this.props.loggedInUser} updater={this.updateSkills}/>
                        </div>
                    </div>
                    <div className="row" id="skills-row">
                        <SkillsList skills={this.state.profileData["skills"]} onClickFn={this.deleteSkill} cssClass="deletable" />
                    </div>
                </div>
            </div>
        );

        if (this.state.hasError) {
            return <div className="container-fluid" id="main"/>;
        } else {
            return defaultHTML;
        }
    }
}

export default Profile;