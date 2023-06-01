import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import mygif from "./Loading_icon.png";
import "./Dashboard.css";
import profpic from "./ProfilePic.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
        .then((res) => setData(res.data));
      axios
        .get("http://localhost:5000/myprofile", {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        })
        .then((res) => setUserProfile(res.data));
    }
  }, [navigate]);

  let filteredProfiles = [];
  if (searchQuery === "") {
    filteredProfiles = data.filter(
      (profile) => userProfile.email !== profile.email
    );
  } else {
    filteredProfiles = data.filter(
      (profile) =>
        userProfile.email !== profile.email &&
        profile.skills.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <div className="dashboard">
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
            <Link to="/myprofile" className="myprof">
              MYPROFILE
            </Link>
          </li>
          <li className="nav-options">
            <input
              className="search-bar"
              type="text"
              placeholder="Search Skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </li>
        </ul>
      </div>
      <div className="content-con">
        {data.length >= 1 ? (
          filteredProfiles.length > 1 ? (
            filteredProfiles.map((profile) => (
              <div key={profile._id} className="all-profiles">
                <div>
                  <img src={profpic} alt="loading.." className="profpic" />
                </div>
                <div className="details">
                  <p>Name : {profile.fullname}</p>
                  <p>Skills : {profile.skills}</p>
                  <p>Location : {profile.location}</p>
                  <p className="profile-links">
                    <Link
                      to={`/individualProfile/${profile.fullname}/${profile.email}/${profile._id}/${profile.mobile}/${profile.skills}/${profile.location}`}
                      className="viewprof"
                    >
                      {" "}
                      View Profile
                    </Link>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-records">
              <p>No matching records</p>
            </div>
          )
        ) : (
          <img src={mygif} alt="Loading..." className="loading" />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
