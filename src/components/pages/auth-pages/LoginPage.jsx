import React from 'react';
import Login from '../../../features/auth/login';
import { Navigate } from 'react-router-dom';

function LoginPage() {
    const token = localStorage.getItem("access") ? localStorage.getItem("access") : localStorage.getItem("refresh");

    if (token) {
        return <Navigate to="/dashboard" />;
    }

    return <Login />;
}

export default LoginPage;
