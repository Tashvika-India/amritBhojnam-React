import * as Yup from "yup";
import React, { useState } from "react";
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

const TrackOrder = () => {
  const [value, setValue] = useState(2);

  const steps = [
    {
      label: "Order Placed",
      description: "We have received your order",
      icon: <CheckCircleIcon style={{ color: "#D59615", fontSize: "2rem" }} />,
      image:
        "data:image/png;base64,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", // Replace with actual image URLs
    },
    {
      label: "Order Packed",
      description: "Your product packed and ready to ship",
      icon: <CheckCircleIcon style={{ color: "#D59615", fontSize: "2rem" }} />,
      image:
        "data:image/png;base64,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",
    },
    {
      label: "Out Of Delivery",
      description: "Your product is out for delivery",
      icon: <CheckCircleIcon style={{ color: "#DADADA", fontSize: "2rem" }} />,
      image:
        "data:image/png;base64,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",
    },
    {
      label: "Product Delivered",
      description: "Delivery Expected - 20 Jan, 2025",
      icon: <CheckCircleIcon style={{ color: "#DADADA", fontSize: "2rem" }} />,
      image:
        "data:image/png;base64,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",
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
              <div className="center-track-left mt-4 mb-5">
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
                              height: "80px",
                              border: "1px dashed #D59615",
                              paddingBottom: "18px",
                              paddingTop: "10px",
                            }}
                          />
                        )}
                      </Box>

                      {/* Content */}
                      <Box sx={{ display: "flex", alignItems: "center",  paddingBottom: index === steps.length - 1 ? "0" : "55px",}}>
                        {/* Step Image */}
                        <img
                          src={step.image}
                          alt={step.label}
                          style={{
                            width: "60px",
                            height: "60px",
                            marginRight: "10px",
                          }}
                        />
                        {/* Step Details */}
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", marginBottom: "5px", fontSize: "24px" }}
                          >
                            {step.label}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#757575", fontSize: "22px" }}>
                            {step.description}
                          </Typography>
                        </Box>
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
