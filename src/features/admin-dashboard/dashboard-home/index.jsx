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
import { transformApiData, transformApiDataRevenue } from "../../../utils/constant-variable";

function DashboardHome() {
  const [dashboard, setDashboard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [revenueYear, setRevenueYear] = useState("");
  const [ordersYear, setOrdersYear] = useState("");


  const fetchDashboardData = async (revenueYear, ordersYear) => {
    setLoading(true);
    try {
      const response = await getDashboardApi({
        revenue_current_year: revenueYear,
        orders_current_year: ordersYear,
      });
      setDashboard(response?.data || []);
    } catch (error) {
      console.log("Error on Dashboard List", error);
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2018 }, (_, i) => currentYear - i);

  const handleRevenueYearChange = (event) => {
    setRevenueYear(event.target.value);
  };

  const handleOrdersYearChange = (event) => {
    setOrdersYear(event.target.value);
  };

  const orderChartData = transformApiData(dashboard?.orders || []);
  const revenueChartData = transformApiDataRevenue(dashboard?.revenue_stats || []);

  useEffect(() => {
    fetchDashboardData(revenueYear, ordersYear);
  }, [revenueYear, ordersYear]);


  console.log("dashboard", dashboard);
  

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
                <FormControl fullWidth>
                  <InputLabel id="revenue-year-select-label" size="small">
                    Year
                  </InputLabel>
                  <Select
                    labelId="revenue-year-select-label"
                    id="revenue-year-select"
                    value={revenueYear}
                    label="Year"
                    size="small"
                    onChange={handleRevenueYearChange}
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <LineChart height={400} chartData={revenueChartData} />
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
              <DashboardRecentOrderTable dashboard={dashboard} />
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
              <DashboardOrderTable dashboard={dashboard} />
            </div>
          </div>
        </div>
        <div className="col-md-6 h-100">
          <div className="card h-100">
            <div className="card-body h-100">
              <div className="d-flex justify-content-between">
                <h5 className="mb-3 mt-3 fw-500">Orders</h5>
                <div style={{ width: "24%" }}>
                  <FormControl fullWidth>
                    <InputLabel id="orders-year-select-label" size="small">
                      Year
                    </InputLabel>
                    <Select
                      labelId="orders-year-select-label"
                      id="orders-year-select"
                      value={ordersYear}
                      label="Year"
                      size="small"
                      onChange={handleOrdersYearChange}
                    >
                      {years.map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <LineChart height={370} chartData={orderChartData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardHome;
