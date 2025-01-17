import React, { useEffect } from "react";  
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer"; 
import { MdKeyboardArrowLeft } from "react-icons/md";
import failImg from "../../../assets/images/web/fail-payment-img.png"; 
import { Link, useLocation } from "react-router-dom";

const PaymentFailed = () => {

  useEffect(() => {
      window.scrollTo(0, 0);
    }, [useLocation()]);
  return (
    <div className="web-wrapper-main">
      <Header />
      <section className="payment-success bg-footer-bg pb-0">
        <div className="container fb-container mb-5">
          <div className="row">
            <div className="text-center">
              <img
                src={failImg}
                className="img-fluid mx-auto"
                alt="logo"
                loading="lazy"
              />
              <p className="fb-fs-50 fw-bold  pt-lg-4" style={{ color: "#FF4E4E" }}>
                Payment Failed
              </p>
              <h5 className="fb-fs-22 text-dark-grey py-4 fw-400">
              Unfortunately, your payment could not be processed. Please try again or use a different payment method. <br></br> 
              If the issue persists, contact our support team.
              </h5>
              <div className="d-flex gap-lg-4 gap-3 my-lg-5 my-md-4 my-sm-4 justify-content-center">
                <Link className="back-home d-flex gap-2" to="/">
                  <MdKeyboardArrowLeft
                    style={{ color: "#F26722", fontSize: "1.6rem" }}
                  />
                  Back&nbsp;to&nbsp;home
                </Link>
                <Link
                  className="success-primary-button lh-lg"
                  to="/checkout"
                >
                  Retry&nbsp;Payment
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

export default PaymentFailed;
