import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import {
  Breadcrumbs,
  Divider,
} from "@mui/material"; 
import { DataTable } from "primereact/datatable";
import { TiTick } from "react-icons/ti";
import { Column } from "primereact/column"; 
import { BsBoxFill, BsFillHandbagFill } from "react-icons/bs";
import { FaCheck, FaGears, FaLocationDot, FaRoute } from "react-icons/fa6";
import { ImPrinter } from "react-icons/im";
import { Avatar } from "primereact/avatar";
import { FaUser } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { FaPhoneAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { getOrderAdminApi } from "../../../../services/adminApiRoutes"; 
import Typography from "@mui/material/Typography"; 
import { notifyError } from "../../../../components/ui/Notification"; 
import AcceptOrderModal from "../admin-orders/components/AcceptOrderModal";
import Loading from "../../../../components/ui/Loading";
import AcceptDispatchOrderModal from "../admin-orders/components/AcceptDispatchOrderModal";

const AdminOrderDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [datetime12h, setDateTime12h] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [dispatchVisible, setDispatchVisible] = useState(false);
  const [orderStatus, setOrderStatus] = useState([]);
  const [orderDispatch, setOrderDispatch] = useState([]);


    const showAcceptModal = (status, orderId, display_order_id) => {
      const data = { status, orderId , display_order_id};
      setModalVisible(true);
      setOrderStatus(data); 
    };
    
    const dispatchModal = (status, orderId, display_order_id) => {
      const data = { status, orderId , display_order_id};
      setDispatchVisible(true);
      setOrderDispatch(data);
    };

  const getOrderList = async (name = "") => {
    setLoading(true);
    try {
      const response = await getOrderAdminApi(id, name);
      setOrderData(response?.data?.results[0]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      notifyError(error.response?.data?.error);
    }
  };

  useEffect(() => {
    getOrderList();
  }, []);

  const currentStatus = orderData?.status;  

  const steps = [
    { id: 1, name: 'confirmed',title: 'Confirmed', date: "10 Feb, 2025 - 04:00 PM" },
    { id: 2, name: 'accepted',title: 'Accepted', date: "11 Feb, 2025 - 07:00 PM" },
    { id: 3, name: 'dispatched', title: 'Ready to dispatch', date: "14 Feb, 2025 - 01:00 PM" },
    { id: 4, name: 'out_of_delivery', title: 'Out of delivery', date: "14 Feb, 2025 - 05:00 PM" },
    { id: 5, name: 'delivered', title: 'Delivered', date: "15 Feb, 2025 - 06:00 PM" },
  ];

  const stepsline = steps?.filter((items) => items.name !== "confirmed"); 
  const currentStepIndex = stepsline.findIndex(step => step.name === currentStatus);

  const formatStepName = (name) => {
    return name
      .replace(/_/g, ' ')  
      .replace(/\b\w/g, (char) => char.toUpperCase());  
  };


  const initials = orderData?.delivering_to?.ads_name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const orderTemplate = (rowData) => {
    return (
      <div>
        <img src={rowData?.product?.images[0]?.image} alt="img" width={60} height={60} />
      </div>
    );
  };


  return (
    <>
      <div className="mt-5 mb-5 row">
        <div className="col-12 mb-3">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to={"/admin/orders"} >Orders List</Link>
            <Typography className="text-orange">Order Detail</Typography>
          </Breadcrumbs>
        </div>
        <div className="col-6">
          <Heading value={`Order : ${orderData?.display_order_id}`} />
        </div>
      </div>

      { 
        loading ? ( <Loading />) :
        <div className="row">
        <div className="col-md-8 mb-4">
          <div className="card px-3">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-4 align-items-center">
                <div className="d-flex gap-3">
                  <BsFillHandbagFill size={20} />
                  <p className="fw-500 fb-fs-18 mb-0">Order Details</p>
                </div>
                <div>
                  <button className="btn aqua-button">
                    <ImPrinter fill="#40A3AA" size={20} />
                    Invoice
                  </button>
                </div>
              </div>
              <div className="w-100">
                <DataTable
                  value={orderData?.product_details}
                  responsiveLayout="scroll"
                  paginator
                  rows={3}
                >
                  <Column
                    filed="Image"
                    header="IMAGE"
                    body={orderTemplate}
                  ></Column>
                  <Column filed="Name" header="NAME" body={rowData => rowData?.product?.name}></Column>
                  <Column filed="Quanity" header="QUANTITY" body={rowData => rowData?.item_quantity}></Column>
                  <Column filed="Amount" header="AMOUNT" body={rowData => rowData?.price}></Column>
                  {/* <Column field="Total" header="TOTAL"></Column> */}
                </DataTable>
                <div className="w-100">
                  <ul>
                    <li className="py-3 text-end">
                      <span className="d-inline-block text-start" style={{ width: "15rem" }}>Sub Total</span> <span className="d-inline-block text-end" style={{ width: "5rem" }}>Rs. {~~(orderData?.amount_to_pay)}</span>
                    </li>
                    <li className="border-top py-3 text-end">
                      <span className="d-inline-block text-start" style={{ width: "15rem" }}>Extra Charges</span> <span className="d-inline-block text-end" style={{ width: "5rem" }}>Rs. {~~(orderData?.delivery_charges)}</span>
                    </li>
                    <li className="border-top py-3 text-end">
                      <span className="d-inline-block text-start" style={{ width: "15rem" }}>Total</span> <span className="d-inline-block text-end" style={{ width: "5rem" }}>Rs. {~~(orderData?.total)}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card p-2">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="d-flex gap-3">
                  <FaRoute size={25} />
                  <p className="fw-500 fb-fs-18 mb-0">Track Order</p>
                </div>
                <div>
                  {orderData?.status === "confirmed" ? (
                    <>
                      <button className="btn light-default-button py-1" style={{backgroundColor: '#E8C51E',color: 'white'}}>Pending</button>
                    </>
                  )  : orderData?.status === "accepted" ? (
                    <button className="btn light-default-button py-1" style={{backgroundColor: '#4BAE4F',color: 'white'}}>Accepted</button>
                  ) : orderData?.status === "dispatched" ? (
                    <button className="btn light-default-button py-1" style={{backgroundColor: '#d59615',color: 'white'}}>Dispatched</button>
                  ) : null}
                </div>
              </div>
              <div className="text-start Track-stepper pt-4">
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    {stepsline.map((step, index) => (
                      <div className={`d-flex gap-3 stepper-wrapper-order ${index <= currentStepIndex ? 'active' : ''}`} key={step.id} >
                        <div
                          style={{
                            width: '23px',
                            height: '23px',
                            borderRadius: '50%',
                            backgroundColor: index <= currentStepIndex ? '#4BAE4F' : '#DADADA',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '10px',
                          }}
                        >
                          <FaCheck color="white" size={12} />
                        </div>
                        <div className="d-flex flex-column justify-content-start align-items-start stepper-content">
                          <h6 className="fw-400 mb-0 " style={{ fontSize: "1rem"}}>{formatStepName(step.title)}</h6>
                          {index <= currentStepIndex && <p className="fw-400" style={{ fontSize: "0.875rem", color: "#918E92" }}>{step.date || ""}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-2">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="d-flex gap-3">
                  <FaUser size={20} />
                  <p className="fw-500 fb-fs-18 mb-0">Customer Details</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center gap-3">
                  <Avatar
                    label={initials}
                    style={{
                      height: "3.3rem",
                      width: "3.3rem",
                      aspectRatio: "1/1",
                      backgroundColor: "#D3F4D4",
                      color: "#3C8B3E",
                    }}
                    shape="circle"
                    className="p-mr-2"
                  />
                  <div>
                    <p className="mb-0">{orderData?.delivering_to?.ads_name}</p>
                    <small
                      className="fw-400"
                      style={{ fontSize: ".88rem", color: "#584EE0" }}
                    > {orderData?.delivering_to?.ads_phone}
                    </small>
                  </div>
                </div>
                <div className="rounded-2 bg-light-orange p-3 ">
                  <FaPhoneAlt color="#F26722" size={20} />
                </div>
              </div>
              <div className="mb-4">
                <p className="fw-500 text-mid-grey mb-0 pb-2 fb-fs-14">Email</p>
                <p className="fw-400" style={{ color: "#584EE0" }}>
                  {orderData?.delivering_to?.ads_email || "N/A"}
                </p>
              </div>
              <Divider />
              <div className="mt-4">
                <p className="fw-500 text-mid-grey mb-0 fb-fs-14 pb-4">
                  Payment Details
                </p>
                <div>
                  <div className="d-flex align-items-start gap-5 pb-2">
                    <p className="fw-500 mb-0">Type</p> <span> :</span>
                    <p className="mb-0">{orderData?.payment_details?.payment_mode}</p>
                  </div>
                  <div className="d-flex align-items-start gap-4">
                    <p className="fw-500 mb-0">Status</p> <span> :</span>
                    <p className="mb-0 ps-3">{orderData?.payment_details?.status}</p>
                    {/* <button
                      style={{
                        color: "#584EE0",
                        fontSize: "0.875rem",
                        backgroundColor: "#EDECFF",
                        border: "none",
                        padding: "4px 1.2rem",
                        borderRadius: "5px",
                      }}
                    >
                      Set Paid
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card p-2 mt-4">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="d-flex gap-3">
                  <BsBoxFill size={22} />
                  <p className="fw-500 fb-fs-18 mb-0">
                    Package Dimension & Weight
                  </p>
                </div>
              </div>
              <div className="d-flex gap-4 mt-5">
                <p className="fw-500" style={{ width: "30%" }}>Length </p> <span>:</span>
                <p className="">{~~(orderData?.length)} cm</p>
              </div>
              <div className="d-flex gap-4">
                <p className="fw-500" style={{ width: "30%" }}>Breadth </p> <span>:</span>
                <p className="">{~~(orderData?.breadth)} Cm</p>
              </div>
              <div className="d-flex gap-4">
                <p className="fw-500" style={{ width: "30%" }}>Height </p> <span>:</span>
                <p className="">{~~(orderData?.height)} Cm</p>
              </div>
              <div className="d-flex gap-4">
                <p className="fw-500" style={{ width: "30%" }}>Weight </p> <span>:</span>
                <p className="">{(orderData?.weight_in_g)} Kg</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6">
              <div className="card p-2">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="d-flex gap-3">
                      <TbTruckDelivery size={28} />
                      <p className="fw-500 fb-fs-18 mb-0">Delivery Type</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-2">
                    <div className="d-flex align-items-start gap-5">
                      <p className="fw-500 mb-0">Type</p> <span> :</span>
                      <p className="mb-0">Standard Delivery</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card p-2">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="d-flex gap-3">
                      <FaGears size={25} />
                      <p className="fw-500 fb-fs-18 mb-0">Action</p>
                    </div>
                  </div>
                  {orderData?.status === "confirmed" && (
                    <div className="mt-2 d-flex gap-4 align-items-center">
                      <p className="mb-0 fw-600">Order is Ready to Book</p>
                      <button className="button-yellow d-flex gap-2 px-3 fb-fs-16" onClick={() => showAcceptModal(true, orderData?.id, orderData?.display_order_id)} style={{ paddingBlock: ".8rem" }}>
                        <TiTick size={20} />
                        Accept Order
                      </button>
                    </div>
                  )}
                  {orderData?.status === "accepted" && (
                    <>
                      <div className="mt-2 d-flex gap-4 align-items-center">
                        <p className="mb-0 fw-600">Order is Ready to Dispatch</p>
                        <button className="button-yellow d-flex gap-2 px-3 fb-fs-16" onClick={() => dispatchModal(true, orderData?.id, orderData?.display_order_id)} style={{ paddingBlock: ".8rem" }}>
                          <TiTick size={20} />
                          Ready to Dispatch
                        </button>
                      </div>
                    </>
                  )}
                  {orderData?.status === "dispatched" && (
                    <>
                      <div className="mt-2 d-flex gap-4 align-items-center">
                        <p className="mb-0 fw-600">Order is Dispatched</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="card p-2 mt-4">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="d-flex gap-3">
                      <FaLocationDot size={23} />
                      <p className="fw-500 fb-fs-18 mb-0">Address Details</p>
                    </div>
                  </div>
                  <div className="d-flex mt-4 pt-3">
                    <div className="w-50">
                      <p className="fw-600 mb-0">Delivery Address</p>
                      <div className="mt-4">
                        <div className="d-flex align-items-start">
                          <p className="fw-500 mb-0" style={{ width: "20%" }}>Name </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{ width: "80%" }}>{orderData?.delivering_to?.ads_name || ''}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{ width: "20%" }}>Address </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{ width: "80%" }}> {`${orderData?.delivering_to?.house_flat_block_no || ''} ${orderData?.delivering_to?.road_area_colony || ''} ${orderData?.delivering_to?.state || ''} ${orderData?.delivering_to?.pincode || ''}`}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{ width: "20%" }}>Address Line 2 </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{ width: "80%" }}> {`${orderData?.delivering_to?.house_flat_block_no || ''} ${orderData?.delivering_to?.road_area_colony || ''} ${orderData?.delivering_to?.state || ''} ${orderData?.delivering_to?.pincode || ''}`}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{ width: "20%" }}>City </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{ width: "80%" }}> {orderData?.delivering_to?.city || ''}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{ width: "20%" }}>Pin Code </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{ width: "80%" }}> {orderData?.delivering_to?.pincode || ''}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{ width: "20%" }}>State </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{ width: "80%" }}> {orderData?.delivering_to?.state || ''}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{ width: "20%" }}>Country </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{ width: "80%" }}> India</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{ width: "20%" }}>Phone </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{ color: "#584EE0", width: "60%" }}> {orderData?.delivering_to?.ads_phone || ''}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{ width: "20%" }}>Email </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{ color: "#584EE0", width: "60%" }}> {orderData?.delivering_to?.ads_email || ''}</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-50">
                      <p className="fw-600 mb-0">Shipping Address</p>
                      <div className="mt-4">
                        <div className="d-flex align-items-start">
                          <p className="fw-500 mb-0" style={{ width: "20%" }}>Name </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{ width: "80%" }}> {orderData?.delivering_to?.ads_name || ''}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{ width: "20%" }}>Address </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{ width: "80%" }}> {`${orderData?.delivering_to?.house_flat_block_no || ''} ${orderData?.delivering_to?.road_area_colony || ''} ${orderData?.delivering_to?.state || ''} ${orderData?.delivering_to?.pincode || ''}`}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{ width: "20%" }}>Address Line 2 </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{ width: "80%" }}> {`${orderData?.delivering_to?.house_flat_block_no || ''} ${orderData?.delivering_to?.road_area_colony || ''} ${orderData?.delivering_to?.state || ''} ${orderData?.delivering_to?.pincode || ''}`}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{ width: "20%" }}>City </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{ width: "80%" }}> {orderData?.delivering_to?.city || ''}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{ width: "20%" }}>Pin Code </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{ width: "80%" }}> {orderData?.delivering_to?.pincode || ''}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{ width: "20%" }}>State </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{ width: "80%" }}> {orderData?.delivering_to?.state || ''}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{ width: "20%" }}>Country </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{ width: "80%" }}> India</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{ width: "20%" }}>Phone </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{ color: "#584EE0", width: "60%" }}> {orderData?.delivering_to?.ads_phone || ''}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{ width: "20%" }}>Email </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{ color: "#584EE0", width: "60%" }}> {orderData?.delivering_to?.ads_email || ''}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >}
      <AcceptOrderModal visible={modalVisible} getOrderList={getOrderList} setVisible={() => setModalVisible(false)} orderStatus={orderStatus} />
      <AcceptDispatchOrderModal visible={dispatchVisible} getOrderList={getOrderList} setVisible={() => setDispatchVisible(false)} orderStatus={orderDispatch} />
    </>
  );
};

export default AdminOrderDetail;
