import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import { Call, DirectboxNotif, LocationMinus } from "iconsax-react";
import { TextField } from "@mui/material";
import { postContactApi } from "../../../services/adminApiRoutes";
import { notifyError, notifySuccess } from "../../../components/ui/Notification";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [usercontact, setUserContact] = useState({});

  const contact = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string()
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
    formData.append("name ", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("message", values.message);
    try {
      const response = await postContactApi(formData); 
      notifySuccess("Contact submitted Successfully"); 
      contact.resetForm();
    } catch (error) {
      console.log("Error submitting the form:", error);
      notifyError("Failed to add submitted Contact!"); 
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
                                id="name"
                                label="Name"
                                name="name"
                                variant="outlined"
                                value={contact.values.name}
                                onChange={contact.handleChange}
                                onBlur={contact.handleBlur}
                                error={
                                  contact.touched.name &&
                                  Boolean(contact.errors.name)
                                }
                                helperText={
                                  contact.touched.name &&
                                  contact.errors.name
                                }
                              />
                            </div>
                            <div className="col-md-6 pe-md-0">
                              <TextField
                                fullWidth
                                className="rounded-20 me-5 mt-4"
                                id="phone"
                                label="Phone Number"
                                name="phone"
                                variant="outlined"
                                value={contact.values.phone}
                                onChange={contact.handleChange}
                                onBlur={contact.handleBlur}
                                error={
                                  contact.touched.phone &&
                                  Boolean(contact.errors.phone)
                                }
                                helperText={
                                  contact.touched.phone &&
                                  contact.errors.phone
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
        <div className="container-fluid p-0">
        <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.7730399115353!2d77.0507695!3d28.6065848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1ad4a7c61103%3A0x9382383d0e00ff22!2s3rd%20Floor%2C%203%2F90%2C%20Karuna%20Kunj%2C%20Dwarka%20Sector-3%2C%20Dwarka%2C%20New%20Delhi%2C%20Delhi%2C%20110078!5e0!3m2!1sen!2sin!4v1734084071604!5m2!1sen!2sin"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      ></iframe>
    </div>
        </div>
        <Footer />
      </section>
    </div>
  );
};

export default ContactUs;
