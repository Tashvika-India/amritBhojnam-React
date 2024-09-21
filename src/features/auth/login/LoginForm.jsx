import React from "react";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import PasswordInput from "../../../components/ui/PasswordInput";
import { loginSchema } from "../../../schemas/auth-schema";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {

  const navigate = useNavigate()


  function ifError(key) {
    return errors[key] && touched[key];
  }

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (submitValues) => {
      console.log("Submit Values", submitValues);
    },
  });

  const { values, errors, touched, handleChange, handleBlur } = formik;

  return (
    <div>
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
        <Link to="/dashboard">
          <button
            type="submit"
            className="btn btn-orange w-100 py-3"
            onClick={()=>navigate("/dashboard")}
          >
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
