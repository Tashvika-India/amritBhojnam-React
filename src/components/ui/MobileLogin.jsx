import React, { useState, useRef, useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import logo from "../../assets/images/web/logo.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { sendOtpApi, verifyOtpApi } from "../../services/authApiRoutes";
import { Link } from "react-router-dom";

const MobileLogin = ({ otpShow, onOtpClose, align }) => {
  const [showOTPInputs, setShowOTPInputs] = useState(false);
  const [otpValues, setOtpValues] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(30)
  const otpRefs = useRef([]);

  useEffect(() => {
    if (showOTPInputs) {
      otpRefs.current[0]?.focus();
      if (timeRemaining > 0) {
        const timer = setInterval(() => {
          setTimeRemaining((prevTime) => prevTime - 1);
        }, 1000); // Update every second

        return () => clearInterval(timer); // Cleanup the interval on component unmount
      }
    }
  }, [showOTPInputs]);

  // Formik configuration for email validation
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const payload = { phone_or_email: values.email };
        await sendOtpApi(payload);
        setShowOTPInputs(true);
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage("Failed to send OTP. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

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

  // Verify OTP
  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      const otp = otpValues.join("");
      const payload = { phone_or_email: formik.values.email, otp };
      const data = await verifyOtpApi(payload);
      const accessToken = data?.data?.access;
      const refreshToken = data?.data?.refresh;

        // Decode token payload (Base64)
        const tokenParts = accessToken.split(".");
        const getTokenData = JSON.parse(atob(tokenParts[1])); 

        const isAdmin = getTokenData?.is_admin; 

        console.log("Admin Status:", isAdmin);
        console.log("data Status:", getTokenData);
        

      if (accessToken && refreshToken) {
        localStorage.setItem("access", accessToken);
        localStorage.setItem("refresh", refreshToken);
        localStorage.setItem("admin", isAdmin); 
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
      <Offcanvas.Body className="p-md-4">
        {!showOTPInputs && (
          <>
            <div className="d-inline-flex w-100 align-self-center justify-content-between">
              <h3 className="">Login</h3>
            </div>
            <form onSubmit={formik.handleSubmit} className="flex flex-column gap-4 py-3">
              <div>
                <input
                  type="text"
                  name="email"
                  className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""
                    }`}
                  placeholder="Enter Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ borderRadius: "8px", padding: "14px" }}
                />
                {formik.touched.email && formik.errors.email && (
                  <small className="text-danger">{formik.errors.email}</small>
                )}
              </div>
              <button
                type="submit"
                className="button-primary fs-6 w-100 mt-5"
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          </>
        )}
        {showOTPInputs && (
          <>
            <div className="d-inline-flex flex-column w-100 align-self-center justify-content-between">
              <h3 className="">OTP Verification</h3>
              <p className="fw-light">OTP has been sent to your registered email address. Please enter it to proceed.</p>
            </div>
            <div className="pb-3 text-center">
              <div className="d-flex justify-content-center gap-2 gap-md-4">
                {otpValues.map((otp, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    className="otp-input"
                    value={otp}
                    onChange={(e) => handleOTPChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Restrict to numbers only
                    }}
                    inputMode="numeric" // Mobile keyboards show numeric keypad
                    style={{
                      border: "1px solid #918e92",
                      borderRadius: "10px",
                      textAlign: "center",
                    }}
                  />
                ))}
              </div>
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
            <div className="text-center">
              <span>Time Remaining : </span><span className="text-orange"> {timeRemaining > 0 ? `${timeRemaining} Seconds` : "00:00"}</span>
            </div>
          </>
        )}
        {!showOTPInputs && (
          <p
            className="text-muted mt-3 d-inline-block"
            style={{ fontSize: "0.875rem" }}
          >
            By clicking on Login, I accept the{" "}
            <Link to="/term-conditions">Terms & Conditions</Link> and{" "}
            <Link to="/privacy-policy"> Privacy Policy</Link>.
          </p>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default MobileLogin;
