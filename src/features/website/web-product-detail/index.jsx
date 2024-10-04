import React from "react";
import { useState } from "react";
import { Rating } from "primereact/rating";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import productDetail from "../../../assets/images/web/product-detail/product-detail-image.png";
import fireImg from "../../../assets/images/web/Fire.png";


const ProudctDetail = () => {
  const [value, setValue] = useState(3.5);
  return (
    <div className="web-wrapper-main">
      <Header />
      <section className="product-detail-page">
        <div className="container fb-container">
          <div className="row">
            <div className="col-md-5">
              <div className="product-detail-image bg-background pt-3">
                <img
                  className="img-fluid pt-5 ps-5"
                  src={productDetail}
                  alt="banner-ads"
                />
              </div>
            </div>
            <div className="col-md-7 ps-5">
              <div className="product-detail-content">
                <p className="fb-fs-18 fw-600 d-flex text-brown">
                  <span>
                    <img className="img-fluid" src={fireImg} alt="fire" />
                  </span>{" "}
                  80 Calories
                </p>
                <h4 className="fb-fs-30 fw-bold">
                  Masala Millet (Veggie Masala)
                </h4>
                <div className="d-flex">
                  <Rating
                    className="me-3"
                    value={value}
                    onChange={(e) => setValue(e.value)}
                    cancel={false}
                  />
                  <p className="text-mid-grey">(12 reviews)</p>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever s
                </p>
                <p className="fw-600 d-flex">Size / Weight:</p>
              </div>
            </div>
          </div>
          <div className="row">
          <div className="tab-section" style={{border: "1px solid #E1E1E1"}}>
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="pills-home-tab"
                  data-toggle="pill"
                  href="#pills-home"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Description
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="pills-profile-tab"
                  data-toggle="pill"
                  href="#pills-profile"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  Additional Info
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="pills-contact-tab"
                  data-toggle="pill"
                  href="#pills-contact"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  Reviews(12)
                </a>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                ...
              </div>
              <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                ...
              </div>
              <div
                className="tab-pane fade"
                id="pills-contact"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
              >
                ...
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProudctDetail;
