import React from "react";
import axios from 'axios';
import BlueBar from "../common/BlueBar";
import './Home.css';
import {toast} from 'react-toastify';
import {Link} from "react-router-dom";
import {getRemainingTime} from "../common/utils";

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
        <input type="text" placeholder="جستجو نام کاربر" className="bg-light shadow-sm user-search"/>
    );
}

function UserCard(props) {
    return (
        <Link to={'/users/' + props.user.id} style={{ textDecoration: 'none' }}>
            <div className="home-user-card">
                <img className="home-user-image" src={props.user.profilePictureURL} alt="user"/>
                <div>
                    <div className="home-user-name text-right">
                        {props.user.firstName + " " + props.user.lastName}
                    </div>
                    <div className="home-user-job text-right">
                        {props.user.jobTitle}
                    </div>
                </div>
            </div>
        </Link>
    );
}

function UsersList(props) {
    const users = props.users || [];
    return (
        <div>
            {users.map((user, i) => (
                <UserCard key={i} user={user}/>
            ))}
        </div>
    );
}

function SmallSkill(props) {
    return (
        <div className="home-project-skill border">
            {props.skill.name.name}
        </div>
    );
}

function SmallSkillsList(props) {
    const skills = props.skills || [];
    return (
        <div className="home-project-skills text-right">
            مهارت‌ها:
            {skills.map((skill, i) => (
                <SmallSkill key={i} skill={skill}/>
            ))}
        </div>
    )
}

class ProjectCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            duration: new Date(0),
        };
        this.updateDuration = this.updateDuration.bind(this);
    }

    updateDuration() {
        this.setState({
            duration: new Date(this.props.project.deadline - Date.now()),
        })
    }

    componentDidMount() {
        setInterval(this.updateDuration, 1000);
    }

    render() {
        const project = this.props.project;
        const finished = Date.now() > project.deadline;

        let timeBadge;
        let projectClass;
        if (finished) {
            projectClass = "disabled-project";
            timeBadge = (
                <div className="home-project-time-remaining finished text-center">
                    مهلت تمام شده
                </div>
            );
        } else {
            timeBadge = (
                <div className="home-project-time-remaining text-center">
                    زمان باقیمانده:
                    &nbsp;
                    {getRemainingTime(this.state.duration)}
                </div>
            );
        }

        return (
            <Link to={'/projects/' + project.id} style={{ textDecoration: 'none' }}>
                <div className={"home-project-card " + projectClass}>
                    <img className="home-project-img border" src={project.imageUrl} alt="project"/>
                    <div>
                        <div className="home-project-firstrow">
                            <div className="home-project-title text-right">
                                {project.title}
                            </div>
                            {timeBadge}
                        </div>
                        <div className="home-project-desc text-right">
                            {project.description}
                        </div>
                        <div className="home-project-budget text-right">
                            بودجه:
                            &nbsp;
                            {project.budget}
                            &nbsp;
                            تومان
                        </div>
                        <SmallSkillsList skills={project.skills}/>
                    </div>
                </div>
            </Link>
        );
    }
}

function ProjectsList(props) {
    const projects = props.projects || [];
    return (
        <div>
            {projects.map((project, i) => (
                <ProjectCard key={i} project={project}/>
            ))}
        </div>
    )
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            projects: [],
            hasError: false,
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8080/users").then(res => {
            const users = res.data;
            this.setState({
                users: users,
            });
            console.log(users);
        }).catch(err => {
            this.setState({
                hasError: true,
            });
            toast.error(err.message);
        });
        axios.get("http://localhost:8080/projects").then(res => {
            const projects = res.data;
            this.setState({
                projects: projects,
            })
        }).catch(err => {
            this.setState({
                hasError: true,
            });
            toast.error(err.message);
        });
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
                                    <UsersList users={this.state.users}/>
                                </div>
                                <div className="col-sm-9">
                                    <ProjectsList projects={this.state.projects}/>
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

export default Home;