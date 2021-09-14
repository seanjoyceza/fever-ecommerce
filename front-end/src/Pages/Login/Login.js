import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Login.css";

// import { login } from "../../actions/auth.actions";
// import { useDispatch, useSelector } from "react-redux";

function Login(props) {
    // const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const auth = useSelector((state) => state.auth);

    //THIS IS WHAT HAPPENS WHEN THE USER CLICKS THE LOGIN BUTTON
    // const userLogin = (e) => {
    //   e.preventDefault();
    //   const user = {
    //     email: email,
    //     password: password,
    //   };
    //   dispatch(login(user));
    // };
    // only go to the home page if the user is logged in.
    // if (auth.authenticate) {
    //   return <Redirect to={`/`} />;
    // }

    return (
        <div className="login">
            <h1 className="login__header">Sign In</h1>
            <p className="login__lead">
                <i className="fas fa-user" /> Sign Into Your Account
            </p>
            <form className="form">
                <input
                    className="form__input"
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    // required
                />

                <input
                    className="form__input"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    // required
                />

                <button className="login__button">Login</button>
            </form>

            <p className="login__account">
                Don't have an account?
                <Link to="/register" className="dev-header">
                    Sign Up
                </Link>
            </p>
        </div>
    );
}

export default Login;
