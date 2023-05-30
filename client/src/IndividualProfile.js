import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./IndividualProfile.css";
import profpic from "./ProfilePic.png";

const IndividualProfile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(null);
  const [taskProvider, setTaskProvider] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      axios.get("http://localhost:5000/myprofile", {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        })
        .then((res) => setTaskProvider(res.data.fullname));
    }
  }, [navigate]);
  const submitHandler = (e) => {
    if (rating == null) {
      alert("Please enter rating");
    }
    else if(rating<0 || rating>5){
      alert("Please enter valid rating(0-5)")
    } 
    else {
      let review = {
        taskProvider,
        taskWorker: params.id,
        rating,
      };
      axios.post("http://localhost:5000/addreview", review, {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        })
        .then((res) => setRating(res.review));
      setRating("");
      alert("Rating given successfully!!");
    }
  };
  const sendEmail = (mail) => {
    const mailtoLink = `mailto:${mail}`;
    window.open(mailtoLink);
  };
  return (
    <div>
      <div className="nav-con">
        <ul className="navbar">
          <li className="title">FREELANCEHUB</li>
          <li className="nav-options">
            <Link
              to="/login"
              onClick={() => localStorage.removeItem("token")}
              className="logout"
            >
              LOGOUT
            </Link>
          </li>
          <li className="nav-options">
            <Link to="/dashboard" className="myprof">
              DASHBOARD
            </Link>
          </li>
        </ul>
      </div>
      <div className="prof-details">
        <div className="img-con">
          <img src={profpic} alt="loading.." className="ourprofpic"></img>
        </div>
        <div className="individual-details">
          <p>Name : {params.fullname}</p>
          <p>Skills : {params.skills}</p>
          <p>Location : {params.location}</p>
          <p>Email : {params.email} </p>
          <p>Mobile : {params.mobile}</p>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              className="rating-input"
              placeholder="Enter rating out of 5"
              name="rating"
              onChange={(e) => setRating(e.target.value)}
              autoComplete="off"
            ></input>
            <button className="rating-btn" type="submit">
              submit
            </button>
            <p onClick={() => sendEmail(params.email)} className="send-email">Send Mail</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IndividualProfile;
