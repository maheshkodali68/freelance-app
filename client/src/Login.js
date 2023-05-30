import React, { useState } from "react";
import { Link, Navigate} from "react-router-dom";
import "./Register-Login.css";
import axios from 'axios';

const Login = () => {
  const [auth,setAuth] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login',data).then(
      res => {localStorage.setItem('token',res.data.token);setAuth(true)}
    ).catch((err)=>{
      alert("User doesn't exist!!")
    })
  };
  if(auth){
    return <Navigate to='/dashboard'></Navigate>
  }
  return (
    <div className="outer-container">
      <div className="left-container">
        <p className="title-description">
          <strong className="title-1">FREELANCEHUB</strong>
          <br></br>
          <br></br>
          Welcome to our freelancing platform!
          <br></br>At our platform, we believe in connecting talented
          freelancers with exciting opportunities from around the world. We
          provide a dynamic and supportive environment where you can collaborate
          with clients and build a successful freelancing career.
        </p>
      </div>
      <div className="right-container">
        <form className="login-form" onSubmit={submitHandler}>
          <p className="login-title-2">LOGIN</p>
          <input
            className="login-input-2"
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={changeHandler}
            autoComplete="off"
            required
          ></input>
          <br></br>
          <input
            className="login-input-2"
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={changeHandler}
            required
          ></input>
          <br></br>
          <button className="signin-btn-2">SIGN IN</button>
          <p className="redirect-link">
            Don't have an account?&nbsp;
            <Link to="/register" style={{ color: "rgb(68, 209, 252)" }}>
              <strong>Register</strong>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
