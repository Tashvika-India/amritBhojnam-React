import React from "react";
import { FaSpinner } from "react-icons/fa";

export default function Loading() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
            <FaSpinner className="icon-spin" size={60} color="#d55210" />
        </div>
    );
}