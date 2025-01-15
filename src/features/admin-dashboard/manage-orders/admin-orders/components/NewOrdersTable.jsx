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
import AcceptOrderModal from "./AcceptOrderModal";
const NewOrdersTable = ({ order, getOrderList }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [orderStatus, setOrderStatus] = useState([]);

  const showAcceptModal = (status, orderId) => {
    const data = { status, orderId };
    setModalVisible(true);
    setOrderStatus(data);
  };


  const getRandomColor = () => {
    // Generate a random color in hex format
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const isGreyColor = (color) => {
    // Check if the color is grey by comparing RGB values
    const rgb = parseInt(color.slice(1), 16);
    const r = (rgb >> 16) & 0xFF;
    const g = (rgb >> 8) & 0xFF;
    const b = rgb & 0xFF;
    return r === g && g === b; // Check if all RGB components are equal
  };

  const lightenColor = (color, percent) => {
    // Lighten the color by the given percentage
    const rgb = parseInt(color.slice(1), 16);
    let r = (rgb >> 16) & 0xFF;
    let g = (rgb >> 8) & 0xFF;
    let b = rgb & 0xFF;

    r = Math.min(255, r + (255 - r) * percent);
    g = Math.min(255, g + (255 - g) * percent);
    b = Math.min(255, b + (255 - b) * percent);

    return `#${((1 << 24) + (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b)).toString(16).slice(1)}`;
  };


  const paymentStatusTemplate = (rowData) => { 
    return (
      <div>
        <p className="mb-0 fw-500">
          {rowData?.payment_details?.payment_mode}
        </p>
        <p className="mb-0 fw-400 text-orange">
          {rowData?.status}
        </p>
      </div>
    );
  };

  const orderTemplate = (rowData) => { 
    return (
      <>
        {/* {(rowData?.product_details.map((item) => {
          return (
            <div className="d-flex align-items-center gap-3 mb-2 border-bottom pb-2">
              <img src={item?.product?.images[0]?.image} alt="img" style={{ width: "3.5rem", height: "4rem" }} />
              <div className="d-flex flex-column">
                <p className="fw-400 mb-0" style={{ fontSize: ".9rem" }}>{item?.product?.name}</p>
                <p className="fw-400 mb-0" style={{ fontSize: ".9rem" }}>Qty: {item?.item_quantity}</p>
                <p className="fw-400 mb-0" style={{ fontSize: ".9rem" }}>Rs. {~~(item?.price)}</p>
              </div>
            </div>
          );
        }))} */}

        <div className="d-flex align-items-center gap-3 mb-2 pb-2">
          <img src={rowData?.product_details[0]?.product?.images[0]?.image} alt="img" style={{ width: "3.5rem", height: "4rem" }} />
          <div className="d-flex flex-column">
            <p className="fw-400 mb-0" style={{ fontSize: "1rem" }}>{rowData?.product_details[0]?.product?.name}</p>
            <Link to={`/admin/order-details/${rowData.id}`} className="fw-400 mb-0 text-primary" style={{ fontSize: ".88rem" }}>View all orders</Link>
          </div>
        </div>
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
            <button className="fw-400 lt-pending-button">Pending</button>
          </>
        ) : rowData?.status === "cancelled" ? (
          <button className="fw-400 lt-red-button">Cancel</button>
        ) : rowData?.status === "accepted" ? (
          <button className="fw-400 lt-green-button">Accept</button>
        ) : null}
      </>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        {
          rowData?.status === "confirmed"
            ?
            <div className="d-flex gap-3 align-items-center">
              <button className="lt-green-button" onClick={() => showAcceptModal(true, rowData?.id)}>Accept</button>
              <button className="lt-red-button" onClick={() => showAcceptModal(false, rowData?.id)}>Cancel</button>
            </div>
            :
            <div>
              {(rowData?.status === "accepted") && <button className="lt-green-button">Order Accepted</button>}
              {(rowData?.status === "cancelled") && <button className="lt-red-button">Order cancelled</button>}
            </div>
        }

      </>
    );
  };

  const customerTemplate = (rowData) => {
    const initials = `${rowData?.delivering_to?.ads_name}`
      .split(" ")
      .map((n) => n[0])
      .join("");
    let backgroundColor = getRandomColor();
    let color = getRandomColor();

    // If the color is grey, set the background color to a lighter shade
    if (isGreyColor(backgroundColor)) {
      backgroundColor = lightenColor(backgroundColor, 0.5); // 30% lighter
    }
    return (
      <div className="d-flex align-items-center gap-3">
        <Avatar
          label={initials}
          style={{ height: "3.3rem", width: "3.3rem", aspectRatio: "1/1", backgroundColor: backgroundColor, color: color, textTransform: 'uppercase' }}
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
          field="display_order_id"
          header="ID"
          body={(rowData) => <><Link to={`/admin/order-detail/${rowData.id}`} style={{ width: "100%", color: "#584EE0" }}>#{rowData.id.slice(0,8)}</Link></>}
        ></Column>
        <Column header="ORDER" body={orderTemplate} style={{ width: "20%" }}></Column>
        <Column header="CUSTOMER" body={customerTemplate} style={{ width: "10%" }}></Column>
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
      <AcceptOrderModal visible={modalVisible} getOrderList={getOrderList} setVisible={() => setModalVisible(false)} orderStatus={orderStatus} />
    </div>

  );
};

export default NewOrdersTable;
