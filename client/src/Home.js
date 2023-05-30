import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import logo from "./Logo.png";
const Home = () => {
  return (
    <div className="main-con">
      <div className="main-title">
        <h1 className="title">
          FREELANCEHUB
        </h1>
        <p className="title-des">
            Unleash Your Potential, Connect, and Thrive
          </p>
      </div>
      <div className="outer-con">
        <div className="left-con">
          <div className="img-con">
            <img src={logo} alt="LOGO" className="logo"></img>
            <h1 className="bottom-right">FREELANCEHUB</h1>
          </div>
        </div>
        <div className="right-con">
          <p className="content">
            Welcome to our FreelanceHub Website!!<br></br>
            <br></br>At our freelancing website, we connect talented freelancers
            with clients from all over the world, creating opportunities for
            collaboration, growth, and success. Whether you're a freelancer
            looking for exciting projects or a client seeking skilled
            professionals, you've come to the right place.<br></br>
            Join our freelancing website today and unlock a world of
            opportunities. Whether you're a freelancer ready to embark on
            exciting projects or a client seeking exceptional talent, we're here
            to support your journey every step of the way. Together, let's make
            work flexible, rewarding, and fulfilling.
          </p>
          <div className="buttons">
            <Link to="/register" className="reg-btn">
              REGISTER
            </Link>
            <Link to="/login" className="log-btn">
              LOGIN
            </Link>
          </div>
        </div>
      </div>
      <footer className="footer-con">
      <p className="copyright">copyright 2023 @MaheshKodali<br></br>All rights reserved.</p>
      </footer>
      
    </div>
  );
};

export default Home;
