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

const NewOrdersTable = () => {
  const [orders, setOrders] = useState([
    {
      id: "#634782",
      customer: { name: "Aman Kumar", phone: "+91 1234567890" },
      order: 299,
      payment: { type: "Card", status: "Unpaid" },
      date: "5 Aug, 2024 07:00PM",
    },
    {
      id: "#634782",
      customer: { name: "Raj Singh", phone: "+91 1234567890" },
      order: 466,
      payment: { type: "Card", status: "Paid" },
      date: "5 Aug, 2024 07:00PM",
    },
    {
      id: "#634782",
      customer: { name: "David", phone: "+91 1234567890" },
      order: 399,
      payment: { type: "UPI", status: "Paid" },
      date: "5 Aug, 2024 07:00PM",
    },
    {
      id: "#634782",
      customer: { name: "Piyush", phone: "+91 1234567890" },
      order: 249,
      payment: { type: "Cash", status: "Unpaid" },
      date: "5 Aug, 2024 07:00PM",
    },
    {
      id: "#634782",
      customer: { name: "Rahul Singh", phone: "+91 1234567890" },
      order: 349,
      payment: { type: "Card", status: "Paid" },
      date: "5 Aug, 2024 07:00PM",
    },
    {
      id: "#634782",
      customer: { name: "Mohit Kumar", phone: "+91 1234567890" },
      order: 349,
      payment: { type: "UPI", status: "Paid" },
      date: "5 Aug, 2024 07:00PM",
    },
    {
      id: "#634782",
      customer: { name: "Raj Singh", phone: "+91 1234567890" },
      order: 466,
      payment: { type: "Card", status: "Paid" },
      date: "5 Aug, 2024 07:00PM",
    },
    {
      id: "#634782",
      customer: { name: "David", phone: "+91 1234567890" },
      order: 399,
      payment: { type: "UPI", status: "Paid" },
      date: "5 Aug, 2024 07:00PM",
    },
    {
      id: "#634782",
      customer: { name: "Piyush", phone: "+91 1234567890" },
      order: 249,
      payment: { type: "Cash", status: "Unpaid" },
      date: "5 Aug, 2024 07:00PM",
    },
    {
      id: "#634782",
      customer: { name: "Rahul Singh", phone: "+91 1234567890" },
      order: 349,
      payment: { type: "Card", status: "Paid" },
      date: "5 Aug, 2024 07:00PM",
    },
    {
      id: "#634782",
      customer: { name: "Mohit Kumar", phone: "+91 1234567890" },
      order: 349,
      payment: { type: "UPI", status: "Paid" },
      date: "5 Aug, 2024 07:00PM",
    },
  ]);

  const paymentStatusTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.payment.status}
        severity={rowData.payment.status === "Paid" ? "success" : "danger"}
      ></Tag>
    );
  };

  const actionBodyTemplate = () => {
    return (
      <div className="d-flex gap-3">
        <button className="lt-blue-button">
          <MdEdit size={24} />
        </button>
        <button className="lt-cyan-button" size={24}>
          <IoMdPrint />
        </button>
      </div>
    );
  };

  const customerTemplate = (rowData) => {
    const initials = rowData.customer.name
      .split(" ")
      .map((n) => n[0])
      .join("");
    return (
      <div className="d-flex alighn-items-center gap-3">
        <Avatar label={initials} size="" shape="circle" className="p-mr-2" />
        <div>
          {rowData.customer.name} <br /> <small>{rowData.customer.phone}</small>
        </div>
      </div>
    );
  };

  return (
    <div className="datatable">
      <DataTable value={orders} paginator rows={10}>
        <Column field="id" header="ID"></Column>
        <Column header="Customer" body={customerTemplate}></Column>
        <Column field="order" header="Order (Rs)"></Column>
        <Column header="Payment" body={paymentStatusTemplate}></Column>
        <Column field="date" header="Order Date"></Column>
        <Column header="Action" body={actionBodyTemplate}></Column>
      </DataTable>
    </div>
  );
};

export default NewOrdersTable;
