import React from "react";
import OverviewCardsSection from "./components/OverviewCardsSection";
import DashboardCategoryTable from "./components/DashboardCategoryTable";
import { Link } from "react-router-dom";
import Heading from "@/components/ui/Heading";
import LineChart from "../../../components/charts/LineChart";
import DashboardOrderTable from "./components/DashboardOrderTable";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import DashboardRecentOrderTable from "./components/DashboardRecentOrderTable";

function DashboardHome() {
  return (
    <>
      <div className="mt-3 mb-5">
        <Heading value={"Dashboard"} />
      </div>
      <div className="row mb-4">
        <OverviewCardsSection />
      </div>
      <div className="mb-4">
        <div className="card h-100">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between">
              <h5 className="mb-3 fw-500">Revenue Stats</h5>
              <div style={{ width: "11%" }}>
                <FormControl fullWidth w-50>
                  <InputLabel id="demo-simple-select-label" size="small">Monthly</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Monthly"
                    size="small">
                    <MenuItem value={10}>January</MenuItem>
                    <MenuItem value={20}>Februrary</MenuItem>
                    <MenuItem value={30}>March</MenuItem>
                    <MenuItem value={40}>April</MenuItem>
                    <MenuItem value={30}>May</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <LineChart height={400} />
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-between align-items-center p-3">
                <h5 className="mb-0 fw-500">Categories</h5>
                <Link to="/category" className="text-orange d-flex align-items-center fw-500 gap-1">
                  View All
                  <MdOutlineKeyboardDoubleArrowRight
                    style={{ fontSize: "large" }}
                  />
                </Link>
              </div>
              <DashboardCategoryTable />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-between align-items-center p-3">
                <h5 className="mb-0 fw-500">Top Selling Products</h5>
                <Link to="/product" className="text-orange d-flex align-items-center fw-500 gap-1">
                  View All
                  <MdOutlineKeyboardDoubleArrowRight
                    style={{ fontSize: "large" }}
                  />
                </Link>
              </div>
              <DashboardRecentOrderTable />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-between align-items-center p-3">
                <h5 className="mb-0 fw-500">Recent Orders</h5>
                <Link to="/orders" className="text-orange d-flex align-items-center fw-500 gap-1">
                  View All
                  <MdOutlineKeyboardDoubleArrowRight
                    style={{ fontSize: "large" }}
                  />
                </Link>
              </div>
              <DashboardOrderTable />
            </div>
          </div>
        </div>
        <div className="col-md-6 h-100">
          <div className="card h-100">
            <div className="card-body h-100">
              <div className="d-flex justify-content-between">
                <h5 className="mb-3 mt-3 fw-500">Orders</h5>
                <div style={{ width: "24%" }}>
                  <FormControl fullWidth w-50>
                    <InputLabel id="demo-simple-select-label" size="small">
                      Monthly
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value=""
                      label="Monthly"
                      size="small"
                    >
                      <MenuItem value={10}>January</MenuItem>
                      <MenuItem value={20}>Februrary</MenuItem>
                      <MenuItem value={30}>March</MenuItem>
                      <MenuItem value={40}>April</MenuItem>
                      <MenuItem value={30}>May</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <LineChart height={370} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardHome;
