import React from "react";
import {Link} from "react-router-dom";
import './SignUp.css';
import SlideShow from "../common/SlideShow";

function SignUpForm(props) {
    return (
        <div className="signup-form">
            <form>
                <h2>ثبت نام</h2>
                <div className="form-group">
                    <input type="text" className="form-control" name="firstname" placeholder="نام" required="required"/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="lastname" placeholder="نام خانوادگی"
                           required="required"/>
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" name="email" placeholder="ایمیل" required="required"/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" name="password" placeholder="رمزعبور"
                           required="required"/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" name="confirm_password" placeholder="تکرار رمز عبور"
                           required="required"/>
                </div>
                <div className="form-group">
                    <label className="checkbox-inline"><input type="checkbox" required="required"/>قوانین سایت جاب‌اونجا
                        را می‌پذیرم.
                    </label>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success btn-lg btn-block">ثبت نام</button>
                </div>
                <div className="text-center">
                    عضو جاب‌اونجا هستید؟
                    <Link to="#">
                        ورود
                    </Link>
                </div>
            </form>
        </div>
    );
}

class SignUp extends React.Component {
    render() {
        return (
            <div id="sign-up-main">
                <SlideShow/>
                <SignUpForm/>
            </div>
        );
    }
}

export default SignUp;