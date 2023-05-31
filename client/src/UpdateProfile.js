import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import profpic from "./ProfilePic.png";
import './UpdateProfile.css';
import axios from 'axios';

function UpdateProfile() {

  const [data, setData] = useState({
    fullname: "",
    mobile: "",
    email: "",
    skills: "",
    location: ""
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const SubmitHandler = (e) => {
    axios.put('http://localhost:5000/profile', data, {
      headers: {
        'x-token': localStorage.getItem('token'),
      },
    }).then((res) => {
        alert("Profile Updated Successfully.")
        window.location = '/myprofile';
      })
      .catch((err) => {
        alert("Error occured")
      });
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
            <Link to="/myprofile" className="myprof">
              MYPROFILE
            </Link>
          </li>
        </ul>
      </div>
      <div className="our-details">
        <div className="img-con">
          <img src={profpic} alt="loading.." className="ourprofpic"></img>
        </div>
        <form onSubmit={SubmitHandler} className="update-profile" autoComplete='off'>
          <h2 className="update-title">UPDATE PROFILE</h2>
          <input
            className="update-input"
            type="text"
            placeholder="Enter Fullname"
            name='fullname'
            onChange={changeHandler}
            autoComplete='new'
            required
          ></input>
          <br></br>
          <input
            className="update-input"
            type="email"
            placeholder="Enter Email"
            name='email'
            onChange={changeHandler}
            autoComplete='new'
            required
          ></input>
          <br></br>
          <input
            className="update-input"
            type="tel"
            placeholder="Enter Mobile"
            onChange={changeHandler}
            autoComplete='new'
            name='mobile'
            required
          ></input>
          <br></br>
          <input
            className="update-input"
            type="text"
            placeholder="Enter Skills"
            name='skills'
            onChange={changeHandler}
            autoComplete='new'
            required
          ></input>
          <br></br>
          <input
            className="update-input"
            type="text"
            placeholder="Enter Location"
            name='location'
            onChange={changeHandler}
            autoComplete='new'
            required
          ></input>
          <br></br>
          <br></br>
          <button className="update-btn">Update changes</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile
