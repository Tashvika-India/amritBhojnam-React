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
      customer: { name: "Aman Kumar", phone: "+91 1234567890", },
      amount: 299,
      payment: { type: "Card", status: "Unpaid" },
      date: "5 Aug, 2024 07:00PM",
    },
    {
      id: "#634782",
      customer: { name: "Raj Singh", phone: "+91 1234567890" },
      amount: 466,
      payment: { type: "Card", status: "Paid" },
      date: "5 Aug, 2024 07:00PM",
    },
    {
      id: "#634782",
      customer: { name: "David", phone: "+91 1234567890" },
      amount: 399,
      payment: { type: "UPI", status: "Paid" },
      date: "5 Aug, 2024 07:00PM",
    },
    {
      id: "#634782",
      customer: { name: "Piyush", phone: "+91 1234567890" },
      amount: 249,
      payment: { type: "Cash", status: "Unpaid" },
      date: "5 Aug, 2024 07:00PM",
    },
    {
      id: "#634782",
      customer: { name: "Rahul Singh", phone: "+91 1234567890" },
      amount: 349,
      payment: { type: "Card", status: "Paid" },
      date: "5 Aug, 2024 07:00PM",
    },
    {
      id: "#634782",
      customer: { name: "Mohit Kumar", phone: "+91 1234567890" },
      amount: 349,
      payment: { type: "UPI", status: "Paid" },
      date: "5 Aug, 2024 07:00PM",
    },
    {
      id: "#634782",
      customer: { name: "Raj Singh", phone: "+91 1234567890" },
      amount: 466,
      payment: { type: "Card", status: "Paid" },
      date: "5 Aug, 2024 07:00PM",
    },
    {
      id: "#634782",
      customer: { name: "David", phone: "+91 1234567890" },
      amount: 399,
      payment: { type: "UPI", status: "Paid" },
      date: "5 Aug, 2024 07:00PM",
    },
    {
      id: "#634782",
      customer: { name: "Piyush", phone: "+91 1234567890" },
      amount: 249,
      payment: { type: "Cash", status: "Unpaid" },
      date: "5 Aug, 2024 07:00PM",
    },
    {
      id: "#634782",
      customer: { name: "Rahul Singh", phone: "+91 1234567890" },
      amount: 349,
      payment: { type: "Card", status: "Paid" },
      date: "5 Aug, 2024 07:00PM",
    },
    {
      id: "#634782",
      customer: { name: "Mohit Kumar", phone: "+91 1234567890" },
      amount: 349,
      payment: { type: "UPI", status: "Paid" },
      date: "5 Aug, 2024 07:00PM",
    },
  ]);

  const paymentStatusTemplate = (rowData) => {
    return (
      <div>
        <p className="mb-0 fw-500">{rowData.payment.status === "Paid" ? "Upi" : "Card"}</p>
        <p className={rowData.payment.status === "Paid" ? "text-success fw-normal" : "text-danger fw-normal"}> {rowData?.payment?.status}</p>
      </div>
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
    const initials = rowData.customer.name
      .split(" ")
      .map((n) => n[0])
      .join("");
    return (
      <div className="d-flex alighn-items-center gap-3">
        <Avatar label={initials} style={{ height: "2.5rem", width: "2.5rem" }} shape="circle" className="p-mr-2" />
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
        <Column header="CUSTOMER" body={customerTemplate}></Column>
        <Column field="amount" header="AMOUNT"></Column>
        <Column header="PAYMENT" body={paymentStatusTemplate}></Column>
        <Column field="date" header="ORDER DATE"></Column>
        <Column header="ACTION" body={actionBodyTemplate}></Column>
      </DataTable>
    </div>
  );
};

export default NewOrdersTable;
