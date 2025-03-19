import React, { useEffect, useState } from "react";
import OverviewCardsSection from "./components/OverviewCardsSection";
import DashboardCategoryTable from "./components/DashboardCategoryTable";
import { Link } from "react-router-dom";
import Heading from "@/components/ui/Heading";
import LineChart from "../../../components/charts/LineChart";
import DashboardOrderTable from "./components/DashboardOrderTable";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { transformApiDataRevenue } from "../../../utils/constant-variable";
import DashboardRecentOrderTable from "./components/DashboardRecentOrderTable";
import { getDashboardApi } from "../../../services/adminApiRoutes";
import { transformRevenueData } from "../../../utils/constant-variable";
import dayjs from "dayjs";
import "rsuite/dist/rsuite.min.css"; //
import { DateRangePicker } from "rsuite";

function DashboardHome() {
  const [dashboard, setDashboard] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentYear = new Date().getFullYear();
  const now = new Date();
  const firstDayOfLastMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1
  );
  const lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
  const [revenueYear, setRevenueYear] = useState(currentYear);
  const [ordersYear, setOrdersYear] = useState(currentYear);
  const firstDayOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfCurrentMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  );

  const [selectedRange, setSelectedRange] = useState([
    firstDayOfCurrentMonth,
    lastDayOfCurrentMonth,
  ]);

  const [selectedOrderRange, setSelectedOrderRange] = useState([
    firstDayOfCurrentMonth,
    lastDayOfCurrentMonth,
  ]);

  const revenueStartDate = selectedRange?.[0]
    ? dayjs(selectedRange[0]).format("YYYY-MM-DD")
    : null;
  const revenueEndDate = selectedRange?.[1]
    ? dayjs(selectedRange[1]).format("YYYY-MM-DD")
    : null;

  const orderStartDate = selectedOrderRange?.[0]
    ? dayjs(selectedOrderRange[0]).format("YYYY-MM-DD")
    : null;
  const orderEndDate = selectedOrderRange?.[1]
    ? dayjs(selectedOrderRange[1]).format("YYYY-MM-DD")
    : null;

  const handleDateChange = (range) => {
    if (range && range.length === 2) {
      setSelectedRange(range);
    }
  };

  const handleOrderDateChange = (range) => {
    if (range && range.length === 2) {
      setSelectedOrderRange(range);
    }
  };

  const formatDate = (date) => date.toISOString().split("T")[0];
  const handleRevenueYearChange = (event) => {
    setRevenueYear(event.target.value);
  };

  const handleOrdersYearChange = (event) => {
    setOrdersYear(event.target.value);
  };

  // Years array for the dropdown
  const years = Array.from(
    { length: currentYear - 2018 },
    (_, i) => currentYear - i
  );

  const fetchDashboardData = async (revenueYear, ordersYear) => {
    setLoading(true);

    try {
      const response = await getDashboardApi({
        revenue_start_date: revenueStartDate,
        revenue_end_date: revenueEndDate,
        order_start_date: orderStartDate,
        order_end_date: orderEndDate,
      });
      setDashboard(response?.data || []);
    } catch (error) {
      console.log("Error on Dashboard List", error);
    } finally {
      setLoading(false);
    }
  };

  const revenueChartData = transformApiDataRevenue(
    dashboard?.revenue_stats || []
  );
  console.log("revenue", revenueChartData);

  const orderChartData = transformRevenueData(dashboard?.orders || []);

  useEffect(() => {
    fetchDashboardData(
      revenueStartDate,
      revenueEndDate,
      orderStartDate,
      orderEndDate
    );
  }, [revenueYear, selectedRange, selectedOrderRange]);

  return (
    <>
      {/* <Alert severity="info" className="mt-3">Currently, the dashboard data is static and under development. It will be dynamic once the order flow is complete.</Alert> */}

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
              <div style={{ width: "17%" }}>
                <DateRangePicker
                  className="w-100 border-1 border-grey-3"
                  placement="bottomEnd"
                  placeholder="Select Date Range"
                  format="dd-MM-yyyy"
                  value={selectedRange}
                  onChange={handleDateChange}
                />
              </div>
            </div>
            <LineChart height={400} chartData={dashboard?.revenue_stats} />
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-between align-items-center p-3">
                <h5 className="mb-0 fw-500">Categories</h5>
                <Link
                  to="/admin/category"
                  className="text-orange d-flex align-items-center fw-500 gap-1"
                >
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
                <Link
                  to="/admin/product"
                  className="text-orange d-flex align-items-center fw-500 gap-1"
                >
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
                <Link
                  to="/admin/orders"
                  className="text-orange d-flex align-items-center fw-500 gap-1"
                >
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
                <div style={{ width: "31%" }}>
                  <DateRangePicker
                    className="w-100 border-1 border-grey-3"
                    placement="bottomEnd"
                    placeholder="Select Date Range"
                    format="dd-MM-yyyy"
                    value={selectedOrderRange}
                    onChange={handleOrderDateChange}
                  />
                </div>
              </div>
              <LineChart height={370} chartData={dashboard?.orders} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardHome;
