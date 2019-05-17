import React from "react";
import {Link, Redirect} from "react-router-dom";
import './SignUp.css';
import SlideShow from "../common/SlideShow";
import axios from 'axios';

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            username: "",
            password: "",
            confirmPassword: "",
            agreed: false,
            errors: {}
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
        console.log(this.state);
        const isValid = this.validate();
        if (isValid) {
            const data = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                username: this.state.username,
                password: this.state.password
            };
            axios.post("http://localhost:8080/users", data).then(res => {
                const token = res.data.token;
                this.props.onSignUp(token);
            });
        }
    }

    validate() {
        let result = true;
        if (this.state.firstName.length === 0 || this.state.lastName.length === 0) {
            result = false;
        }
        if (this.state.username.length === 0 || this.state.password.length === 0 || this.state.confirmPassword.length === 0) {
            result = false;
        }
        if (!this.state.agreed) {
            result = false;
        }
        if (this.state.password !== this.state.confirmPassword) {
            result = false;
        }
        return result;
    }

    render() {
        return (
            <div className="signup-form">
                <form>
                    <h2>ثبت نام</h2>
                    <div className="form-group">
                        <input type="text" className="form-control" name="firstName" placeholder="نام"
                               required="required" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="lastName" placeholder="نام خانوادگی"
                               required="required" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="username" placeholder="نام کاربری"
                               required="required" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="password" placeholder="رمزعبور"
                               required="required" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="confirmPassword"
                               placeholder="تکرار رمز عبور" required="required" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label className="checkbox-inline"><input name="agreed" type="checkbox" required="required" onChange={this.handleChange}/>
                            قوانین سایت
                            جاب‌اونجا
                            را می‌پذیرم.
                        </label>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-success btn-lg btn-block" onClick={this.handleSubmit}>
                            ثبت نام
                        </button>
                    </div>
                    <div className="text-center">
                        عضو جاب‌اونجا هستید؟
                        &nbsp;
                        <Link to="/login">
                            ورود
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

function SignUp(props) {
    if (props.loggedIn) {
        return <Redirect to="/" />
    }
    return (
        <div id="sign-up-main">
            <SlideShow/>
            <SignUpForm onSignUp={props.onSignUp}/>
        </div>
    );
}

export default SignUp;