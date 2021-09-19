import React, { useState } from "react";
import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import "./RegisterForm.css";

// import { useDispatch, useSelector } from "react-redux";
// import { register } from "../../actions/user.actions";

function Register(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const auth = useSelector((state) => state.auth);
    // const dispatch = useDispatch();
    // const user = useSelector(state => state.user)

    // const [error, setError] = useState("");
    // const registerUser = (e) => {
    //   e.preventDefault()
    //   const user = {
    //     firstName,
    //     lastName,
    //     email,
    //     password,
    //   };

    //   dispatch(register(user));
    // };

    // if (auth.authenticate) {
    //   return <Redirect to={`/`} />;
    // }

    // if(user.loading) {
    //   return <p>loading...</p>
    // }

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <div className="login">
            <h1 className="login__header">Register</h1>
            <p className="login__lead">
                <i className="fas fa-user" /> Create Your Account
            </p>
            <RegisterForm
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
            />
            <p className="login__account">
                Already have an account?
                <Link to="/login" className="dev-header">
                    Sign In
                </Link>
            </p>
        </div>
    );
}

export default Register;
