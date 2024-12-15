import React from "react";
import OverviewCardsSection from "./components/OverviewCardsSection";
import DashboardCategoryTable from "./components/DashboardCategoryTable";
import { Link } from "react-router-dom";
import Heading from "@/components/ui/Heading";
import LineChart from "../../../components/charts/LineChart";
import DashboardOrderTable from "./components/DashboardOrderTable";

function DashboardHome() {
  return (
    <>
      <div className="mt-3 mb-5">
        <Heading value={"Dashboard"}/>
      </div>
      <div className="row mb-5">
        <OverviewCardsSection />
      </div>
      <div className="mb-5">
        <div className="card h-100">
          <div className="card-body">
            <LineChart height={400} />
          </div>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-between align-items-center p-3">
                <h5 className="mb-0 fw-500">Categories</h5>
                <Link className="text-orange">View All</Link>
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
                <Link className="text-orange">View All</Link>
              </div>
              <DashboardCategoryTable />
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
                <Link className="text-orange">View All </Link>
              </div>
              <DashboardOrderTable />
            </div>
          </div>
        </div>
        <div className="col-md-6 h-100">
          <div className="card h-100">
            <div className="card-body h-100">
              <LineChart height={430} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardHome;
