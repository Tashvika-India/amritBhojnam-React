import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Avatar } from "primereact/avatar";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { MdEdit } from "react-icons/md";
import { IoMdPrint } from "react-icons/io";
import { formatDateTime } from "../../../../../utils/constant-variable";
import { Link } from "react-router-dom";
const NewOrdersTable = ({ order }) => {

  const paymentStatusTemplate = (rowData) => {
    return (
      <div>
        <p className="mb-0 fw-500">
          {rowData?.fulfillment_status === "Paid" ? "Upi" : "Card"}
        </p>
        <p
          className={
            rowData?.fulfillment_status === "pending"
              ? "text-warning fw-normal"
              : rowData?.fulfillment_status === "success"
                ? "text-success fw-normal"
                : "text-danger fw-normal"
          }
        >
          {rowData?.fulfillment_status}
        </p>
      </div>
    );
  };

  const orderTemplate = (rowData) => {
    return (
      <>
        {(rowData?.product_details.map((item) => {
          return (
            <div className="d-flex align-items-center gap-3 mb-2 border-bottom pb-2">
              <img src={item?.product?.images[0]?.image} alt="img" style={{ width: "3.5rem", height: "4rem" }} />
              <div className="d-flex flex-column">
                <p className="fw-400 mb-0" style={{ fontSize: ".9rem" }}>{item?.product?.name}</p>
                <p className="fw-400 mb-0" style={{ fontSize: ".9rem" }}>{item?.item_quantity}</p>
                <p className="fw-400 mb-0" style={{ fontSize: ".9rem" }}>Rs. {~~(item?.price)}</p>
              </div>
            </div>
          );
        }))}
      </>
    );
  };

  const duration = (rowData) => {
    const formattedDateRange = formatDateTime(rowData?.created_at);
    return <div className="fw-400" style={{ fontSize: ".9rem" }}>{formattedDateRange}</div>;
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <>
        {rowData?.status === "confirmed" ? (
          <>
            <button className="fw-400 lt-green-button py-0 lh-lg">confirmed</button>
          </>
        ) : rowData?.status === "pending" ? (
          <button className="fw-400 lt-yellow-button">pending</button>
        ) : (
          <button className="fw-400 lt-red-button">Failed</button>
        )}
      </>
    );
  };

  const actionBodyTemplate = () => {
    return (
      <div className="d-flex gap-3">
        <button className="lt-green-button">Accept</button>
        <button className="lt-red-button">Reject</button>
      </div>
    );
  };

  const customerTemplate = (rowData) => {
    const initials = "Ankit Sharma"
      .split(" ")
      .map((n) => n[0])
      .join("");
    return (
      <div className="d-flex align-items-center gap-3">
        <Avatar
          label={initials}
          style={{ height: "3.3rem", width: "3.3rem", aspectRatio: "1/1", backgroundColor: "#D3F4D4", color: "#3C8B3E" }}
          shape="circle"
          className="p-mr-2"
        />
        <div>
          <p className="mb-0 ">{rowData?.delivering_to?.ads_name}</p>
          <small className="fw-400" style={{ fontSize: ".88rem" }}>{rowData?.delivering_to?.ads_phone}</small>
        </div>
      </div>
    );
  };

  return (
    <div className="datatable">
      <DataTable value={order} paginator rows={10}>
        <Column
          field="id"
          header="ID"
          body={(rowData) => <><Link to={`/admin/order-detail/`} style={{ width: "100%", color: "#584EE0" }}>${rowData.id.slice(-8)}</Link></>}
        ></Column>
        <Column header="ORDER" body={orderTemplate} style={{ width: "25%" }}></Column>
        <Column header="CUSTOMER" body={customerTemplate} style={{ width: "15%" }}></Column>
        <Column field="amount_to_pay" header="AMOUNT" body={(rowData) => `Rs. ${~~(rowData.amount_to_pay)}`}></Column>
        <Column
          field="status"
          header="STATUS"
          body={statusBodyTemplate}
        ></Column>
        <Column header="PAYMENT" body={paymentStatusTemplate}></Column>
        <Column header="ORDER DATE" body={duration}></Column>
        <Column header="ACTION" body={actionBodyTemplate}></Column>
      </DataTable>
    </div>
  );
};

export default NewOrdersTable;
