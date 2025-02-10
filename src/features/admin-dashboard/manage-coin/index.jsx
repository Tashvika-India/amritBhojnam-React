import React, { useCallback, useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

function CoinManagement() {
  const [activeTab, setActiveTab] = useState("Active Orders");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="mt-5 mb-4  row">
        <div className="col-md-6 ps-4">
          <Heading value={"Coin Management"} />
        </div>
        <div className="col-12 mt-3 ms-3">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to={"/admin/dashboard"}>Dashboard</Link>
            <Typography className="text-orange">Coin Management</Typography>
          </Breadcrumbs>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body" style={{padding:"10px"}}>
              <h5 className="fw-500">Coin Price Settings</h5>
              <div className="coin-div">
               
                    <input
                      type="text"
                      style={{ border: "none", outline: "none",width:"100%" ,padding:"8px" }}
                      placeholder="Type here..."
                    />
                 
                    <p className="mb-0 bg-light-orange py-3 px-4 rounded-3">Coin</p>
                  
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="fw-500">Earning Conditions</h5>
              <div className="coin-div"></div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="fw-500">Spending Conditions</h5>
              <div className="coin-div"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CoinManagement;
