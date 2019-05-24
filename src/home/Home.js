import React from "react";
import axios from 'axios';
import BlueBar from "../common/BlueBar";
import './Home.css';
import {toast} from 'react-toastify';
import {Link, Redirect} from "react-router-dom";
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

class JoboonjaSearch extends React.Component{
    constructor(props) {
        super(props);
        this.state = ({
            value: '',
        });
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value,
        })
    }

    handleSubmit(event) {
        // console.log(this.state.value);
        this.props.onSubmit(this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div id="joboonja-search" className="search-bar">
                <input onChange={this.handleChange} type="text" className="search-input" placeholder="جستجو در جاب‌اونجا"/>
                <button onClick={this.handleSubmit} type="sumbit" className="search-button">جستجو</button>
            </div>
        );
    }
}

class UserSearch extends React.Component{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        // console.log(event.target.value);
        this.props.onUpdate(event.target.value);
    }

    render() {
        return (
            <input onChange={this.handleChange} type="text" placeholder="جستجو نام کاربر" className="bg-light shadow-sm user-search"/>
        );
    }
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
        const jwtDecode = require("jwt-decode");
        let loggedInUser = '';
        if (props.loggedIn) {
            loggedInUser = jwtDecode(props.jwtToken);
        }
        this.state = {
            users: [],
            projects: [],
            start: 0,
            offset: 10,
            projectSearchQuery: '',
            projectsEnded: false,
            hasError: false,
            loggedInUser: loggedInUser
        };
        this.getProjects = this.getProjects.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.onProjectSearchClick = this.onProjectSearchClick.bind(this);
    }

    onProjectSearchClick(query) {
        this.setState({
            start: 0,
            projectsEnded: false,
            projects: [],
            projectSearchQuery: query,
        }, () => {
            this.getProjects();
        });
    }

    getUsers(query) {
        let url = process.env.REACT_APP_SERVER + "/users";
        if (query != null) {
            url = url + "?q=" + encodeURIComponent(query);
        }
        axios.get(url, {headers: {'Authorization': 'Bearer ' + this.props.jwtToken}}).then(res => {
            const users = res.data;
            this.setState({
                users: users,
            });
            // console.log(users);
        }).catch(err => {
            this.setState({
                hasError: true,
            });
            toast.error(err.message);
        });
    }

    getProjects() {
        let url = process.env.REACT_APP_SERVER + "/projects?start=" + this.state.start + "&offset=" + this.state.offset;
        if (this.state.projectSearchQuery !== '') {
            url = url + "&q=" + encodeURIComponent(this.state.projectSearchQuery);
        }
        // console.log(url);
        axios.get(url, {headers: {'Authorization': 'Bearer ' + this.props.jwtToken}}).then(res => {
            const newProjects = res.data;
            // console.log(newProjects);
            const projects = this.state.projects.concat(newProjects);
            const projectsEnded = newProjects.length === 0;
            this.setState({
                projects: projects,
                start: this.state.start + this.state.offset,
                projectsEnded: projectsEnded,
            })
        }).catch(err => {
            this.setState({
                hasError: true,
            });
            toast.error(err.message);
        });
    }

    componentDidMount() {
        if (this.props.loggedIn) {
            this.getUsers();
            this.getProjects();
        }
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
                                            <JoboonjaSearch onSubmit={this.onProjectSearchClick}/>
                                        </div>
                                        <div className="col-sm-3"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="home-page-content">
                            <div className="row">
                                <div className="col-sm-3">
                                    <UserSearch onUpdate={this.getUsers}/>
                                    <UsersList users={this.state.users}/>
                                </div>
                                <div className="col-sm-9">
                                    <ProjectsList projects={this.state.projects}/>
                                </div>
                            </div>
                        </div>
                        {!this.state.projectsEnded &&
                        <div className="row text-center">
                            <div className="col-sm-3"/>
                            <div className="col-sm-9">
                                <button onClick={this.getProjects} type="button" className="load-more-button">ادامه</button>
                            </div>
                        </div>
                        }
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

export default Home;