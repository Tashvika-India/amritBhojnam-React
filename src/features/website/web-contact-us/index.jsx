import React from "react";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import { Call, DirectboxNotif, LocationMinus } from "iconsax-react";
import { TextareaAutosize, TextField } from "@mui/material";

const ContactUs = () => {
  return (
    <div className="web-wrapper-main">
      <Header />
      <section className="contact-us pb-0">
        <div className="container fb-container mb-5">
          <div className="row">
            <div className="card p-0 rounded-40 contact-box-shadow">
              <div className="card-body p-0 ">
                <div className="row">
                  <div className="col-md-6 col-lg-5">
                    <div className="orange-section bg-orange">
                      <p
                        className="fb-fs-40 text-white fw-300"
                        style={{ lineHeight: "3rem" }}
                      >
                        Let us know <br></br>
                        <span className="fw-600">how we can help you</span>
                      </p>
                      <p className="text-white pt-3">
                      Need help with our millet-based products or have questions? We’re here for you! Contact us to learn more or share your thoughts.
                      </p>
                      <div className="contact-list my-4 pb-2 pt-4">
                        <p className="text-dark-brown fw-600">PHONE NO.</p>
                        <div className="d-flex pt-2">
                          <Call size={"2rem"} color="#FFF" variant="Bulk" />
                          <p className="fb-fs-18 text-white fw-600 ps-3">
                          +91 7678320459
                          </p>
                        </div>
                      </div>
                      <div className="contact-list my-4 pb-2">
                        <p className="text-dark-brown fw-600">EMAIL ADDRESS.</p>
                        <div className="d-flex pt-2">
                          <DirectboxNotif
                            size={"2rem"}
                            color="#FFF"
                            variant="Bulk"
                          />
                          <p className="fb-fs-18 text-white fw-600 ps-3">
                          info@amritbhojanam.com
                          </p>
                        </div>
                      </div>
                      <div className="contact-list my-4 pb-5">
                        <p className="text-dark-brown fw-600">ADDRESS.</p>
                        <div className="d-flex pt-2">
                          <LocationMinus
                            size={"2.8rem"}
                            color="#FFF"
                            variant="Bulk"
                          />
                          <p className="fb-fs-18 text-white fw-600 ps-3">
                          Plot No. 34, 3rd Floor, Sector – 3, Karuna Kunj, Dwarka, New Delhi, 110078.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-7">
                    <div className="white-section">
                      <h5 className="fw-300 text-black mb-0">Contact Form</h5>
                      <p
                        className="fb-fs-40 fw-600"
                        style={{ lineHeight: "3rem" }}
                      >
                        Drop Us a Line
                      </p>
                      <p className="text-mid-grey pt-3">
                        Your email address will not be published. Required
                        fields are marked *
                      </p>

                      <form>
                        <div className="container fb-container pt-4">
                          <div className="row">
                            <div className="col-md-6 ps-md-0">
                              <TextField
                                fullWidth
                                className="rounded-20 me-5 mt-4"
                                id="outlined-basic"
                                label="Name"
                                variant="outlined"
                              />
                            </div>
                            <div className="col-md-6 pe-md-0">
                              <TextField
                                fullWidth
                                className="rounded-20 me-5 mt-4"
                                id="outlined-basic"
                                label="Phone Number"
                                variant="outlined"
                              />
                            </div>
                            <div className="col-md-12 px-md-0 mb-2">
                              <TextField
                                fullWidth
                                className="rounded-20 me-5 mt-4"
                                id="outlined-basic"
                                label="Email Address"
                                variant="outlined"
                              />
                            </div>
                            <div className="col-md-12 px-md-0 mb-2">
                              <TextField
                                fullWidth
                                multiline
                                className="rounded-20 me-5 mt-4 w-100"
                                id="outlined-basic"
                                label="Message"
                                minRows={4}
                                maxRows={20}
                                variant="outlined"
                              />
                            </div>
                            <div className="col-md-12 px-md-0 mb-2">
                              <button
                                className="button-primary mt-3"
                                style={{ width: "30%" }}
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid p-0">
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28022.12022655864!2d77.01072461824441!3d28.60682509187019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1ad34eb74975%3A0xfcf9092de6f26d2f!2sKaruna%20Kunj%2C%20Dwarka%20Sector-3%2C%20Dwarka%2C%20Delhi%2C%20110078!5e0!3m2!1sen!2sin!4v1732620709544!5m2!1sen!2sin"
              style={{ border: "0", height: "30rem" }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              className="w-100"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default ContactUs;
