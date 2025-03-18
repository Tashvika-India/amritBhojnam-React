import React, { useEffect, useState } from "react";
import revenueIcon from "../../../../assets/images/dashboard/revenue-icon.png";
import productIcon from "../../../../assets/images/dashboard/product-icon.png";
import orderIcon from "../../../../assets/images/dashboard/order-icon.png";
import categoryIcon from "../../../../assets/images/dashboard/category-icon.png";
import dashboardArrow from "../../../../assets/images/dashboard/dashboard-arrow.png";
import { getDashboardApi } from "../../../../services/adminApiRoutes";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { HiArrowTrendingDown } from "react-icons/hi2";
function OverviewCardsSection({ dashboard }) {
  return (
    <>
      <div className="col-md-3">
        <RevenueCard title="Revenue" icon={revenueIcon} dashboard={dashboard} />
      </div>
      <div className="col-md-3">
        <OrderCard title="Orders" icon={orderIcon} dashboard={dashboard} />
      </div>
      <div className="col-md-3">
        <TotalProductCard
          title="Total Products"
          icon={productIcon}
          dashboard={dashboard}
        />
      </div>
      <div className="col-md-3">
        <CategoriesCard
          title="Total Categories"
          icon={categoryIcon}
          dashboard={dashboard}
        />
      </div>
    </>
  );
}

export default OverviewCardsSection;

function RevenueCard({ title, icon, dashboard }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-between mb-3">
          <h5 className="">{title}</h5>
          <img src={icon}></img>
        </div>
        <h5 className="mb-2 fw-600">
          {~~dashboard?.total_revenue}{" "}
          <small className="fw-400" style={{ fontSize: "0.75rem" }}>
            Rs
          </small>{" "}
        </h5>
        <div className="d-between">
          <span className="text-secondary text-sm d-flex align-items-center gap-2">
            {/* <img src={dashboardArrow}></img> */}
            <>
              {dashboard?.revenue_comparison == "Up" ? (
                <HiArrowTrendingUp
                  size={23}
                  className="text-success "
                  style={{ strokeWidth: 2 }}
                />
              ) : (
                <HiArrowTrendingDown
                  size={23}
                  className="text-danger "
                  style={{ strokeWidth: 2 }}
                />
              )}
            </>
            {dashboard.revenue_percentage}% ({dashboard.revenue_comparison})
          </span>
          <span className="text-sm">View all transactions</span>
        </div>
      </div>
    </div>
  );
}

function OrderCard({ title, icon, dashboard }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-between mb-3">
          <h5 className="">{title}</h5>
          <img src={icon}></img>
        </div>
        <h5 className="mb-2 fw-600">{dashboard?.total_orders} </h5>
        <div className="d-between">
          <span className="text-secondary text-sm d-flex gap-2">
          <>
              {dashboard?.revenue_comparison == "Up" ? (
                <HiArrowTrendingUp
                  size={23}
                  className="text-success "
                  style={{ strokeWidth: 2 }}
                />
              ) : (
                <HiArrowTrendingDown
                  size={23}
                  className="text-danger "
                  style={{ strokeWidth: 2 }}
                />
              )}
            </>
            {dashboard.orders_percentage}% ({dashboard.orders_comparison})
          </span>
          <span className="text-sm">View all transactions</span>
        </div>
      </div>
    </div>
  );
}

function TotalProductCard({ title, icon, dashboard }) {
  return (
    <div className="card h-100">
      <div className="card-body h-100 d-flex flex-column justify-content-between">
        <div className="d-between mb-3">
          <h5 className="">{title}</h5>
          <img src={icon}></img>
        </div>
        <div className="d-between">
          <span className="">
            {" "}
            <h5 className="mb-0 fw-600">{dashboard?.total_products} </h5>
          </span>
          {/* <span className="text-sm">View all transactions</span> */}
        </div>
      </div>
    </div>
  );
}

function CategoriesCard({ title, icon, dashboard }) {
  return (
    <div className="card h-100">
      <div className="card-body h-100 d-flex flex-column justify-content-between">
        <div className="d-between mb-3">
          <h5 className="">{title}</h5>
          <img src={icon}></img>
        </div>
        <div className="d-between">
          <span className="">
            {" "}
            <h5 className="mb-0 fw-600">
              {dashboard?.total_categories}{" "}
              <small className="fw-400" style={{ fontSize: "0.75rem" }}></small>{" "}
            </h5>
          </span>
          {/* <span className="text-sm">View all transactions</span> */}
        </div>
      </div>
    </div>
  );
}
