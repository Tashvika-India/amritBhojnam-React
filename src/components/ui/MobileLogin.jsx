import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import logo from "../../assets/images/web/logo.svg";
import { InputText } from "primereact/inputtext";
import { IoSearchOutline } from "react-icons/io5";
import { Dropdown } from "primereact/dropdown";

const MobileLogin = ({ show, onClose }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [showOTPInputs, setShowOTPInputs] = useState(false);
  const [otpValues, setOtpValues] = useState(new Array(4).fill(""));

  const handleSendOTP = () => {
    // Trigger any logic to send the OTP here
    setShowOTPInputs(true);
  };

  const handleChange = (value, index) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
  };

  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  return (
    <Offcanvas show={show} onHide={onClose} placement="start">
      <Offcanvas.Header closeButton>
        <img src={logo} alt="logo" />
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="d-inline-flex w-100 align-self-center">
          {/* <div className="search-input position-relative z-1 w-100">
            <InputText
              keyfilter="int"
              placeholder="Search for products"
              className="border-0 ps-3"
            />
            <span className="search-icon z-2 position-absolute end-0 top-50 translate-middle mb-3">
              <IoSearchOutline color="#918e92" size={"1.25rem"} />
            </span>
          </div> */}
          <div>
            <h1>Login</h1>
          </div>
        </div>
        <div>
          <div className="flex flex-column gap-4 py-3">
            <label htmlFor="username">
              Phone No <span style={{ color: "red" }}>*</span>
            </label>
            <InputText
              className="w-100 mb-2 p-inputtext-lg"
              placeholder="Enter Phone No."
              id="Phone"
              aria-describedby="username-help"
            />
            <small id="username-help">Enter your Phone Number to login.</small>
          </div>
        </div>
        {/* <div className="otp-button mt-4">
          <button className="button-primary w-100" style={{ fontSize: "1rem" }}>
            Send OTP
          </button>
        </div> */}
        <div>
          <button
            className="button-primary w-100"
            style={{ fontSize: "1rem" }}
            onClick={handleSendOTP}
          >
            Send OTP
          </button>
          {showOTPInputs && (
            <div>
              {otpValues.map((otp, index) => (
                <input 
                  key={index}
                  type="button"
                  maxLength="1"
                  value={otp}
                  onChange={(e) => handleChange(e.target.value, index)}
                  style={{ width: "45px", height: "50px", margin: "13px", borderRadius: "8px", textAlign: "center" }}
                />
              ))}
            </div>
          )}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default MobileLogin;
