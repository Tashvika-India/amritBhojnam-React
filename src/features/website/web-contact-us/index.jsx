import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import { Call, DirectboxNotif, LocationMinus } from "iconsax-react";
import { TextField } from "@mui/material";
import { postContactApi } from "../../../services/adminApiRoutes";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [usercontact, setUserContact] = useState({});

  const contact = useFormik({
    initialValues: {
      full_name: "",
      phone_number: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      full_name: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone_number: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
        .required("Phone Number is required"),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      addContactUs(values);
    },
  });

  const addContactUs = async (values) => {
    const formData = new FormData();
    formData.append("name ", values.full_name);
    formData.append("email", values.email);
    formData.append("phone", values.phone_number);
    formData.append("message", values.message);
    try {
      const response = await postContactApi(formData); 
      contact.resetForm();
    } catch (error) {
      console.log("Error submitting the form:", error);
      // alert("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  }

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
                        Let us know <br />
                        <span className="fw-600">how we can help you</span>
                      </p>
                      <p className="text-white pt-3">
                        Need help with our millet-based products or have
                        questions? We’re here for you! Contact us to learn more
                        or share your thoughts.
                      </p>
                      <div className="contact-list my-4 pb-2 pt-4">
                        <p className="text-dark-brown fw-600">PHONE NO.</p>
                        <div className="d-flex pt-2">
                          <Call size={"2rem"} color="#FFF" variant="Bulk" />
                          <a href="tel:+91-7678320459">
                            <p className="fb-fs-18 text-white fw-600 ps-3">
                              +91 7678320459
                            </p>
                          </a>
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
                          <a href="mailto:info@amritbhojanam.com">
                            <p className="fb-fs-18 text-white fw-600 ps-3">
                              info@amritbhojanam.com
                            </p>
                          </a>
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
                            Plot No. 34, 3rd Floor, Sector – 3, Karuna Kunj,
                            Dwarka, New Delhi, 110078.
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

                      <form onSubmit={contact.handleSubmit}>
                        <div className="container fb-container pt-4">
                          <div className="row">
                            <div className="col-md-6 ps-md-0">
                              <TextField
                                fullWidth
                                className="rounded-20 me-5 mt-4"
                                id="full_name"
                                label="Name"
                                name="full_name"
                                variant="outlined"
                                value={contact.values.full_name}
                                onChange={contact.handleChange}
                                onBlur={contact.handleBlur}
                                error={
                                  contact.touched.full_name &&
                                  Boolean(contact.errors.full_name)
                                }
                                helperText={
                                  contact.touched.full_name &&
                                  contact.errors.full_name
                                }
                              />
                            </div>
                            <div className="col-md-6 pe-md-0">
                              <TextField
                                fullWidth
                                className="rounded-20 me-5 mt-4"
                                id="phone_number"
                                label="Phone Number"
                                name="phone_number"
                                variant="outlined"
                                value={contact.values.phone_number}
                                onChange={contact.handleChange}
                                onBlur={contact.handleBlur}
                                error={
                                  contact.touched.phone_number &&
                                  Boolean(contact.errors.phone_number)
                                }
                                helperText={
                                  contact.touched.phone_number &&
                                  contact.errors.phone_number
                                }
                              />
                            </div>
                            <div className="col-md-12 px-md-0 mb-2">
                              <TextField
                                fullWidth
                                className="rounded-20 me-5 mt-4"
                                id="email"
                                label="Email Address"
                                name="email"
                                variant="outlined"
                                value={contact.values.email}
                                onChange={contact.handleChange}
                                onBlur={contact.handleBlur}
                                error={
                                  contact.touched.email &&
                                  Boolean(contact.errors.email)
                                }
                                helperText={
                                  contact.touched.email && contact.errors.email
                                }
                              />
                            </div>
                            <div className="col-md-12 px-md-0 mb-2">
                              <TextField
                                fullWidth
                                multiline
                                className="rounded-20 me-5 mt-4 w-100"
                                id="message"
                                label="Message"
                                name="message"
                                minRows={4}
                                variant="outlined"
                                value={contact.values.message}
                                onChange={contact.handleChange}
                                onBlur={contact.handleBlur}
                                error={
                                  contact.touched.message &&
                                  Boolean(contact.errors.message)
                                }
                                helperText={
                                  contact.touched.message &&
                                  contact.errors.message
                                }
                              />
                            </div>
                            <div className="col-md-12 px-md-0 mb-2">
                              <button
                                type="submit"
                                className="button-primary mt-3"
                                style={{ width: "30%" }}
                                disabled={loading}
                              >
                                {loading ? "Submitting..." : "Submit"}
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
        <Footer />
      </section>
    </div>
  );
};

export default ContactUs;
