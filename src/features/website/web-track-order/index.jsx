import React, { useEffect, useState } from "react";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import addressHome from "../../../assets/images/web/account/home-img.png";
import productImage from "../../../assets/images/web/product-card.png";
import { BsArrowRepeat } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IoReceiptOutline } from "react-icons/io5";
import OrderPlaced from "../../../assets/images/web/order-placed.svg";
import OrderConfirmed from "../../../assets/images/web/order-confirmed.svg";
import OrderDispatched from "../../../assets/images/web/order-dispatched.svg";
import OutDelivery from "../../../assets/images/web/out-delivery.svg";
import ProductDelivered from "../../../assets/images/web/product-delivered.svg";
import { Link, useParams } from "react-router-dom";
import { trackOrderApi } from "../../../services/adminApiRoutes";
import { Breadcrumbs } from "@mui/material";

const TrackOrder = () => {
  const [value, setValue] = useState(2);
  const { id } = useParams();
  const [trackOrder, setTrackOrder] = useState([]);

  const getTrackOrder = async () => {
    try {
      const response = await trackOrderApi(id);
      setTrackOrder(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrackOrder();
  }, []);

  // Default steps data
  const defaultSteps = [
    {
      label: "Order Placed",
      description: "We have received your order",
      date: "",
      time: "",
      icon: <CheckCircleIcon style={{ color: "", fontSize: "2rem" }} />,
      image: OrderPlaced,
    },
    {
      label: "Order Confirmed",
      description: "Your product packed and ready to ship",
      date: "",
      time: "",
      icon: <CheckCircleIcon style={{ color: "", fontSize: "2rem" }} />,
      image: OrderConfirmed,
    },
    {
      label: "Order Dispatched",
      description: "Your Product has been Dispatch",
      date: "",
      time: "",
      icon: <CheckCircleIcon style={{ color: "", fontSize: "2rem" }} />,
      image: OrderDispatched,
    },
    {
      label: "Out Of Delivery",
      description: "Your Product is out fo delivery ",
      date: "",
      time: "",
      icon: <CheckCircleIcon style={{ color: "", fontSize: "2rem" }} />,
      image: OutDelivery,
    },
    {
      label: "Product Delivered",
      description: "Delivery Expected - ",
      date: "",
      time: "",
      icon: <CheckCircleIcon style={{ color: "", fontSize: "2rem" }} />,
      image: ProductDelivered,
    },
  ];

  // Mapping between trackOrder status and steps label
  const statusToLabelMap = {
    confirmed: "Order Placed",
    accepted: "Order Confirmed",
    dispatched: "Order Dispatched",
    out_for_delivery: "Out Of Delivery",
    delivered: "Product Delivered",
  };

  // Map trackOrder data to steps
  const steps = defaultSteps.map((step) => {
    const trackOrderStep = trackOrder.find(
      (order) => statusToLabelMap[order.status] === step.label
    );
    return {
      ...step,
      date: trackOrderStep?.date || step.date,
      time: trackOrderStep?.time || step.time,
    };
  });


  const activeStepIndex = Math.max(
    ...trackOrder.map((step, index) => (step.is_active ? index : -1))
  );

  return (
    <div className="web-wrapper-main">
      <Header />
      <div className="pt-4">
        <div className="container fb-container">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/profile?tab=orders">
              Order
            </Link>
            <Typography className="text-orange">Track Order</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <div className="container fb-container mt-5">
        <div className="row">
          <p className="fb-fs-40 fw-bold">Track Order</p>
          <p className="fb-fs-26 fw-500 my-4">
            Order ID: <span className="text-yellow fw-600"> #{id}</span>
          </p>
          <div className="col-md-7">
            <div className="track-left">
              <div className="top-track-left d-flex justify-content-between align-items-center">
                <p>
                  Order Placed:
                  <span className="fw-600">&nbsp;&nbsp;March 10, 2024</span>
                </p>
                <div className="d-flex gap-4 text-end align-items-end">
                  <button className="fw-500 text-center border-0 text-orange bg-custom-btn-bg px-2 py-1 rounded-2 d-flex align-items-center gap-1 text-nowrap">
                    <BsArrowRepeat size={"1.2rem"} />
                    Buy Again
                  </button>
                  <button className="fw-500 text-center border-0 text-orange bg-custom-btn-bg d-flex align-items-center py-1 rounded-2 px-2 gap-1">
                    <HiDownload size={"1.2rem"} />
                    Invoice
                  </button>
                </div>
              </div>
              <div className="center-track-left mt-4 mb-5 mx-3">
                <div className="px-md-5 web-track-order" >
                  {steps.map((step, index) => {
                    const isActive = index <= activeStepIndex;
                    const isCompleted = index <= activeStepIndex;
                    return (
                      <div key={index}
                        className="d-flex align-items-start w-100">
                        <div className="d-flex flex-column align-items-center me-md-4">
                          <CheckCircleIcon
                            style={{
                              color: isCompleted ? "#D59615" : "#DADADA",
                              fontSize: "2rem", 
                            }}
                          />
                          {index < steps.length - 1 && (
                            <div
                              style={{
                                width: "2px",
                                height: "5rem",
                                border: isCompleted ? "1px dashed #D59615" : "1px dashed #DADADA",
                                paddingBottom: "1.125rem",
                                paddingTop: "0.625rem",
                              }}
                            />
                          )}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            paddingBottom: index === steps.length - 1 ? "0" : "",
                          }}
                          >
                          <img
                            src={step.image}
                            alt={step.label}
                            style={{
                              width: "3.875rem",
                              height: "3.875rem",
                              marginRight: "0.625rem",
                            }}
                          />
                          <div className="d-flex justify-content-between align-items-center w-100">
                            <div className="">
                              <h6
                                style={{
                                  fontWeight: "bold",
                                  marginBottom: "5px",
                                  fontSize: "1.25rem",
                                  color: isActive ? "#000" : "#757575",
                                }}
                              >
                                {step.label}
                              </h6>
                              <p style={{ color: "#757575", fontSize: "1rem" }}>
                                {step.description}
                              </p>
                            </div>
                            <p style={{ color: "#757575", fontSize: "1rem" }}>
                              {step.date} {step.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="track-right">
              <div className="top-track-right">
                <h5 className="fw-bold">Delivery Address</h5>
                <div className="order-date d-flex gap-1 mb-3">
                  <img
                    className="img-fluid me-1 rounded-4 align-self-start"
                    src={addressHome}
                    alt="pencil"
                  />
                  <div className="ms-md-3">
                    <div className="d-flex mt-2 gap-1 align-items-center">
                      <p className="fw-600">shivani | 9990323287</p>
                    </div>
                    <p className="mt-1 pt-1 text-wrap d-none d-md-block">
                      136/b,Ratiya, SOUTH DELHI - 110080, near cribs hospital,
                      ratiya marg, delhi, New Delhi
                    </p>
                  </div>
                </div>
              </div>
              <div className="bottom-track-right mt-4">
                <h5 className="fw-bold">Items in Order</h5>
                <div className="row px-2 px-md-3 pt-3 py-md-3 mb-3">
                  <div className="col-md-8">
                    <div className="prod-detail d-flex align-items-center">
                      <img
                        className="img-fluid me-4 rounded-4"
                        src={productImage}
                        alt="pencil"
                        style={{ height: "6rem", width: "6rem" }}
                      />
                      <div>
                        <p className="fb-fs-18 fw-600 text-dark-grey">
                          Jowar Muruku
                        </p>
                        <p className="mt-1">
                          Qty:<span className="fw-600">1</span>
                        </p>
                        <p className="mt-1">
                          Size:<span className="fw-600">250gm</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="price-sec text-end text-dark-grey">
                      <p className="fb-fs-24 fw-bold">₹140</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrackOrder;