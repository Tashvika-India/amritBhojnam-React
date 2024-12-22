import React from "react";
import notfound from "../assets/images/404.png";

function Web404() {
    return (
        <div className="bg-footer-bg d-flex flex-column align-items-center justify-content-center vh-100" style={{ textAlign: "center", padding: "50px" }}>
            <img src={notfound} className="img-fluid" alt="404" />
            {/* <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p> */}
        </div>
    );
}

export default Web404;
