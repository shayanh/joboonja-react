import React from "react";
import SlideShow from "../common/SlideShow";
import './Login.css';

function LoginForm(props) {
    return (
        <div className="login-form">
            <form>
                <h2>ورود</h2>
                <div className="form-group">
                    <input type="email" className="form-control" name="email" placeholder="ایمیل" required="required"/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" name="password" placeholder="رمزعبور"
                           required="required"/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success btn-lg btn-block">ورود</button>
                </div>
            </form>
        </div>
    );
}

class Login extends React.Component {
    render() {
        return (
          <div id="login-main">
              <SlideShow/>
              <LoginForm/>
          </div>
        );
    }
}

export default Login;