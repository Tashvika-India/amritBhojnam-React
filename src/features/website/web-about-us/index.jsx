import React from "react";
import { motion } from "framer-motion";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import MainImg from "../../../assets/images/web/about-main.png";
import About1 from "../../../assets/images/web/about-img-1.png";
import About2 from "../../../assets/images/web/about-img-2.png";
import About3 from "../../../assets/images/web/about-img-3.png";
import PriceOffer from "../../../assets/images/web/price-offer.png";
import WideAsortment from "../../../assets/images/web/wide-asortment.png";
import FreeDelivery from "../../../assets/images/web/free-delivery.png";
import ReturnEasy from "../../../assets/images/web/return-easy.png";
import Satisfaction from "../../../assets/images/web/satisfaction.png";
import GreatDeal from "../../../assets/images/web/great-deal-daily.png";
import GreyBg from "../../../assets/images/web/grey-background.png";

const AboutUs = () => {
  return (
    <div className="web-wrapper-main">
      <Header />

      <section className="about-us pb-0 about-linear">
        <div className="container fb-container mb-5 pb-5">
          <div className="row">
            <div className="col-md-6 pe-0">
              <div>
                <img
                  src={MainImg}
                  className="img-fluid"
                  alt="logo"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="col-md-6 ps-0 pe-5">
              <div>
                <p className="fb-fs-40 fw-600 py-4 mb-2 mt-2">
                  Welcome to Amrit Bhojanam
                </p>
                <p>
                  Amrit Bhojanam started with a simple yet powerful discovery:
                  the incredible benefits of millet. Our founders, who are
                  passionate about sustainable and nutritious food, realized
                  just how incredible this ancient grain is. Millet has been a
                  staple in many cultures for centuries, known for its
                  nutritional value and ability to thrive in different climates.
                  Seeing its potential to tackle today's health challenges, our
                  founders set out on a mission to bring millet back into modern
                  diets and highlight its many benefits.
                </p>
                <p class="pt-4 mt-1">
                  {" "}
                  With a lot of research and dedication, Amrit Bhojanam came to
                  life. We’re here to make millet accessible to everyone by
                  offering a variety of delicious, millet-based products. We
                  believe that a healthier lifestyle starts with mindful eating,
                  and our products are crafted to provide essential nutrients
                  while also supporting sustainable farming.
                </p>
              </div>
              <div className="pt-3">
                <div className="row mt-5 pt-5">
                  <div className="col-md-4">
                    <img
                      src={About1}
                      className="img-fluid"
                      alt="logo"
                      loading="lazy"
                    />
                  </div>
                  <div className="col-md-4">
                    <img
                      src={About2}
                      className="img-fluid"
                      alt="logo"
                      loading="lazy"
                    />
                  </div>
                  <div className="col-md-4">
                    <img
                      src={About3}
                      className="img-fluid"
                      alt="logo"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center my-5 py-5 ">
              <p className="fb-fs-40 fw-600 pb-4 mb-2 mt-5">
                Thoughtfully Made,Inside & Out
              </p>
              <p className="fw-500 fb-fs-20">
                Inspired by the Indian philosophy of Vasudhaiva Kutumbakam, we
                advocate for a world where every <br></br> individual is a
                valued member of our global family. We aim to promote holistic
                well-being and unite <br></br> communities in a shared
                commitment to planetary health.
              </p>

              <p className="fw-500 fb-fs-20 pt-4">
                Our goal is to create a world where compassion, sustainability,
                and interconnectedness thrive, ensuring a <br></br> healthier
                future for all. 
              </p>
            </div>
          </div>

             {/* Marquee section with Framer Motion */}
       <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="marquee flex-shrink-0 mb-5 pb-5"
          style={{ whiteSpace: "nowrap" }}
        >
          {/* Add text or images that you want to animate in the marquee */}
          <span className="marquee-content text-yellow fb-fs-30  px-5">
           MILLET POWER
          </span>
          <span className="marquee-content text-yellow fb-fs-30  px-5">
           MILLET POWER
          </span>
          
          <span className="marquee-content text-yellow fb-fs-30  px-5">
           MILLET POWER
          </span>
          
          <span className="marquee-content text-yellow fb-fs-30  px-5">
           MILLET POWER
          </span>
          <span className="marquee-content text-yellow fb-fs-30  px-5">
           MILLET POWER
          </span>
          <span className="marquee-content text-yellow fb-fs-30  px-5">
           MILLET POWER
          </span>
          <span className="marquee-content text-yellow fb-fs-30  px-5">
           MILLET POWER
          </span>
          <span className="marquee-content text-yellow fb-fs-30  px-5">
           MILLET POWER
          </span>
          <span className="marquee-content text-yellow fb-fs-30  px-5">
           MILLET POWER
          </span>
          <span className="marquee-content text-yellow fb-fs-30  px-5">
           MILLET POWER
          </span>
          <span className="marquee-content text-yellow fb-fs-30  px-5">
           MILLET POWER
          </span>
          <span className="marquee-content text-yellow fb-fs-30  px-5">
           MILLET POWER
          </span>
          <span className="marquee-content text-yellow fb-fs-30  px-5">
           MILLET POWER
          </span>
          <span className="marquee-content text-yellow fb-fs-30  px-5">
           MILLET POWER
          </span>
        </motion.div>
          <div className="row mx-5 px-4">
            <div className="col-md-4">
              <div className="card rounded-20">
                <div className="card-body text-center px-5 py-4">
                  <img
                    src={PriceOffer}
                    className="img-fluid d-block mx-auto mb-4 pt-4"
                    alt="logo"
                    loading="lazy"
                  />
                  <p className="fb-fs-26 fw-600 my-3 pt-3">
                    Best Prices & Offers
                  </p>
                  <p className=" mb-5">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card rounded-20">
                <div className="card-body text-center px-5 py-4">
                  <img
                    src={WideAsortment}
                    className="img-fluid d-block mx-auto mb-4 pt-4"
                    alt="logo"
                    loading="lazy"
                  />
                  <p className="fb-fs-26 fw-600 my-3 pt-3">Wide Assortment</p>
                  <p className=" mb-5">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card rounded-20">
                <div className="card-body text-center px-5 py-4">
                  <img
                    src={FreeDelivery}
                    className="img-fluid d-block mx-auto mb-4 pt-4"
                    alt="logo"
                    loading="lazy"
                  />
                  <p className="fb-fs-26 fw-600 my-3 pt-3">Free Delivery</p>
                  <p className=" mb-5">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form
                  </p>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="row mt-4  mx-5 mb-5 px-4">
            <div className="col-md-4">
              <div className="card rounded-20">
                <div className="card-body text-center px-5 py-4">
                  <img
                    src={ReturnEasy}
                    className="img-fluid d-block mx-auto mb-4 pt-4"
                    alt="logo"
                    loading="lazy"
                  />
                  <p className="fb-fs-26 fw-600 my-3 pt-3">Easy Returns</p>
                  <p className=" mb-5">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card rounded-20">
                <div className="card-body text-center px-5 py-4">
                  <img
                    src={Satisfaction}
                    className="img-fluid d-block mx-auto mb-4 pt-4"
                    alt="logo"
                    loading="lazy"
                  />
                  <p className="fb-fs-26 fw-600 my-3 pt-3">100% Satisfaction</p>
                  <p className=" mb-5">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card rounded-20">
                <div className="card-body text-center px-5 py-4">
                  <img
                    src={GreatDeal}
                    className="img-fluid d-block mx-auto mb-4 pt-4"
                    alt="logo"
                    loading="lazy"
                  />
                  <p className="fb-fs-26 fw-600 my-3 pt-3">
                    Best Prices & Offers
                  </p>
                  <p className=" mb-5">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="about-bottom">
          <div className="container fb-container">
            <div className="row pt-4">
              <div className="col-md-6">
                <div className="grey-background ms-5">
                  <img
                    src={GreyBg}
                    className="img-fluid "
                    alt="logo"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="white-background">
                  <h3 className="fw-bold pb-4">
                    <span className="fb-fs-26 fw-400 pb-4">Eat Healthy,</span>{" "}
                    <br></br>
                    Stay Blessed
                  </h3>
                  <p className="pt-2">
                    Eating healthy is the foundation of a vibrant and active
                    life. A balanced diet not only fuels our bodies but also
                    enhances our overall well-being. Millets, with their rich
                    nutritional profile, are a perfect addition to a healthy
                    diet.
                  </p>

                  <p className="pt-4 pb-2">
                    These are packed with essential nutrients like fiber,
                    protein, vitamins, and minerals, making them a powerhouse of
                    health benefits. Millets are also gluten-free and have a low
                    glycemic index, which helps in managing blood sugar levels
                    and supporting digestive health. Incorporating millet into
                    your daily meals can aid in weight management, boost
                    immunity, and provide sustained energy. 
                  </p>
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
export default AboutUs;
