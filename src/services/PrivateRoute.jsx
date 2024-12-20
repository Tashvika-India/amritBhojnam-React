import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("access") || localStorage.getItem("refresh");

  return token ? children : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
