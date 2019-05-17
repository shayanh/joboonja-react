import React, {Component} from 'react';
import NavBar from './common/NavBar';
import Footer from "./common/Footer";
import Profile from "./profile/Profile";
import {ToastContainer} from "react-toastify";
import {Route} from "react-router-dom";
import Project from "./project/Project";
import Home from "./home/Home";
import SignUp from "./sign-up/SignUp";
import Login from "./login/Login";

class App extends Component {
    constructor(props) {
        super(props);
        if (typeof(Storage) !== "undefined" && localStorage.getItem("jwtToken") !== "null") {
            const token = localStorage.getItem("jwtToken");
            this.state = {
                jwtToken: token,
                loggedIn: true,
            };
        } else {
            this.state = {
                jwtToken: "",
                loggedIn: false,
            };
        }
        console.log("cons");
        this.authenticate = this.authenticate.bind(this);
        this.logout = this.logout.bind(this);
    }

    authenticate(token) {
        console.log("authenticate");
        localStorage.setItem("jwtToken", token);
        this.setState({
            jwtToken: token,
            loggedIn: true,
        })
    }

    logout() {
        localStorage.setItem("jwtToken", "null");
        this.setState({
            jwtToken: "",
            loggedIn: false
        });
    }

    render() {
        console.log(this.state.jwtToken);
        console.log(this.state.loggedIn);
        return (
            <div className="App">
                <ToastContainer/>
                <NavBar loggedIn={this.state.loggedIn} jwtToken={this.state.jwtToken} onLogout={this.logout}/>

                <Route path='/' exact render={(props) => <Home {...props} loggedIn={this.state.loggedIn} jwtToken={this.state.jwtToken}/>} />
                <Route path='/users/:id' render={(props) => <Profile {...props} loggedIn={this.state.loggedIn} jwtToken={this.state.jwtToken}/>} />
                <Route path='/projects/:id' render={(props) => <Project {...props} loggedIn={this.state.loggedIn} jwtToken={this.state.jwtToken}/>} />
                <Route path='/sign-up' exact render={(props) => <SignUp {...props} loggedIn={this.state.loggedIn} onSignUp={this.authenticate} />} />
                <Route path='/login' exact render={(props) => <Login {...props} loggedIn={this.state.loggedIn} onLogin={this.authenticate} />} />

                <Footer/>
            </div>
        );
    }
}

export default App;
