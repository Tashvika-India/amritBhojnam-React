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
console.log("showwww",show)
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
      
          <div className="flex flex-column gap-4 py-3 phone-input">
            <label htmlFor="username">
              Phone No <span style={{ color: "red" }}>*</span>
            </label>
            <InputText
              className="w-100 mt-3 mb-2 p-inputtext-lg border-radius-8"
              placeholder="Enter Phone No."
              id="Phone"
              style={{border: "1px solid #918e92"}}
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
        {showOTPInputs && (
            <div className="pb-3 text-center">
              {otpValues.map((otp, index) => (
                <input 
                  key={index}
                  type="button"
                  maxLength="1"
                  value={otp}
                  onChange={(e) => handleChange(e.target.value, index)}
                  style={{ width: "55px", height: "55px", backgroundColor: "white", border: "1px solid #918e92",  margin: "12px", borderRadius: "10px", textAlign: "center" }}
                />
              ))}
            </div>
          )}
          <button
            className="button-primary w-100"
            style={{ fontSize: "1rem" }}
            onClick={handleSendOTP}
          >
            Send OTP
          </button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default MobileLogin;
