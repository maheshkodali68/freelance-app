import React, { useState, useEffect, useMemo} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./MyProfile.css";
import profpic from "./ProfilePic.png";

const Myprofile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [review, setReview] = useState([]);
  const [rate, setRate] = useState();

  const Myrating = useMemo(() => {
    const validRatings = review.map((item) => parseFloat(item.rating));
    const totalRating = validRatings.reduce((sum, rating) => sum + rating, 0);
    return validRatings.length > 0 ? totalRating / validRatings.length : 0;
  }, [review]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    else {
      axios.get("http://localhost:5000/myprofile", {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }).then((res) => setData(res.data));
        
      axios.get("http://localhost:5000/myreview", {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }).then((res) => {
          setReview(res.data);     
        });
    }
  }, [navigate]);
  
  useEffect(() => {
    const formattedRating = Myrating.toFixed(1);
    setRate(formattedRating);
  }, [Myrating]);

  if (!localStorage.getItem("token")) {
    return <Link to="/login"></Link>;
  }

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
      <div className="our-details">
        <div className="img-con">
          <img src={profpic} alt="loading.." className="ourprofpic"></img>
        </div>
        <div className="our-profile">
          <p>Name : {data.fullname}</p>
          <p>Skills : {data.skills}</p>
          <p>Location : {data.location}</p>
          <p>Email : {data.email}</p>
          <p>Mobile : {data.mobile}</p>
          <p>Rating : {rate}</p>
          <Link to='/updateProfile'><button>Edit Profile</button></Link>
        </div>
        <table className="table-con">
          <thead>
            <tr className="review-title">MY RATINGS :</tr>
            <br></br>
            <tr className="tr-css">
              <th className="th-css">TaskProvider</th>
              <th className="th-css">Rating</th>
            </tr>
          </thead>
          <tbody>
            {review.length > 0 ? (
              review.map((review) => {
                return (
                  <tr className="tr-css" >
                    <td className="td-css">{review.taskProvider}</td>
                    <td className="td-css">{review.rating}</td>
                  </tr>
                );
              })
            ) : (
              <tr className="tr-css">
                <td className="td-css">No reviews</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Myprofile;
