import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import PasswordInput from "../../../components/ui/PasswordInput";
import { loginSchema } from "../../../schemas/auth-schema";
import { useNavigate } from "react-router-dom";
import { adminLoginApi } from "../../../services/authApiRoutes";

function LoginForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);


  const initialValues = {
    // email: "user@example.com",
    // password: "string",
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

      if (accessToken && refreshToken) {
        // Store tokens in localStorage
        localStorage.setItem("access", accessToken);
        localStorage.setItem("refresh", refreshToken);

        // Decode token payload (Base64)
        const tokenParts = accessToken.split(".");
        const payload = JSON.parse(atob(tokenParts[1]));

        // Navigate to dashboard if admin role
        if (payload?.is_admin) {
          navigate("/admin/dashboard");
        } else {
          setErrorMessage("Access Denied: Not an admin user.");
        }
      }
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
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
      
      <a className="text-orange text-end m-0 fw-600 d-block">
        Forgot Password?
      </a>

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
