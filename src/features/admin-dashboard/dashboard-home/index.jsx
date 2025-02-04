import React, { useEffect, useState } from "react";
import OverviewCardsSection from "./components/OverviewCardsSection";
import DashboardCategoryTable from "./components/DashboardCategoryTable";
import { Link } from "react-router-dom";
import Heading from "@/components/ui/Heading";
import LineChart from "../../../components/charts/LineChart";
import DashboardOrderTable from "./components/DashboardOrderTable";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { Alert, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import DashboardRecentOrderTable from "./components/DashboardRecentOrderTable";
import { getDashboardApi } from "../../../services/adminApiRoutes";

function DashboardHome() {
const [dashboard, setDashboard] = useState([]);
   const [loading, setLoading] = useState(false);

 async function getDashboard() {
      setLoading(true);
      try {
        const response = await getDashboardApi();
        console.log("response",response)
        setDashboard(response?.data || []);
      } catch (error) {
        console.log("Error on Dashboard List", error);
      } finally {
        setLoading(false);
      }
    }
console.log("dashboard",dashboard)
useEffect(() => {
    getDashboard();
  }, []);
 

  const dynamicData = [
    { month: "Jan", order: 95, year: 2025 },
    { month: "Feb", order: 1, year: 2025 },
    { month: "Mar", order: 0, year: 2025 },
    { month: "Apr", order: 0, year: 2025 },
    { month: "May", order: 0, year: 2025 },
    { month: "Jun", order: 0, year: 2025 },
    { month: "Jul", order: 0, year: 2025 },
    { month: "Aug", order: 0, year: 2025 },
    { month: "Sep", order: 0, year: 2025 },
    { month: "Oct", order: 0, year: 2025 },
    { month: "Nov", order: 0, year: 2025 },
    { month: "Dec", order: 0, year: 2025 }
  ];

  return (
    <>
      <Alert severity="info" className="mt-3">Currently, the dashboard data is static and under development. It will be dynamic once the order flow is complete.</Alert>

      <div className="mt-4 mb-5">
        <Heading value={"Dashboard"} />
      </div>
      <div className="row mb-4">
        <OverviewCardsSection dashboard={dashboard} />
      </div>
      <div className="mb-4">
        <div className="card h-100">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between">
              <h5 className="mb-3 fw-500">Revenue Status</h5>
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
                <Link to="/admin/category" className="text-orange d-flex align-items-center fw-500 gap-1">
                  View All
                  <MdOutlineKeyboardDoubleArrowRight
                    style={{ fontSize: "large" }}
                  />
                </Link>
              </div>
              <DashboardCategoryTable dashboard={dashboard} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-between align-items-center p-3">
                <h5 className="mb-0 fw-500">Top Selling Products</h5>
                <Link to="/admin/product" className="text-orange d-flex align-items-center fw-500 gap-1">
                  View All
                  <MdOutlineKeyboardDoubleArrowRight
                    style={{ fontSize: "large" }}
                  />
                </Link>
              </div>
              <DashboardRecentOrderTable dashboard={dashboard}/>
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
                <Link to="/admin/orders" className="text-orange d-flex align-items-center fw-500 gap-1">
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
              <LineChart height={370} chartData={dynamicData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardHome;
