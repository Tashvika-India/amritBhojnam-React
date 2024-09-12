import React from "react";
import revenueIcon from "../../../../assets/images/dashboard/revenue-icon.png";
import productIcon from "../../../../assets/images/dashboard/product-icon.png";
import orderIcon from "../../../../assets/images/dashboard/order-icon.png";
import categoryIcon from "../../../../assets/images/dashboard/category-icon.png";

function OverviewCardsSection() {
  return (
    <>
      <div className="col-md-3">
        <OverviewCard title="Revenue" icon={revenueIcon} />
      </div>
      <div className="col-md-3">
        <OverviewCard title="Products" icon={productIcon} />
      </div>
      <div className="col-md-3">
        <OverviewCard title="Orders" icon={orderIcon} />
      </div>
      <div className="col-md-3">
        <OverviewCard title="Categories" icon={categoryIcon} />
      </div>
    </>
  );
}

export default OverviewCardsSection;

function OverviewCard({ title, icon }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-between mb-3">
          <h4 className="">{title}</h4>
          <img src={icon}></img>
        </div>
        <h5 className="mb-2 fw-600">8,676 Rs</h5>
        <div className="d-between">
          <span className="text-secondary text-sm">35% vs last month</span>
          <span className="text-sm">View all transactions</span>
        </div>
      </div>
    </div>
  );
}
