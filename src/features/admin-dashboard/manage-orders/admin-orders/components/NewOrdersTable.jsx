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
const NewOrdersTable = ({ order }) => {
  // const [orders, setOrders] = useState([
  //   {
  //     id: "#634782",
  //     order: {name: "Barri Proso Millet Rice", image: "../../../../../assets/images/dashboard/product-one.png" },
  //     customer: { name: "Aman Kumar", phone: "+91 1234567890", },
  //     amount: 299,
  //     payment: { type: "Card", status: "Unpaid" },
  //     date: "5 Aug, 2024 07:00PM",
  //   },
  //   {
  //     id: "#634782",
  //     order: {name: "Jowar Choco chip Millet Cookies ", image: "../../../../../assets/images/dashboard/product-two.png" },
  //     customer: { name: "Raj Singh", phone: "+91 1234567890" },
  //     amount: 466,
  //     payment: { type: "Card", status: "Paid" },
  //     date: "5 Aug, 2024 07:00PM",
  //   },
  //   {
  //     id: "#634782",
  //     order: {name: "Ragi Atta  Finger Millet", image: "../../../../../assets/images/dashboard/product-three.png" },
  //     customer: { name: "David", phone: "+91 1234567890" },
  //     amount: 399,
  //     payment: { type: "UPI", status: "Paid" },
  //     date: "5 Aug, 2024 07:00PM",
  //   },
  //   {
  //     id: "#634782",
  //     order: {name: "Instant Millet Idli MIx", image: "../../../../../assets/images/dashboard/product-four.png" },
  //     customer: { name: "Piyush", phone: "+91 1234567890" },
  //     amount: 249,
  //     payment: { type: "Cash", status: "Unpaid" },
  //     date: "5 Aug, 2024 07:00PM",
  //   },
  //   {
  //     id: "#634782",
  //     order: {name: "Jowar Muruku", image: "../../../../../assets/images/dashboard/product-five.png" },
  //     customer: { name: "Rahul Singh", phone: "+91 1234567890" },
  //     amount: 349,
  //     payment: { type: "Card", status: "Paid" },
  //     date: "5 Aug, 2024 07:00PM",
  //   },
  //   {
  //     id: "#634782",
  //     order: {name: "Ragi Vrg Soup Mix", image: "../../../../../assets/images/dashboard/product-six.png" },
  //     customer: { name: "Mohit Kumar", phone: "+91 1234567890" },
  //     amount: 349,
  //     payment: { type: "UPI", status: "Paid" },
  //     date: "5 Aug, 2024 07:00PM",
  //   }
  // ]);

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
          {" "}
          {rowData?.fulfillment_status}
        </p>
      </div>
    );
  };

  const orderTemplate = (rowData) => {
    return (
      <div>
        {/* <img src={rowData?.order?.image} alt="" srcset="" />
        <h6>{rowData?.order?.name}</h6> */}
        <p className="mb-0 fw-500">Order</p>
      </div>
    );
  };

  const duration = (rowData) => {
    const formattedDateRange = formatDateTime(rowData.created_at + "T18:00:00");
    return <div className="">{formattedDateRange}</div>;
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <>
        {rowData?.status === "confirmed" ? (
          <>
            <button className="lt-green-button py-0 lh-lg">Success</button>
            {/* <button className="lt-blue-button">Failed</button>
        <button className="lt-yellow-button">Pending</button> */}
          </>
        ) : (
          <button className="lt-yellow-button">Pending</button>
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
      <div className="d-flex alighn-items-center gap-3">
        <Avatar
          label={initials}
          style={{ height: "3.3rem", width: "3.3rem", aspectRatio: "1/1" }}
          shape="circle"
          className="p-mr-2"
        />
        <div>
          {/* {rowData.customer.name} <br /> <small>{rowData.customer.phone}</small> */}
          <span>{rowData?.user_id.slice(-8)}</span>
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
          body={(rowData) => `#${rowData.id.slice(-8)}`}
        ></Column>
        <Column header="ORDER" body={orderTemplate}></Column>
        <Column header="CUSTOMER" body={customerTemplate}></Column>
        <Column field="amount_to_pay" header="AMOUNT"></Column>
        <Column
          field="status"
          header="STATUS"
          body={statusBodyTemplate}
        ></Column>
        <Column header="PAYMENT" body={paymentStatusTemplate}></Column>
        {/* <Column header="ORDER DATE" body={duration}></Column> */}
        {/* <Column header="ACTION" body={actionBodyTemplate}></Column> */}
      </DataTable>
    </div>
  );
};

export default NewOrdersTable;
