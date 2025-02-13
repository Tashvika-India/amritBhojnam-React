import React from "react";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import profileBg from "../../../assets/images/web/account/profile-bg.png";
import trophyImg from "../../../assets/images/web/trophy-img.png";

const CoinPage = () => {
  return (
    <>
      <div className="web-wrapper-main">
        <Header />
        {/* <div className="pt-5">
          <div className="container fb-container">
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" to="/">
                Home
              </Link>
              <Typography className="text-orange"> Privacy Policy</Typography>
            </Breadcrumbs>
          </div>
        </div> */}
      
        <section className="coin-page">
          <div className="container fb-container">
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <div className="user-profile-img  mt-lg-5 mt-md-5 mt-4">
                  <img
                    className="img-fluid profile-img profile-foreground-img rounded-top w-100 mt-5"
                    src={profileBg}
                    alt="pencil"
                    style={{ height: "200px" }}
                  />
                </div>
                <div className="coin-stepper-section mt-lg-5">
                  <div className="coin-step-part d-flex justify-content-between pb-lg-5"> 
                      <div className="ps-lg-5 ps-md-5 ps-4 ms-5 mt-4 pb-5">
                        <p className="fw-600 text-dark-grey mb-2">22 Nov 2024</p>
                        <p className="fb-fs-24 fw-600">
                          <span className="text-orange fw-bolder">35</span> Amrit Coins
                          earned
                        </p>
                        <p className="text-dark-grey">Amrit Coins Collected</p>
                        <p className="fb-fs-22 fw-500 mt-lg-4 mt-md-4 mt-2">
                          Jowar Jeggery Choco Chip Cookies
                        </p>
                      </div>
                    <div>
                      <img className="img-fluid mt-5 pt-lg-5 pt-4" src={trophyImg} alt="pencil" />
                    </div>
                  </div>
                  <div className="coin-step-part d-flex justify-content-between pb-lg-5"> 
                      <div className="ps-lg-5 ps-md-5 ps-4 ms-5 mt-4 pb-5">
                        <p className="fw-600 text-dark-grey mb-2">22 Nov 2024</p>
                        <p className="fb-fs-24 fw-600">
                          <span className="text-orange fw-bolder">35</span> Amrit Coins
                          earned
                        </p>
                        <p className="text-dark-grey">Amrit Coins Collected</p>
                        <p className="fb-fs-22 fw-500 mt-lg-4 mt-md-4 mt-2">
                          Jowar Jeggery Choco Chip Cookies
                        </p>
                      </div>
                    <div>
                      <img className="img-fluid mt-5 pt-lg-5 pt-4" src={trophyImg} alt="pencil" />
                    </div>
                  </div>
                  <div className="coin-step-part d-flex justify-content-between pb-lg-5"> 
                      <div className="ps-lg-5 ps-md-5 ps-4 ms-5 mt-4 pb-5">
                        <p className="fw-600 text-dark-grey mb-2">22 Nov 2024</p>
                        <p className="fb-fs-24 fw-600">
                          <span className="text-orange fw-bolder">35</span> Amrit Coins
                          earned
                        </p>
                        <p className="text-dark-grey">Amrit Coins Collected</p>
                        <p className="fb-fs-22 fw-500 mt-lg-4 mt-md-4 mt-2">
                          Jowar Jeggery Choco Chip Cookies
                        </p>
                      </div>
                    <div >
                      <img className="img-fluid mt-5 pt-lg-5 pt-4" src={trophyImg} alt="pencil" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default CoinPage;
