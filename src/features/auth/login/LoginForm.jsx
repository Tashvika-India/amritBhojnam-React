import React from "react";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import PasswordInput from "../../../components/ui/PasswordInput";
import { loginSchema } from "../../../schemas/auth-schema";
import { useNavigate } from "react-router-dom";
import { adminLoginApi } from "../../../services/authApiRoutes";


function LoginForm() {
  const navigate = useNavigate()

  function ifError(key) {
    return errors[key] && touched[key];
  }

  const initialValues = {
    email: "user@example.com",
    password: "string",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (submitValues) => {
      console.log("Submit Values", submitValues);
      loginUser(submitValues);
    },
  });

  const { values, errors, touched, handleChange, handleBlur } = formik;

  async function loginUser(values) {
    try {
      const response = await adminLoginApi(values);
      console.log("Response", response);
      const accessToken = response?.data?.access;
      const refreshToken = response?.data?.refresh;
      localStorage.setItem("access", accessToken);
      localStorage.setItem("refresh", refreshToken);
      const tokenParts = accessToken.split(".");
      const payload = JSON.parse(atob(tokenParts[1]));
      navigate("/dashboard")
    } catch (error) {
      throw error
    }
  }


  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <TextField
          fullWidth
          value={values?.email}
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
      <a className="text-orange text-end m-0 fw-600 d-block">
        Forgot Password?
      </a>

      <div className="mt-5">
          <button
            type="submit"
            className="btn btn-orange w-100 py-3"
            onClick={formik.handleSubmit}
          >
            Login
          </button> 
      </div>
    </form>
  );
}

export default LoginForm;
