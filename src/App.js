import React, {Component} from 'react';
import NavBar from './common/NavBar';
import Footer from "./common/Footer";
import Profile from "./profile/Profile";
import {ToastContainer} from "react-toastify";
import {Route} from "react-router-dom";

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
                <NavBar/>

                <Route path='/users/:id' render={(props) => <Profile {...props} loggedInUser={"1"}/>} />

                <Footer/>
            </div>
        );
    }
}

export default App;
