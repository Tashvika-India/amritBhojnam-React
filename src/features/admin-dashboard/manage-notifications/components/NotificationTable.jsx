import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import notificationIcon from "../../../../assets/images/dashboard/notification-bag-icon.png";
import orderDelivered from "../../../../assets/images/dashboard/order-delivered.png";

const NotificationTable = () => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center pb-3" style={{borderBottom: "1px solid #EEEEEE"}}>
          <ul>
            <li className="d-flex gap-3 align-items-center">
              <img
                className="img-fluid mt-1 mx-1"
                src={notificationIcon}
                alt="star"
              />
              <div>
                <p className="fb-fs-18 fw-600 mb-2">New Order Received</p>
                <p className="mb-0">
                  Order #7890 placed by Rahul ₹2,49. Payment...
                </p>
              </div>
            </li>
          </ul>
          <ul>
            <li>
                <p className="text-mid-grey mb-0">1 Day ago</p>
            </li>
          </ul>
        </div>
        <div className="d-flex justify-content-between align-items-center py-3" style={{borderBottom: "1px solid #EEEEEE"}}>
          <ul>
            <li className="d-flex gap-3 align-items-center">
              <img
                className="img-fluid mt-1 mx-1"
                src={orderDelivered}
                alt="star"
              />
              <div>
                <p className="fb-fs-18 fw-600 mb-2">New Order Received</p>
                <p className="mb-0">
                  Order #7890 placed by Rahul ₹2,49. Payment...
                </p>
              </div>
            </li>
          </ul>
          <ul>
            <li>
                <p className="text-mid-grey mb-0">1 Day ago</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotificationTable;
