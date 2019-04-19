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
        this.state = {
            loggedInUser: 1,
        }
    }

    render() {
        return (
            <div className="App">
                <ToastContainer/>
                <NavBar loggedInUser="1"/>

                <Route path='/' exact render={(props) => <Home {...props} loggedInUser={"1"}/>} />
                <Route path='/users/:id' render={(props) => <Profile {...props} loggedInUser={"1"}/>} />
                <Route path='/projects/:id' render={(props) => <Project {...props} loggedInUser={"1"}/>} />
                <Route path='/sign-up' exact component={SignUp} />
                <Route path='/login' exact component={Login} />

                <Footer/>
            </div>
        );
    }
}

export default App;
