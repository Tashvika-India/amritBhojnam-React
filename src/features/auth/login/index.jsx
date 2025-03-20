import React from "react";
import mainLogo from "../../../assets/images/dashboard/main-logo.png";
import loginPageImage from "../../../assets/images/dashboard/login-img.png";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <section className="container-fluid login-wrapper-conatiner">
        <div className="row align-items-center">
          <div className="col-lg-4 col-11 mx-auto">
            <div className="left-section">
              <img src={mainLogo} alt="Main Logo" className="img-fluid login-main-logo" /> 
              <div className="mb-xxl-5 mb-3">
                <h2 className="mt-5">
                  Welcome to <span className="text-orange fw-600">Amrit Bhojanam Management System</span>
                </h2>
                <p className="mt-4">Enter your email and password for login</p>
              </div>
              <LoginForm />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mt-2">
              <img src={loginPageImage} alt="Login Page Image" className="img-fluid admin-login-image p-4" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
