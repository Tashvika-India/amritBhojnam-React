import React from "react";
import { Navigate } from "react-router-dom";
import { loginonWeb } from "../utils/constant-variable";

const PrivateRoute = ({ children }) => { 

  return loginonWeb ? children : <Navigate to="/" />;
};

export default PrivateRoute;
