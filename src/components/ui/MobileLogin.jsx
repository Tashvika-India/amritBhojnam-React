import React, { useState, useRef, useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import logo from "../../assets/images/web/logo.svg";
import { InputText } from "primereact/inputtext";
import { sendOtpApi, verifyOtpApi } from "../../services/authApiRoutes";
import { Link } from "react-router-dom";

const MobileLogin = ({ otpShow, onOtpClose, align }) => {
  const [showOTPInputs, setShowOTPInputs] = useState(false);
  const [otpValues, setOtpValues] = useState(new Array(6).fill(""));
  const [inputValue, setInputValue] = useState(""); // Combined input for phone or email
  const [isEmail, setIsEmail] = useState(false); // Flag to determine input type
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const otpRefs = useRef([]);

  useEffect(() => {
    if (showOTPInputs) {
      otpRefs.current[0]?.focus();
    }
  }, [showOTPInputs]);

  // Validate Email and Phone Number
  const validateInput = (value) => {
    const phoneRegex = /^[0-9]{10}$/; // 10-digit phone number
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex
    if (phoneRegex.test(value)) {
      setIsEmail(false);
      return true;
    } else if (emailRegex.test(value)) {
      setIsEmail(true);
      return true;
    }
    return false;
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // if (validateInput(value)) {
    //   setErrorMessage(null);
    //   setShowOTPInputs(false);
    // } else {
    //   setErrorMessage("Please enter a valid phone number or email.");
    //   setShowOTPInputs(false);
    // }
  };

  // Handle OTP Input Change
  const handleOTPChange = (value, index) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  // Handle OTP Backspace Navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Clear OTP
  const handleClearOTP = () => {
    setOtpValues(new Array(6).fill(""));
    otpRefs.current[0]?.focus();
  };

  // Send OTP
  const handleSendOTP = async () => {
    if (!validateInput(inputValue)) {
      setErrorMessage("Invalid phone number or email.");
      return;
    }
    setLoading(true);
    try {
      const payload = isEmail
        ? { phone_or_email: inputValue }
        : { phone_or_email: inputValue };

      await sendOtpApi(payload);
      setShowOTPInputs(true);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      const otp = otpValues.join("");
      const payload = isEmail
        ? { phone_or_email: inputValue, otp }
        : { phone_or_email: inputValue, otp };

      const data = await verifyOtpApi(payload);

      const accessToken = data?.data?.access;
      const refreshToken = data?.data?.refresh;

      if (accessToken && refreshToken) {
        localStorage.setItem("access", accessToken);
        localStorage.setItem("refresh", refreshToken);
        window.location.reload(true);

        onOtpClose();
      }
    } catch (error) {
      setErrorMessage("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <Offcanvas
      show={otpShow}
      onHide={onOtpClose}
      placement={align}
      className="bg-white rounded-start-4 login-offcanvas"
      style={{ width: "28%" }}
    >
      <Offcanvas.Header closeButton>
        <img src={logo} alt="logo" className="img-fluid p-2" loading="lazy" />
      </Offcanvas.Header>
      <Offcanvas.Body className="p-4">
        <div className="d-inline-flex w-100 align-self-center justify-content-between">
          <h3 className="">Login</h3>
        </div>
        <div className="flex flex-column gap-4 py-3 phone-input">
          <InputText
            className="w-100 mt-3 p-3 mb-2 p-inputtext-lg border-radius-8"
            placeholder="Phone Number or Email*"
            value={inputValue}
            onChange={handleInputChange}
            style={{ border: "1px solid #918e92" }}
          />
          {errorMessage && (
            <small className="text-danger">{errorMessage}</small>
          )}
        </div> 
        {showOTPInputs && (
          <div className="pb-3 text-center">
            {otpValues.map((otp, index) => (
              <input
                key={index}
                ref={(el) => (otpRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={otp}
                onChange={(e) => handleOTPChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                style={{
                  width: "55px",
                  height: "55px",
                  margin: "12px",
                  border: "1px solid #918e92",
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              />
            ))}
            {errorMessage && <div className="text-danger">{errorMessage}</div>}
            <div className="pt-3">
              <button
                className="button-primary fs-6 w-100"
                onClick={handleVerifyOTP}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </div>
        )} 
        {!showOTPInputs && (
          <>
          <button
            className="button-primary fs-6 w-100 mt-3"
            onClick={handleSendOTP}
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
          <p className="text-muted mt-3 d-inline-block" style={{ fontSize: "0.875rem" }}>By clicking on Login, I accept the <Link to="/term-conditions">Terms & Conditions</Link> and <Link to="/privacy-policy"> Privacy Policy</Link> Recovery Account</p>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default MobileLogin;
