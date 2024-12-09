import React from "react";
import logo from "../../assets/images/web/logo.svg";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import call from "../../assets/images/web/call.svg";
import clock from "../../assets/images/web/clock.svg";
import mail from "../../assets/images/web/mail.svg";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-upper mt-lg-5 mt-1">
          <div className="text-center pt-3">
            <h1 className="fw-bolder text-white">JOIN FOR HOT OFFERS</h1>
            <p className="fw-500 fb-fs-22 text-white">
              If we go all out...We do it well! Subscribe to the newsletter{" "}
              <br></br> to get the most exclusive promos.
            </p>
            <form>
              <input
                type="text"
                className="py-3 ps-3 rounded-3 border-0 w-25"
                placeholder="Email address"
              />
              <button className="fb-fs-18 text-white fw-600 brown-button ms-4 mt-lg-5 mt-3">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="bg-footer-bg">
          <div className="container fb-container">
            <div className="row py-lg-5 py-4">
              <div className="col-lg-5 col-md-12 mb-4">
                <div className="footer-detail">
                  <img src={logo} alt="logo" />
                  <p className="my-4 text-balance fb-fs-14  pe-5">
                    At Amrit Bhojanam, we bring the incredible health benefits
                    of millet to your table. We promote a healthier lifestyle
                    with our range of nutritious, millet-based products.
                    Rediscover millet, packed with essential nutrients and
                    eco-friendly benefits, and see how it transforms your diet
                    and well-being. Let's make millet a staple in every home!
                  </p>
                  <ul className="footer-detail-links d-flex flex-column gap-md-3 gap-2 pt-lg-3 pt-0 mb-3 mt-3">
                    <li className="d-flex align-items-center fw-500">
                      <span className="me-3">
                        <img src={call} alt="call" />
                      </span>{" "}
                      <span className="text-orange me-2">Call US :</span>{" "}
                      <a href="tel:+91-1234567890">+91 7678320459</a>{" "}
                    </li>
                    <li className="d-flex align-items-center fw-500">
                      <span className="me-3">
                        <img src={mail} alt="email" />
                      </span>{" "}
                      <span className="text-orange me-2">Email : </span>{" "}
                      <a href="mailto: ">info@amritbhojanam.com</a>{" "}
                    </li>
                    <li className="d-flex align-items-center fw-500">
                      <span className="me-3">
                        <img src={clock} alt="hours" />
                      </span>{" "}
                      <span className="text-orange me-2">Hours : </span>{" "}
                      <time>10:00 - 18:00, Mon - Sat</time>{" "}
                    </li>
                  </ul>
                  <div className="d-flex gap-4 py-lg-3 py-2">
                    <small className="fw-500 text-black">Follow Us</small>{" "}
                    <div className="d-inline-flex gap-2 align-items-center">
                      <a href="https://www.instagram.com/amrit_bhojanam/profilecard/#/">
                        <AiFillInstagram size={24} color="#f26722" />
                      </a>{" "}
                      <a href="https://www.instagram.com/">
                        <FaLinkedin size={20} color="#f26722" />{" "}
                      </a>{" "}
                      <a href="https://www.facebook.com/">
                        <FaFacebook size={20} color="#f26722" />{" "}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-md-12">
                <div className="row pt-2">
                  <div className="col-md-4 col-6 mb-4">
                    <h5 className="text-orange">COMPANY</h5>
                    <ul className="footer-links mt-lg-4 mt-0 pt-3 d-flex flex-column gap-md-3 gap-2">
                      <li>
                        <Link to="/about-us">About Us</Link>
                      </li>
                      <li>
                        <Link>Delivery Information</Link>
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
                      <li>
                        <Link to="/contact-us">Contact Us</Link>
                      </li>
                      <li>
                        <Link>Support Center</Link>
                      </li>
                      <li>
                        <Link>Careers</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4 col-6 mb-4">
                    <h5 className="text-orange">HELP & SUPPORT</h5>
                    <ul className="footer-links mt-lg-4 mt-0 pt-3 d-flex flex-column gap-md-3 gap-2">
                      <li>
                        <Link>Sign In</Link>
                      </li>
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                      <li>
                        <Link>View Cart </Link>
                      </li>
                      <li>
                        <Link to="/wishlist">Wishlist</Link>
                      </li>
                      <li>
                        <Link>Downloads</Link>
                      </li>
                      <li>
                        <Link>Upgrade Center</Link>
                      </li>
                      <li>
                        <Link>Video Tutorials</Link>
                      </li>
                      <li>
                        <Link to="/contact-us">Contact & Support</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4 col-12 mb-md-4 mb-0">
                    <h5 className="text-orange">POPULAR</h5>
                    <ul className="footer-links mt-lg-4 mt-0 pt-3 d-flex flex-column gap-md-3 gap-2">
                      <li>
                        <Link>Sorghum Millet (Jowar)</Link>
                      </li>
                      <li>
                        <Link>Proso Millet (Chena / Barri)</Link>
                      </li>
                      <li>
                        <Link>Pearl Millet (Bajra) </Link>
                      </li>
                      <li>
                        <Link>Foxtail Millet (Kakum / Kangni)</Link>
                      </li>
                      <li>
                        <Link>Barnyard Millet (Sanwa)</Link>
                      </li>
                      <li>
                        <Link>Little Millet (Moraiyo)</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom bg-yellow text-center py-2">
            <p className="text-white">
              © 2024 - Amrit Bhojanam. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
