import React from 'react'
import Login from '../../../features/auth/login'
import { Navigate } from 'react-router-dom';

function LoginPage() {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
        return <Navigate to="/dashboard" />
    }

    return <Login />
}

export default LoginPage