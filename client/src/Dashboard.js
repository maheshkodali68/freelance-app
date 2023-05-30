import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import mygif from "./Loading_icon.png";
import "./Dashboard.css";
import profpic from './ProfilePic.png';

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:5000/allprofiles", {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        })
        .then((res) => {setData(res.data)});
      axios
        .get("http://localhost:5000/myprofile", {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        })
        .then((res) => setUserProfile(res.data));
    }
  }, [navigate]);

  
  return (
    <div className="dashboard">
      <div className="nav-con">
        <ul className="navbar">
          <li className="title">FREELANCEHUB</li>
          <li className="nav-options">
            <Link to="/login" onClick={() => localStorage.removeItem("token")} className="logout">
              LOGOUT
            </Link>
          </li>
          <li className="nav-options">
            <Link to="/myprofile" className="myprof">MYPROFILE</Link>
          </li>
        </ul>
      </div>
      <div className="content-con">
        {data.length >= 1 ? (
          data.map((profile) => {
            if (userProfile.email !== profile.email) {
              return (
                <div className="all-profiles">
                  <div>
                    <img src={profpic} alt="loading.." className="profpic"></img>
                  </div>
                  <div key={profile.email} className="details">
                    <p>Name : {profile.fullname}</p>
                    <p>Skills : {profile.skills}</p>
                    <p>Location : {profile.location}</p>
                    <p className="profile-links">
                    <Link to={`/individualProfile/${profile.fullname}/${profile.email}/${profile._id}/${profile.mobile}/${profile.skills}/${profile.location}`} className="viewprof"> View Profile</Link>
                    
                    </p>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })
        ) : (
            <img src={mygif} alt="Loading..." className="loading"/>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
