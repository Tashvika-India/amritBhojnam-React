import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import { Call, DirectboxNotif, LocationMinus } from "iconsax-react";
import { TextField } from "@mui/material";
import { MdKeyboardArrowLeft } from "react-icons/md";
import successImg from "../../../assets/images/web/success-payment-img.png";
import { postContactApi } from "../../../services/adminApiRoutes";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="web-wrapper-main">
      <Header />
      <section className="payment-success bg-footer-bg pb-0">
        <div className="container fb-container mb-5">
          <div className="row">
            <div className="text-center">
              <img
                src={successImg}
                className="img-fluid mx-auto"
                alt="logo"
                loading="lazy"
              />
              <p className="fb-fs-50 fw-bold text-orange pt-4">
                Order Successfully Placed
              </p>
              <h5 className="fb-fs-22 text-dark-grey py-4 fw-400">
                Your order has been successfully placed! You will receive a
                confirmation shortly with <br></br> the order details. Thank you for
                choosing us.
              </h5>
              <div className="d-flex gap-4 my-5 justify-content-center">
                <Link className="back-home d-flex gap-2" to="/">
                  <MdKeyboardArrowLeft
                    style={{ color: "#F26722", fontSize: "1.6rem" }}
                  />
                  Back to home
                </Link>
                <Link
                  className="button-primary pt-3"
                  to="/profile?tab=orders" style={{padding: "0 3rem"}}
                >
                  View Detail
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
};

export default PaymentSuccess;
