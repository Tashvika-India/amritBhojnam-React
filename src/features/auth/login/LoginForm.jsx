import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import PasswordInput from "../../../components/ui/PasswordInput";
import { loginSchema } from "../../../schemas/auth-schema";
import { useNavigate } from "react-router-dom";
import { adminLoginApi } from "../../../services/authApiRoutes";
import { notifyError, notifySuccess } from "../../../components/ui/Notification";

function LoginForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);


  const initialValues = {

    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (submitValues) => {
      setLoading(true);
      try {
        await loginUser(submitValues);
      } finally {
        setLoading(false);
      }
    },
  });

  const { values, errors, touched, handleChange, handleBlur } = formik;

  const ifError = (key) => errors[key] && touched[key];

  async function loginUser(values) {
    try {
      const response = await adminLoginApi(values);
      const accessToken = response?.data?.access;
      const refreshToken = response?.data?.refresh;

      // Decode token payload (Base64)
      const tokenParts = accessToken.split(".");
      const payload = JSON.parse(atob(tokenParts[1]));

      const isAdmin = payload?.is_admin;

      if (accessToken && refreshToken && isAdmin) {
        // Store tokens in localStorage
        localStorage.setItem("access", accessToken);
        localStorage.setItem("refresh", refreshToken); 
        localStorage.setItem("admin", isAdmin); 

        // Navigate to dashboard if admin role
        if (isAdmin) {
          navigate("/admin/dashboard");
        } else {
          setErrorMessage("Access Denied: Not an admin user.");
        }
      }
      notifySuccess("Login successful!");
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.",{error});
      notifyError(error?.response?.data?.non_field_errors[0]); 
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <TextField
          fullWidth
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          name="email"
          error={ifError("email")}
          helperText={ifError("email") && errors.email}
          variant="outlined"
          placeholder="Enter your Email"
        />
      </div>

      <div className="mt-4">
        <PasswordInput formik={formik} name="password" ifError={ifError} />
      </div>

      {errorMessage && (
        <p className="text-danger mt-2">{errorMessage}</p>
      )}

      {/* <a className="text-orange text-end m-0 fw-600 d-block">
        Forgot Password?
      </a> */}

      <div className="mt-5">
        <button
          type="submit"
          className="btn btn-orange w-100 py-3"
          onClick={formik.handleSubmit}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
