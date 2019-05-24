import React from "react";
import axios from 'axios';
import SlideShow from "../common/SlideShow";
import './Login.css';
import {Link, Redirect} from "react-router-dom";
import {toast} from 'react-toastify';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            const data = {
                username: this.state.username,
                password: this.state.password
            };
            console.log(process.env.REACT_APP_SERVER);
            axios.post(process.env.REACT_APP_SERVER + "/users/login", data).then(res => {
                const token = res.data.token;
                this.props.onLogin(token);
            }).catch(err => {
                toast.error(err.message);
            })
        }
    }

    validate() {
        if (this.state.username.length === 0 || this.state.password.length === 0) {
            this.setState({
                error: "Please fill all inputs"
            }, () => {
                toast.error(this.state.error);
            });
            return false;
        }
        return true;
    }

    render() {
        return (
            <div className="login-form">
                <form>
                    <h2>ورود</h2>
                    <div className="form-group">
                        <input type="text" className="form-control" name="username" placeholder="نام کاربری"
                               required onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="password" placeholder="رمزعبور"
                               required onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-success btn-lg btn-block" onClick={this.handleSubmit}>
                            ورود
                        </button>
                    </div>
                    <div className="text-center">
                        عضو جاب‌اونجا نیستید؟
                        &nbsp;
                        <Link to="/sign-up">
                            ثبت‌نام
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

function Login(props) {
    if (props.loggedIn) {
        return <Redirect to="/" />
    }
    return (
        <div id="login-main">
            <SlideShow/>
            <LoginForm onLogin={props.onLogin}/>
        </div>
    );
}

export default Login;