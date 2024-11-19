import React, { useState, useRef, useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import logo from "../../assets/images/web/logo.svg";
import { InputText } from "primereact/inputtext";  
import { sendOtpApi, verifyOtpApi } from "../../services/authApiRoutes";
const MobileLogin = ({ otpShow, onOtpClose, align }) => {
  const [showOTPInputs, setShowOTPInputs] = useState(false);
  const [otpValues, setOtpValues] = useState(new Array(6).fill(""));
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const otpRefs = useRef([]); 



  useEffect(() => {
    // Focus the first OTP input when showing OTP inputs
    if (showOTPInputs) {
      otpRefs.current[0].focus();
    }
  }, [showOTPInputs]);

  // Handle phone number input change
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);

    // Show OTP inputs when 10-digit phone number is entered
    if (value.length === 10) {
      setShowOTPInputs(true);
    } else {
      setShowOTPInputs(false);
    }
  };

  // Handle OTP input change
  const handleChange = (value, index) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Focus next OTP input if current is filled
    if (value && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1].focus();
    }
  };

  // Handle backspace key to move focus to previous OTP input
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  // Handle OTP clearing
  const handleClearOTP = () => {
    setOtpValues(new Array(6).fill(""));
    otpRefs.current[0].focus();
  };

  // Handle sending OTP
  const handleSendOTP = async () => {
    if (phoneNumber.length === 10) {
      setLoading(true);
      try {
        await sendOtpApi({ phone: phoneNumber }); // Call API to send OTP
      } catch (error) {
        setErrorMessage("Failed to send OTP. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setErrorMessage("Please enter a valid 10-digit phone number.");
    }
  };

  // Handle OTP verification
  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      const otp = otpValues.join(""); // Join OTP values into a single string
      const data =   await verifyOtpApi({ phone_number: phoneNumber, otp }) 

      const accessToken = data?.data?.access;
      const refreshToken = data?.data?.refresh;
      const user = data?.data?.user_detail;

      if (accessToken && refreshToken) {
        // Store tokens in localStorage
        localStorage.setItem("access", accessToken);
        localStorage.setItem("refresh", refreshToken);
        localStorage.setItem("user", user);

        // Decode token payload (Base64)
        const tokenParts = accessToken.split(".");
        const payload = JSON.parse(atob(tokenParts[1]));

        // Navigate to dashboard if admin role
        if (payload?.is_admin) {
          navigate("/home");
        } else {
          setErrorMessage("Access Denied: Not an admin user.");
        }
      }
      
      onOtpClose(); // Close the OTP modal on successful verification

    } catch (error) {
      setErrorMessage("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Offcanvas show={otpShow} onHide={onOtpClose} placement={align} className="bg-white rounded-start-4 login-offcanvas" style={{width: "28%"}}>
      <Offcanvas.Header closeButton>
        <img  src={logo} alt="logo"  className="img-fluid p-2" loading="lazy"  />
      </Offcanvas.Header>
      <Offcanvas.Body class="p-4">
        <div className="d-inline-flex w-100 align-self-center justify-content-between">
          <h4 class="fw-bold">Login</h4>
          {/* <p class="fb-fs-14 fw-600">Or <span class="text-orange text-decoration-underline"> Create an account</span></p> */}
        </div>
        <div className="flex flex-column gap-4 py-3 phone-input">
          {/* <label htmlFor="phone">
            Phone No <span style={{ color: "red" }}>*</span>
          </label> */}
          <InputText
            className="w-100 mt-3 p-3 mb-2 p-inputtext-lg border-radius-8"
            placeholder="Phone No*"
            id="phone"
            maxLength="10"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            style={{ border: "1px solid #918e92" }}
            aria-describedby="phone-help"
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
         
          {errorMessage && <div className="text-danger">{errorMessage}</div>}
        </div>

        {/* OTP input section */}
        {showOTPInputs && (
          <div className="pb-3 text-center">
            {otpValues.map((otp, index) => (
              <input
                key={index}
                ref={(el) => (otpRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={otp}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                style={{
                  width: "55px",
                  height: "55px",
                  backgroundColor: "white",
                  border: "1px solid #918e92",
                  margin: "12px",
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              />
            ))}
            {otpValues.some((val) => val) && (
              <button onClick={handleClearOTP} className="btn btn-link">
                Clear OTP
              </button>
            )}
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

        {/* Send OTP button */}
        {!showOTPInputs && (
          <div>
            <button
              className="button-primary fs-6 w-100 mt-3"
              onClick={handleSendOTP}
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>
          
        )}
        <div class="mt-4">
        <small id="phone-help" class="text-dark-grey">By clicking on Login, I accept the Terms & Conditions and Privacy Policy Recovery Account</small>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default MobileLogin;
