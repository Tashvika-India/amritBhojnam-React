import * as Yup from "yup";
import React, { useEffect, useRef, useState } from "react";
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
import Stack from "@mui/material/Stack";

const TrackOrder = () => {
  const [value, setValue] = React.useState(2);

  const steps = [
    {
      label: "Order Placed",
      description: "We have received your order",
      icon: <CheckCircleIcon style={{ color: "#D59615", fontSize: "2rem" }} />,
    image: 'https://ibb.co/23nX5Gm8',
    },
    {
      label: "Order Packed",
      description: "Your product packed and ready to ship",
      icon: <CheckCircleIcon style={{ color: "#D59615", fontSize: "2rem" }} />,
    },
    {
      label: "Out Of Delivery",
      description: "Your product is out for delivery",
      icon: <CheckCircleIcon style={{ color: "#DADADA", fontSize: "2rem" }} />,
    },
    {
      label: "Product Delivered",
      description: "Delivery Expected - 20 Jan, 2025",
      icon: <CheckCircleIcon style={{ color: "#DADADA", fontSize: "2rem" }} />,
    },
  ];

  return (
    <div className="web-wrapper-main">
      <Header />
      <div className="container fb-container mt-5">
        <div className="row">
          <p className="fb-fs-40 fw-bold">Track Order</p>
          <p className="fb-fs-26 fw-500 my-4">
            Order ID: <span className="text-yellow fw-600"> #123456789</span>
          </p>
          <div className="col-md-7">
            <div className="track-left">
              <div className="top-track-left d-flex justify-content-between align-items-center">
                <p>
                  Order Placed:
                  <span class="fw-600">&nbsp;&nbsp;March 10, 2024</span>
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
              <div className="center-track-left">
                <Box
                  sx={{
                    maxWidth: 500,
                    margin: "auto",
                    backgroundColor: "#fff8e1",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  {steps.map((step, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        // marginBottom: "20px",
                      }}
                    >
                      {/* Icon and line connector */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          marginRight: "20px",
                        }}
                      >
                        {step.icon}
                        {index < steps.length - 1 && (
                          <Box
                            sx={{
                              width: "2px",
                              height: "60px",
                              border: "1px dashed #D59615",
                              marginTop: "15px",
                              paddingBottom: "18px",
                            }}
                          />
                        )}
                      </Box>
                      
                      {/* Content */}
                      <Box>
                     
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", marginBottom: "5px" }}
                        >
                          {step.label}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#757575" }}>
                          {step.description}
                        </Typography>
                        {step.date && (
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#9e9e9e",
                              fontSize: "0.9rem",
                              marginTop: "5px",
                            }}
                          >
                            {step.date}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </div>
              <div className="bottom-track-left d-flex justify-content-between align-items-center">
                <Box sx={{ "& > legend": { mt: 2 } }}>
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </Box>
                <div>
                  <a href="" className="d-flex gap-3">
                    {" "}
                    <IoReceiptOutline color="#D59615" size={27} />
                    <p className="fb-fs-18 fw-bold">Raise Complaint</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="track-right">
              <div className="top-track-right">
                <h5 className="fw-bold">Delivery Address</h5>
                <div class="order-date d-flex gap-1 mb-3">
                  <img
                    className="img-fluid me-1 rounded-4 align-self-start"
                    src={addressHome}
                    alt="pencil"
                  />
                  <div class="ms-md-3">
                    <div class="d-flex mt-2 gap-1 align-items-center">
                      <p class="fw-600">shivani | 9990323287</p>
                    </div>
                    <p class="mt-1 pt-1 text-wrap d-none d-md-block">
                      136/b,Ratiya, SOUTH DELHI - 110080, near cribs hospital,
                      ratiya marg, delhi, New Delhi
                    </p>
                  </div>
                </div>
              </div>
              <div className="bottom-track-right mt-4">
                <h5 className="fw-bold">Items in Order</h5>
                <div class="row px-2 px-md-3 pt-3 py-md-3 mb-3">
                  <div class="col-md-8">
                    <div class="prod-detail d-flex align-items-center">
                      <img
                        class="img-fluid me-4 rounded-4"
                        src={productImage}
                        alt="pencil"
                        style={{ height: "6rem", width: "6rem" }}
                      />
                      <div>
                        <p class="fb-fs-18 fw-600 text-dark-grey">
                          Jowar Muruku
                        </p>
                        <p class="mt-1">
                          Qty:<span class="fw-600">1</span>
                        </p>
                        <p class="mt-1">
                          Size:<span class="fw-600">250gm</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="price-sec text-end text-dark-grey">
                      <p class="fb-fs-24 fw-bold">₹140</p>
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
