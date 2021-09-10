import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Register.css";

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

  return (
    <div className='login'>
      <h1 className='login__header'>Register</h1>
      <p className='login__lead'>
        <i className='fas fa-user' /> Create Your Account
      </p>
      <form className='register__form' >
        <input
          // autoComplete='off'
          className='form__input'
          type='name'
          placeholder='First Name'
          name='first name'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          // autoComplete='off'
          className='form__input'
          type='name'
          placeholder='Last Name'
          name=' last name'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <input
          // autoComplete='off'
          className='form__input'
          type='email'
          placeholder='Email Address'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          required
        />

        <input
          // autoComplete='off'
          className='form__input'
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input value='Register' type='submit' className='login__button' />
      </form>

      <p className='login__account'>
        Already have an account?
        <Link to='/login' className='dev-header'>
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default Register;
