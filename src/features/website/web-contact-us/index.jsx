import React from "react";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import { TabPanel, TabView } from "primereact/tabview";
import { TextField } from "@mui/material";
import pencilImg from "../../../assets/images/web/account/pencil.png";
import accountBg from "../../../assets/images/web/account/account-profile-background.png";
import profilePic from "../../../assets/images/web/account/profile-picture.png";
import milletImg from "../../../assets/images/web/account/millet-product.png";
import tickImg from "../../../assets/images/web/account/tick-image.png";
import homeImg from "../../../assets/images/web/account/home-img.png";
import editButton from "../../../assets/images/web/account/edit-button.png";
import deleteButton from "../../../assets/images/web/account/delete-button.png";

const ContactUs = () => {
  return (
    <div className="web-wrapper-main">
      <Header />
      <div className="container fb-container mb-5 pb-5">
        <div className="row">
          <div className="col-md-10 mx-auto">
            <div className="user-profile-img">
              <img
                className="img-fluid profile-img profile-foreground-img rounded-top w-100 mt-5"
                src={accountBg}
                alt="pencil"
                style={{ height: "200px" }}
              />
            </div>
            <div className="p-4 pt-0">
              <div
                className="position-relative text-start pb-3"
                style={{ marginTop: "-5rem" }}
              >
                <div className="text-center rounded-circle  position-relative d-flex flex-wrap">
                  <img
                    className="img-profile avatar-xl rounded-circle img-fluid justify-content-md-center"
                    src={profilePic}
                    alt="Card image cap"
                  />
                  <div className="image-content mt-5 pt-5 ms-3">
                    <p className="fb-fs-30 fw-bold">Piyush Kanwal</p>
                    <p className="fw-500 text-mid-grey fb-fs-18 text-start">
                      +91 1234567890
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <TabView className="custom-tabview">
              <TabPanel header="My Account" leftIcon="pi pi-user me-2">
                <div className="account-section mb-4">
                  <div className="d-flex justify-content-between mt-4">
                    <p className="fb-fs-26 fw-bold">My Account</p>
                    <div className="d-flex">
                      <img
                        className="img-fluid"
                        src={pencilImg}
                        alt="pencil"
                        style={{
                          width: "2rem",
                          aspectRatio: "16/14",
                          objectFit: "scale-down",
                        }}
                      />
                      <p className="fw-500 mt-2">Edit</p>
                    </div>
                  </div>
                  <form>
                    <div className="container fb-container">
                      <div className="row">
                        <div className="col-md-6">
                          <TextField
                            fullWidth
                            className="rounded-20 me-5 mt-4"
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                          />
                        </div>
                        <div className="col-md-6">
                          <TextField
                            fullWidth
                            className="rounded-20 me-5 mt-4"
                            id="outlined-basic"
                            label="Email Address"
                            variant="outlined"
                          />
                        </div>
                        <div className="col-md-6">
                          <TextField
                            fullWidth
                            className="rounded-20 me-5 mt-4"
                            id="outlined-basic"
                            label="Phone Number"
                            variant="outlined"
                          />
                        </div>
                        <div className="col-md-6">
                          <TextField
                            fullWidth
                            className="rounded-20 me-5 mt-4"
                            id="outlined-basic"
                            label="Alternate Phone Number"
                            variant="outlined"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </TabPanel>
              <TabPanel header="Order History" leftIcon="pi pi-box me-2">
                <div className="order-section">
                  <p className="fb-fs-26 fw-bold my-4">Order History</p>
                  <div className="summary-card rounded-20 ">
                    <div className="container">
                      <div className="row border-bottom px-3 py-3">
                        <div className="col-md-3">
                          <p>
                            {" "}
                            Order ID:{" "}
                            <span className="fw-600"> #123456789</span>
                          </p>
                        </div>
                        <div className="col-md-3">
                          <p>
                            {" "}
                            Order Placed:{" "}
                            <span className="fw-600"> March 10, 2024</span>
                          </p>
                        </div>
                        <div className="col-md-3">
                          <p>
                            {" "}
                            Total Amount:{" "}
                            <span className="fw-600"> ₹ 130 </span>
                          </p>
                        </div>
                        <div className="col-md-3 text-end">
                          <p className="text-orange fw-500">
                            {" "}
                            Download Invoice{" "}
                          </p>
                        </div>
                      </div>
                      <div className="row px-3 py-4">
                        <div className="col-md-8">
                          <div className="prod-detail d-flex">
                            <img
                              className="img-fluid me-4"
                              src={milletImg}
                              alt="pencil"
                            />
                            <div>
                              <p className="fb-fs-18 fw-600 text-dark-grey">
                                Masala Millets (Veggie Masala)
                              </p>
                              <p className="mt-2">
                                Qty: <span className="fw-600"> 2</span>
                              </p>
                              <p className="mt-2">
                                Size: <span className="fw-600"> 100gm</span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="price-sec text-end text-dark-grey">
                            <p className="fb-fs-24 fw-bold">₹80</p>
                          </div>
                        </div>
                      </div>
                      <div className="row p-3">
                        <div className="col-md-6">
                          <div className="order-date d-flex">
                            <img
                              className="img-fluid me-2"
                              src={tickImg}
                              alt="pencil"
                            />
                            <p className="text-dark-grey">
                              Delivered on March 26, 2024
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6 text-md-end">
                          <div className="more-option d-flex justify-content-end">
                            <button className="fw-bold border-0 text-dark-grey bg-transparent border-end pe-4">
                              View Product
                            </button>
                            <button className="fw-bold border-0 text-orange bg-transparent ms-3">
                              Buy Again
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-section">
                  <div className="summary-card rounded-20 mt-5">
                    <div className="container">
                      <div className="row border-bottom px-3 py-3">
                        <div className="col-md-3">
                          <p>
                            {" "}
                            Order ID:{" "}
                            <span className="fw-600"> #123456789</span>
                          </p>
                        </div>
                        <div className="col-md-3">
                          <p>
                            {" "}
                            Order Placed:{" "}
                            <span className="fw-600"> March 10, 2024</span>
                          </p>
                        </div>
                        <div className="col-md-3">
                          <p>
                            {" "}
                            Total Amount:{" "}
                            <span className="fw-600"> ₹ 130 </span>
                          </p>
                        </div>
                        <div className="col-md-3 text-end">
                          <p className="text-orange fw-500">
                            {" "}
                            Download Invoice{" "}
                          </p>
                        </div>
                      </div>
                      <div className="row px-3 py-4">
                        <div className="col-md-8">
                          <div className="prod-detail d-flex">
                            <img
                              className="img-fluid me-4"
                              src={milletImg}
                              alt="pencil"
                            />
                            <div>
                              <p className="fb-fs-18 fw-600 text-dark-grey">
                                Masala Millets (Veggie Masala)
                              </p>
                              <p className="mt-2">
                                Qty: <span className="fw-600"> 2</span>
                              </p>
                              <p className="mt-2">
                                Size: <span className="fw-600"> 100gm</span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="price-sec text-end text-dark-grey">
                            <p className="fb-fs-24 fw-bold">₹80</p>
                          </div>
                        </div>
                      </div>
                      <div className="row p-3">
                        <div className="col-md-6">
                          <div className="order-date d-flex">
                            <img
                              className="img-fluid me-2"
                              src={tickImg}
                              alt="pencil"
                            />
                            <p className="text-dark-grey">
                              Delivered on March 26, 2024
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6 text-md-end">
                          <div className="more-option d-flex justify-content-end">
                            <button className="fw-bold border-0 text-dark-grey bg-transparent border-end pe-4">
                              View Product
                            </button>
                            <button className="fw-bold border-0 text-orange bg-transparent ms-3">
                              Buy Again
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel header="Address Book" leftIcon="pi pi-map-marker me-2">
                <div className="address-section">
                  <div className="d-flex justify-content-between">
                    <p className="fb-fs-26 fw-bold text-dark-grey my-4">
                      Saved Address
                    </p>
                    <div className="d-flex mt-4 pt-2">
                      <i className="pi pi-plus text-yellow me-2 mt-1"></i>
                      <p className="fw-500">Add New Address</p>
                    </div>
                  </div>
                  <div className="summary-card rounded-20 p-3">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="order-date d-lg-flex">
                            <img
                              className="img-fluid me-2"
                              src={homeImg}
                              alt="pencil"
                            />
                            <div className="ms-lg-3">
                              <div className="d-lg-flex mt-2">
                                <p className="fw-600 fb-fs-lg-18 fb-fs-md-16">
                                  Piyush Kanwal | 7464810000
                                </p>
                                <button class="button-yellow ms-lg-3">
                                  Default
                                </button>
                              </div>

                              <p className="mt-2">
                                House no. 78, Ward no. 7, Vats Colony, Linepar,
                                Bahadurgarh, Haryana - 124507
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                      <div className="col-lg-1 col-0"></div>
                      <div className="col-lg-11 col-12 mt-3">
                          <div className="d-flex">
                            <button className="border-0 bg-transparent">
                              <img
                                className="img-fluid me-3"
                                src={editButton}
                                alt="pencil"
                              />
                            </button>
                            <button className="border-0 bg-transparent">
                              <img
                                className="img-fluid me-2"
                                src={deleteButton}
                                alt="pencil"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="summary-card rounded-20 p-3 mt-4">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-9">
                          <div className="order-date d-lg-flex">
                            <img
                              className="img-fluid me-2"
                              src={homeImg}
                              alt="pencil"
                            />
                            <div className="ms-lg-3">
                              <p className="fw-600 fb-fs-lg-18 fb-fs-md-16 mt-1">
                                Piyush Kanwal | 7464810000
                              </p>

                              <p className="mt-2">
                                House no. 78, Ward no. 7, Vats Colony, Linepar,
                                Bahadurgarh, Haryana - 124507
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-4 text-lg-end text-md-start">
                          <button className="button-set-default">
                            Set as Default
                          </button>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-1 col-0"></div>
                        <div className="col-lg-11 col-12 mt-3">
                          <div className="d-flex">
                            <button className="border-0 bg-transparent">
                              <img
                                className="img-fluid me-3"
                                src={editButton}
                                alt="pencil"
                              />
                            </button>
                            <button className="border-0 bg-transparent">
                              <img
                                className="img-fluid me-2"
                                src={deleteButton}
                                alt="pencil"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </TabView>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default ContactUs;
