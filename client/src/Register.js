import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register-Login.css";
import axios from "axios";

const Register = () => {
  const [data, setData] = useState({
    fullname: "",
    mobile: "",
    email: "",
    skills: "",
    location: "",
    password: "",
    confirmpassword: "",
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (data === null) {
      alert("Please enter details to register!!");
    } else {
      if (data.password !== data.confirmpassword) {
        alert("Password doesn't match");
      } else {
        axios
          .post("http://localhost:5000/register", data)
          .then(() => {
            alert("Registered successfully. Please Login");
            window.location.href = '/login';            
          })
          .catch((err) => {
            alert("Enter valid credentials");
          });
      }
    }
  };
  return (
    <div className="outer-container">
      <div className="left-container">
        <p className="title-description">
          <strong className="title-1">FREELANCEHUB</strong>
          <br></br>
          <br></br>
          "Welcome to our website! We're excited to have you join our community.
          Your journey starts here. Take a few moments to create your account
          and unlock a world of possibilities. We value your privacy and ensure
          the security of your information. We look forward to seeing you thrive
          and make meaningful connections on our website. If you have any
          questions or need assistance, our support team is always ready to
          help."
          <br></br>Happy exploring!
        </p>
      </div>
      <div className="right-container">
        <form
          className="login-form"
          onSubmit={submitHandler}
          autoComplete="off"
        >
          <p className="login-title">REGISTER</p>
          <input
            className="login-input"
            type="text"
            name="fullname"
            placeholder="Enter Fullname"
            onChange={changeHandler}
            autoComplete="off"
            required
          ></input>
          <br></br>
          <input
            className="login-input"
            type="tel"
            name="mobile"
            placeholder="Enter Mobile number"
            onChange={changeHandler}
            autoComplete="off"
            required
          ></input>
          <br></br>
          <input
            className="login-input"
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={changeHandler}
            autoComplete="off"
            required
          ></input>
          <br></br>
          <input
            className="login-input"
            type="text"
            name="skills"
            placeholder="Enter skills"
            onChange={changeHandler}
            autoComplete="off"
            required
          ></input>
          <input
            className="login-input"
            type="text"
            name="location"
            placeholder="Enter location"
            onChange={changeHandler}
            autoComplete="off"
            required
          ></input>
          <br></br>
          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={changeHandler}
            autoComplete="off"
            required
          ></input>
          <br></br>
          <input
            className="login-input"
            type="password"
            name="confirmpassword"
            placeholder="Please confirm your password"
            onChange={changeHandler}
            autoComplete="off"
            required
          ></input>
          <br></br>
          <button className="signin-btn">REGISTER</button>
          <p className="redirect-link">
            Already have an account?&nbsp;
            <Link to="/login" style={{ color: "#2F3F2F" }}>
              <strong>Login</strong>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
