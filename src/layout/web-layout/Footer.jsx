import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import logo from "../../assets/images/web/logo.svg";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import call from "../../assets/images/web/call.svg";
import clock from "../../assets/images/web/clock.svg";
import mail from "../../assets/images/web/mail.svg";
import {
  getPopularProducts,
  postContactApi,
} from "../../services/adminApiRoutes";
import MyCartMenu from "../../components/ui/MyCartMenu";
import { useFormik } from "formik";
import { notifyError, notifySuccess } from "../../components/ui/Notification";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';

const Footer = () => {
  const [showCart, setShowCart] = useState(false);
  const [popularProduct, setPopularProduct] = useState([]);
  const currentYear = new Date().getFullYear();
  const toggleCart = () => setShowCart(!showCart);
  async function getPopularProduct() {
    try {
      const response = await getPopularProducts();
      setPopularProduct(response?.data?.results);
    } catch (error) {
      throw error;
    }
  }

  const contact = useFormik({
    initialValues: {
      name: "subscribe",
      phone: "0000000000",
      email: "",
      message: "subscribe",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    validateOnBlur: true, // Validate when the field loses focus
    validateOnChange: true, // Validate as the user types
    onSubmit: async (values, { resetForm }) => {
      await Subscribe(values, resetForm);
    },
  });

  const Subscribe = async (values, resetForm) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    try {
      const response = await postContactApi(formData);
      notifySuccess("Subscribe submitted Successfully");
      resetForm();
    } catch (error) {
      console.error("Error submitting the Subscribe form:", error);
      notifyError("Failed to add submitted subscribe!");
    }
  };

  useEffect(() => {
    getPopularProduct();
  }, []);
  return (
    <>
      <footer>
        <div className="footer-upper mt-lg-5 mt-1">
          <div className="text-center pt-3">
            <h1 className="text-white bangers-regular">JOIN FOR HOT OFFERS</h1>
            <p className="fw-500 fb-fs-22 text-white">
              If we go all out...We do it well! Subscribe to the newsletter
              <br></br> to get the most exclusive promos.
            </p>
            <div className="d-inline-block mx-auto">
              <form onSubmit={contact.handleSubmit}>
                <input
                  type="text"
                  className="py-3 ps-3 rounded-3 border-0"
                  style={{ width: "25rem" }}
                  placeholder="Email address"
                  name="email"
                  value={contact.values.email}
                  onChange={contact.handleChange}
                  onBlur={contact.handleBlur}
                />
                <button
                  className="fb-fs-18 text-white fw-600 brown-button ms-4 mt-lg-5 mt-3"
                  type="submit"
                >
                  Subscribe
                </button>
              </form>
              {contact.touched.email && contact.errors.email && (
                <div className="text-danger mt-2 text-start ms-2">
                  {contact.errors.email}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-footer-bg">
          <div className="container fb-container">
            <div className="row pb-lg-5 pb-4">
              <div className="col-lg-5 col-md-12 mb-4">
                <div className="footer-detail">
                  <img src={logo} alt="logo" />
                  <p className="my-4  pe-md-5 me-md-5">
                    At Amrit Bhojanam, we bring the incredible health benefits
                    of millet to your table. We promote a healthier lifestyle
                    with our range of nutritious, millet-based products.
                    {/* Rediscover millet, packed with essential nutrients and
                    eco-friendly benefits, and see how it transforms your diet
                    and well-being. Let's make millet a staple in every home! */}
                  </p>
                  <ul className="footer-detail-links d-flex flex-column gap-md-3 gap-2 pt-lg-3 pt-0 mb-3 mt-3">
                    <li className="d-flex align-items-center fw-500">
                      <span className="me-2">
                        <img src={call} alt="call" />
                      </span>
                      <span
                        className="text-orange fb-fs-18 d-inline-block"
                        style={{ width: "5rem" }}
                      >
                        Call US :
                      </span>
                      <a
                        href="tel:+917678320459"
                        className="fb-fs-18"
                        aria-label="Call +91 7678320459"
                      >
                        +91 7678320459
                      </a>
                    </li>
                    <li className="d-flex align-items-center fw-500">
                      <span className="me-2 pe-1">
                        <img src={mail} alt="email" />
                      </span>
                      <span
                        className="text-orange fb-fs-18 d-inline-block"
                        style={{ width: "5rem" }}
                      >
                        Email :{" "}
                      </span>
                      <a
                        href="mailto: info@amritbhojanam.com "
                        className="fb-fs-18"
                      >
                        info@amritbhojanam.com
                      </a>
                    </li>
                    <li className="d-flex align-items-center fw-500">
                      <span className="me-2 pe-1">
                        <img src={clock} alt="hours" />
                      </span>
                      <span
                        className="text-orange  fb-fs-18 d-inline-block"
                        style={{ width: "5rem" }}
                      >
                        Hours :{" "}
                      </span>
                      <time className="fb-fs-18">10:00 - 18:00, Mon - Sat</time>
                    </li>
                  </ul>
                  <div className="d-flex gap-4 py-lg-3 py-2">
                    <p className="fw-500 text-black fb-fs-14">Follow Us:</p>
                    <div className="d-inline-flex gap-2 align-items-center">
                      <a href="https://www.instagram.com/amrit_bhojanam/profilecard/#/">
                        <AiFillInstagram size={24} color="#f26722" />
                      </a>
                      {/* <a href="https://www.instagram.com/">
                        <FaLinkedin size={20} color="#f26722" />
                      </a>
                      <a href="https://www.facebook.com/">
                        <FaFacebook size={20} color="#f26722" />
                      </a> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 d-md-block d-none">
                <div className="row pt-2">
                  <div className="col-md-4 col-6 mb-4">
                    <h5 className="text-orange">COMPANY</h5>
                    <ul className="footer-links mt-lg-4 mt-0 pt-3 d-flex flex-column gap-md-3 gap-2">
                      <li>
                        <Link to="/about-us">About Us</Link>
                      </li>
                      {/* <li>
                        <Link>Delivery Information</Link>
                      </li> */}
                      <li>
                        <Link to="/privacy-policy">Privacy Policy</Link>
                      </li>
                      <li>
                        <Link to="/term-conditions">Term & Conditions</Link>
                      </li>
                      <li>
                        <Link to="/refund-policy">Refund policy</Link>
                      </li>
                      <li>
                        <Link to="/shiping-policy">Shiping policy</Link>
                      </li>
                      {/* <li>
                        <Link to="/contact-us">Contact Us</Link>
                      </li>
                      <li>
                        <Link to="/contact-us">Support Center</Link>
                      </li> */}
                      {/* <li>
                        <Link>Careers</Link>
                      </li> */}
                    </ul>
                  </div>
                  <div className="col-md-4 col-6 mb-4">
                    <h5 className="text-orange">HELP & SUPPORT</h5>
                    <ul className="footer-links mt-lg-4 mt-0 pt-3 d-flex flex-column gap-md-3 gap-2">
                      {/* <li>
                        <Link>Sign In</Link>
                      </li>
                      <li>
                        <Link to="/login">Login</Link>
                      </li> */}
                      <li>
                        <a
                          href="#"
                          className="border-0 bg-transparent px-0 text-dark-grey"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleCart();
                          }}
                        >
                          View Cart
                        </a>
                      </li>
                      <li>
                        <Link to="/wishlist">Wishlist</Link>
                      </li>
                      {/* <li>
                        <Link>Downloads</Link>
                      </li>
                      <li>
                        <Link>Upgrade Center</Link>
                      </li>
                      <li>
                        <Link>Video Tutorials</Link>
                      </li> */}
                      <li>
                        <Link to="/contact-us">Contact & Support</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4 col-12 mb-md-4 mb-0">
                    <h5 className="text-orange">POPULAR</h5>
                    <ul className="footer-links mt-lg-4 mt-0 pt-3 d-flex flex-column gap-md-3 gap-2">
                      {popularProduct?.slice(0, 6).map((item, index) => (
                        <li key={index}>
                          <Link
                            to={`/products/?name=${decodeURIComponent(
                              item?.name
                            )}`}
                          >
                            {item?.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-12 d-md-none d-block">
                <div className="footer-accordian mb-5">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<AddIcon style={{color: '#000000', fontWeight: 900}} />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography component="span" className="fb-fs-20 text-orange">COMPANY</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <ul className="footer-links d-flex flex-column gap-md-3 gap-2">
                      <li>
                        <Link to="/about-us">About Us</Link>
                      </li>
                      <li>
                        <Link to="/privacy-policy">Privacy Policy</Link>
                      </li>
                      <li>
                        <Link to="/term-conditions">Term & Conditions</Link>
                      </li>
                      <li>
                        <Link to="/refund-policy">Refund policy</Link>
                      </li>
                      <li>
                        <Link to="/shiping-policy">Shiping policy</Link>
                      </li>
                    </ul>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<AddIcon style={{color: '#000000', fontWeight: 900}} />}
                      aria-controls="panel2-content"
                      id="panel2-header"
                    >
                      <Typography component="span" className="fb-fs-20 text-orange">HELP & SUPPORT</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <ul className="footer-links d-flex flex-column gap-md-3 gap-2">
                      <li>
                        <a
                          href="#"
                          className="border-0 bg-transparent px-0 text-dark-grey"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleCart();
                          }}
                        >
                          View Cart
                        </a>
                      </li>
                      <li>
                        <Link to="/wishlist">Wishlist</Link>
                      </li>
                      <li>
                        <Link to="/contact-us">Contact & Support</Link>
                      </li>
                    </ul>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<AddIcon style={{color: '#000000', fontWeight: 900}} />}
                      aria-controls="panel3-content"
                      id="panel3-header"
                    >
                      <Typography component="span" className="fb-fs-20 text-orange">
                      POPULAR
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <ul className="footer-links d-flex flex-column gap-md-3 gap-2">
                      {popularProduct?.slice(0, 6).map((item, index) => (
                        <li key={index}>
                          <Link
                            to={`/products/?name=${decodeURIComponent(
                              item?.name
                            )}`}
                          >
                            {item?.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom bg-semi-orange text-center py-2">
            <p className="text-white">
              © {currentYear} - Amrit Bhojanam. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      <MyCartMenu showCart={showCart} onCloseCart={toggleCart} />
    </>
  );
};

export default Footer;
