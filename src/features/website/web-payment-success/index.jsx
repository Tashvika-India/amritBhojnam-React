import React, { useEffect } from "react";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import { MdKeyboardArrowLeft } from "react-icons/md";
import successImg from "../../../assets/images/web/success-payment-img.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => { 
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => { 
    const timer = setTimeout(() => {
      navigate("/profile?tab=orders");
    }, 5000);  
    return () => clearTimeout(timer);
  }, [navigate]);

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
            <p className="fb-fs-50 fw-bold text-orange pt-lg-4">
              Order Successfully Placed
            </p>
            <h5 className="fb-fs-22 text-dark-grey py-4 fw-400">
              Your order has been successfully placed! You will receive a
              confirmation shortly with <br></br> the order details. Thank you for
              choosing us.
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
                to="/profile?tab=orders"
              >
                View&nbsp;Detail
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
