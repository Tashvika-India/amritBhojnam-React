import React from "react";
import notfound from "../assets/images/404.png";
import { Link } from "react-router-dom";

function Admin404() {
    return (
        <div className="bg-footer-bg d-flex flex-column align-items-center justify-content-center vh-100" style={{ textAlign: "center", padding: "50px" }}>
            <img src={notfound} className="img-fluid " width={"400px"} height={"400px"} alt="404" />
            <div className="mt-4">
                <h4 className="mb-1">The page you are looking for does not exist.</h4>
                <p>Please check the URL and try again.</p>
                <Link to="/admin/dashboard" className="mt-2 button-primary d-inline-block">Back to Dashboard</Link>
            </div>
        </div>
    );
}

export default Admin404;
