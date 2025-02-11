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
            <div className="card-body p-4 mx-2 mb-3 mt-1">
              <h5 className="mb-4 pb-2">Coin Price Settings</h5>
              <div className="d-flex gap-3 align-items-center">
                <div className="coin-div">
                  <input type="text" className="coin-input" placeholder="1" />
                  <p className="coin-text fb-fs-14 bg-light-orange">Coin</p>
                </div>
                <div>
                  <span className="text-mid-grey">=</span>
                </div>
                <div className="coin-div">
                  <input type="text" className="coin-input" placeholder="1" />
                  <p className="coin-text fb-fs-14 bg-light-orange">Coin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body p-4 mx-2 mb-3 mt-1">
              <h5 className="mb-4 pb-1">Earning Conditions</h5>
              <div className="d-flex align-items-center gap-5">
                <p
                  className="text-mid-grey fw-500 mb-1"
                  style={{ fontSize: "14px" }}
                >
                  SPEND AMOUNT(INR.)
                </p>
                <p
                  className="text-mid-grey fw-500 mb-1 ms-4 ps-1"
                  style={{ fontSize: "14px" }}
                >
                  REWARD COIN %
                </p>
              </div>
              <div className="d-flex gap-3 align-items-center">
                <div className="coin-div">
                  <input type="text" className="coin-input" placeholder="1" />
                  <p className="coin-text fb-fs-14 bg-light-orange">Coin</p>
                </div>
                <div>
                  <span className="text-mid-grey">=</span>
                </div>
                <div className="coin-div">
                  <input type="text" className="coin-input" placeholder="1" />
                  <p className="coin-text fb-fs-14 bg-light-orange">Coin</p>
                </div>
              </div>
              <div className="d-flex gap-3 align-items-center mt-3">
                <div className="coin-div">
                  <input type="text" className="coin-input" placeholder="1" />
                  <p className="coin-text fb-fs-14 bg-light-orange">Coin</p>
                </div>
                <div>
                  <span className="text-mid-grey">=</span>
                </div>
                <div className="coin-div">
                  <input type="text" className="coin-input" placeholder="1" />
                  <p className="coin-text fb-fs-14 bg-light-orange">Coin</p>
                </div>
              </div>
              <div className="d-flex text-end gap-3 mt-4 justify-content-end me-5 pe-2">
                <button className="button-set-default  rounded-1 py-2 px-4">
                  -
                </button>
                <button className="button-yellow py-2 px-4">+</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body p-4 mx-2 mb-3 mt-1">
              <h5 className="mb-4 pb-1">Spending Conditions</h5>
              <div className="d-flex align-items-center gap-5">
                <p
                  className="text-mid-grey fw-500 mb-1"
                  style={{ fontSize: "14px" }}
                >
                  SPEND AMOUNT(INR.)
                </p>
                <p
                  className="text-mid-grey fw-500 mb-1 ms-4 ps-1"
                  style={{ fontSize: "14px" }}
                >
                  REWARD COIN %
                </p>
              </div>
              <div className="d-flex gap-3 align-items-center">
                <div className="coin-div">
                  <input type="text" className="coin-input" placeholder="1" />
                  <p className="coin-text fb-fs-14 bg-light-orange">Coin</p>
                </div>
                <div>
                  <span className="text-mid-grey">=</span>
                </div>
                <div className="coin-div">
                  <input type="text" className="coin-input" placeholder="1" />
                  <p className="coin-text fb-fs-14 bg-light-orange">Coin</p>
                </div>
              </div>
              <div className="d-flex gap-3 align-items-center mt-3">
                <div className="coin-div">
                  <input type="text" className="coin-input" placeholder="1" />
                  <p className="coin-text fb-fs-14 bg-light-orange">Coin</p>
                </div>
                <div>
                  <span className="text-mid-grey">=</span>
                </div>
                <div className="coin-div">
                  <input type="text" className="coin-input" placeholder="1" />
                  <p className="coin-text fb-fs-14 bg-light-orange">Coin</p>
                </div>
              </div>
              <div className="d-flex text-end gap-3 mt-4 justify-content-end me-5 pe-2">
                <button className="button-set-default  rounded-1 py-2 px-4">
                  -
                </button>
                <button className="button-yellow py-2 px-4">+</button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12 mt-5 pt-5">
            <div className="row">
              <div className="col-md-12 mb-4 text-end d-flex justify-content-end">
                <Link>
                  <YellowButton lable={"Update Details"} />
                </Link>
                <button
                  className="button-primary-reverse me-4 ms-3 py-2"
                  type="button"
                  onClick={() => {
                    formik.resetForm();
                    setOpen(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
      </div>
    </>
  );
}

export default CoinManagement;
