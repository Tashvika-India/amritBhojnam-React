import React from "react";
import { Navigate } from "react-router-dom";

const AdminPrivateRoute = ({ children }) => {
    const token = localStorage.getItem("access") || localStorage.getItem("refresh");
    const isAdmin = localStorage.getItem("admin"); 
    if (!token) {  
        return <Navigate to="/admin/login" />
    }
    if(isAdmin === "false"){
        console.log("No admin found");
        return <Navigate to="/"/>
    }
    
    return children;
};

export default AdminPrivateRoute;
