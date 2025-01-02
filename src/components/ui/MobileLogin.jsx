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
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [resendEnabled, setResendEnabled] = useState(false); // State to manage resend button
  const otpRefs = useRef([]);

  useEffect(() => {
    let timer;
    if (showOTPInputs && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setResendEnabled(true); // Enable the resend button when timer hits 0
    }
    return () => clearInterval(timer);
  }, [showOTPInputs, timeRemaining]);

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const payload = { phone_or_email: formik.values.email };
      await sendOtpApi(payload);
      setErrorMessage(null);
      setTimeRemaining(30); // Reset timer
      setResendEnabled(false); // Disable the resend button
    } catch (error) {
      setErrorMessage("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
        setTimeRemaining(30); // Start the timer
        setResendEnabled(false); // Disable resend button initially
      } catch (error) {
        setErrorMessage("Failed to send OTP. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleOTPChange = (value, index) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      const otp = otpValues.join("");
      const payload = { phone_or_email: formik.values.email, otp };
      const data = await verifyOtpApi(payload);
      const accessToken = data?.data?.access;
      const refreshToken = data?.data?.refresh;

      const tokenParts = accessToken.split(".");
      const getTokenData = JSON.parse(atob(tokenParts[1]));
      const isAdmin = getTokenData?.is_admin;

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
      className="bg-white   login-offcanvas"
      style={{ width: "28%" }}
    >
      <Offcanvas.Header closeButton>
        <img src={logo} alt="logo" className="img-fluid p-2" loading="lazy" />
      </Offcanvas.Header>
      <Offcanvas.Body className="p-md-4">
        {!showOTPInputs && (
          <>
            <h3>Login</h3>
            <form onSubmit={formik.handleSubmit} className="py-3">
              <input
                type="text"
                name="email"
                className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
                placeholder="Enter Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ borderRadius: "8px", padding: "14px" }}
              />
              {formik.touched.email && formik.errors.email && (
                <small className="text-danger">{formik.errors.email}</small>
              )}
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
            <h3>OTP Verification</h3>
            <p className="fw-light">OTP has been sent to your registered email address. Please enter it to proceed.</p>
            <div className="d-flex justify-content-center gap-2 gap-md-4 my-4">
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
                  inputMode="numeric"
                  style={{
                    border: "1px solid #918e92",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                />
              ))}
            </div>
            {errorMessage && <div className="text-danger">{errorMessage}</div>}
            <button
              className="button-primary fs-6 w-100 mt-3"
              onClick={handleVerifyOTP}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <div className="text-center mt-3">
              <span>Time Remaining : <span className="text-orange">{timeRemaining > 0 ? `${timeRemaining}s` : "00:00"}</span> </span>
            </div>
            <div className="text-center mt-2">
              <button
                className="btn btn-link p-0 text-dark fw-500"
                onClick={handleResendOTP}
                disabled={!resendEnabled}
              >
                Resend OTP
              </button>
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
