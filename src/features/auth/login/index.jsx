import React from "react";
import mainLogo from "../../../assets/images/dashboard/main-logo.png";
import loginPageImage from "../../../assets/images/dashboard/login-page-image.png";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <>
      <div className="login-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="left-section">
                <div className="mt-5">
                  <img src={mainLogo} alt="Main Logo" />
                  <div className="mb-5">
                    <h2 className="mt-5">
                      Welcome to <span className="text-orange fw-600">Amrit Bhojanam Management System</span>
                    </h2>
                    <p className="mt-4">Enter your email and password for login</p>
                  </div>
                  <LoginForm />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <img src={loginPageImage} alt="Login Page Image" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
