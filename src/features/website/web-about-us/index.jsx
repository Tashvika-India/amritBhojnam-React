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
import GreyBg from "../../../assets/images/web/grey-background.jpeg";

const AboutUs = () => {
  return (
    <div className="web-wrapper-main">
      <Header />

      <section className="about-us pb-0 about-linear">
        <div className="container fb-container mb-lg-5 pb-lg-5">
          <div className="row">
            <div className="col-md-6">
              <div className="main-logo pe-lg-5">
                <img
                  src={MainImg}
                  className="img-fluid ps-lg-5 mx-auto"
                  alt="logo"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="col-md-6 ps-lg-0 pe-lg-5 about-right">
              <div>
                <p className="fb-fs-40 fw-600 py-lg-4 py-md-0 py-2 mb-md-0 mb-lg-2 mt-lg-2">
                  Welcome to Amrit Bhojanam
                </p>
                <p className="about-con-inner">
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
                <p className="pt-lg-4 pt-2 mt-1 about-con-inner">
                  
                  With a lot of research and dedication, Amrit Bhojanam came to
                  life. We’re here to make millet accessible to everyone by
                  offering a variety of delicious, millet-based products. We
                  believe that a healthier lifestyle starts with mindful eating,
                  and our products are crafted to provide essential nutrients
                  while also supporting sustainable farming.
                </p>
              </div>
              <div className="pt-3 bottom-image">
                <div className="row pt-lg-5 bottom-sec">
                  <div className="col-4 ">
                    <img
                      src={About1}
                      className="img-fluid"
                      alt="logo"
                      loading="lazy"
                    />
                  </div>
                  <div className="col-4">
                    <img
                      src={About2}
                      className="img-fluid"
                      alt="logo"
                      loading="lazy"
                    />
                  </div>
                  <div className="col-4">
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
            <div className="text-center my-lg-5 py-lg-5 ">
              <p className="fb-fs-40 fw-600 pb-lg-4 mb-md-2 mt-5">
                Thoughtfully Made,Inside & Out
              </p>
              <p className="fw-500 fb-fs-20 thoughtful-content">
                Inspired by the Indian philosophy of Vasudhaiva Kutumbakam, we
                advocate for a world where every <br></br> individual is a
                valued member of our global family. We aim to promote holistic
                well-being and unite <br></br> communities in a shared
                commitment to planetary health.
              </p>

              <p className="fw-500 fb-fs-20 pt-md-4 thoughtful-content-bottom">
                Our goal is to create a world where compassion, sustainability,
                and interconnectedness thrive, ensuring a <br></br> healthier
                future for all. 
              </p>
            </div>
          </div>
          {/* Marquee section with Framer Motion */}
          <div className="mb-4">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="marquee flex-shrink-0 mb-md-5 mb-lg-0 mb-xl-5 pb-lg-5 pb-sm-5 pt-md-4  pt-sm-4"
            style={{ whiteSpace: "nowrap" }}>
            <span className="marquee-content text-yellow fb-fs-30  px-5">
            Healthy, Nutritious, and Sustainable
            </span>
            <span className="marquee-content text-yellow fb-fs-30  px-5">
            Rediscover the Goodness of Millets!
            </span> 
            <span className="marquee-content text-yellow fb-fs-30  px-5">
            Crafting Wellness, One Millet at a Time.
            </span> 
            <span className="marquee-content text-yellow fb-fs-30  px-5">
            Gluten-Free, Nutrient-Rich, and Delicious!
            </span>
            <span className="marquee-content text-yellow fb-fs-30  px-5">
            oin the Millet Revolution Today!
            </span>
            <span className="marquee-content text-yellow fb-fs-30  px-5">
            Millets: The Superfood of the Future!
            </span>
            <span className="marquee-content text-yellow fb-fs-30  px-5">
            Healthy, Nutritious, and Sustainable
            </span>
            <span className="marquee-content text-yellow fb-fs-30  px-5">
            Rediscover the Goodness of Millets!
            </span> 
            <span className="marquee-content text-yellow fb-fs-30  px-5">
            Crafting Wellness, One Millet at a Time.
            </span> 
            <span className="marquee-content text-yellow fb-fs-30  px-5">
            Gluten-Free, Nutrient-Rich, and Delicious!
            </span>
            <span className="marquee-content text-yellow fb-fs-30  px-5">
            oin the Millet Revolution Today!
            </span>
            <span className="marquee-content text-yellow fb-fs-30  px-5">
            Millets: The Superfood of the Future!
            </span>
          </motion.div>
          </div>
          <div className="row mx-xl-5 mx-lg-0 px-xl-4 px-lg-4">
            <div className="col-lg-4 col-sm-6">
              <div className="card rounded-20">
                <div className="card-body text-center px-lg-5 py-xl-4 py-lg-2">
                  <img
                    src={PriceOffer}
                    className="img-fluid d-block mx-auto mb-4 pt-4"
                    alt="logo"
                    loading="lazy"
                  />
                  <p className="fb-fs-26 fw-600 my-md-3 pt-lg-3">
                    Best Prices & Offers
                  </p>
                  <p className=" mb-5">
                  Enjoy unbeatable prices and exclusive deals on a wide range of millet-based products. Healthy eating has never been more affordable!
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="card rounded-20">
                <div className="card-body text-center px-lg-5 py-xl-4 py-lg-2">
                  <img
                    src={WideAsortment}
                    className="img-fluid d-block mx-auto mb-4 pt-4"
                    alt="logo"
                    loading="lazy"
                  />
                  <p className="fb-fs-26 fw-600 my-md-3 pt-lg-3">
                    Wide Assortment
                  </p>
                  <p className=" mb-5">
                  Explore a diverse selection of millet food products tailored to meet your every need—snacks, staples, and more, all in one place.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mt-sm-4 mt-lg-0">
              <div className="card rounded-20">
                <div className="card-body text-center  px-lg-5 py-xl-4 py-lg-2">
                  <img
                    src={FreeDelivery}
                    className="img-fluid d-block mx-auto mb-4 pt-4"
                    alt="logo"
                    loading="lazy"
                  />
                  <p className="fb-fs-26 fw-600 my-md-3 pt-lg-3">
                    Free Delivery
                  </p>
                  <p className=" mb-5">
                  Get your favorite millet products delivered to your doorstep at no extra cost. Convenience and savings, guaranteed!
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mt-4 mb-lg-4">
              <div className="card rounded-20">
                <div className="card-body text-center  px-lg-5 py-xl-4 py-lg-2">
                  <img
                    src={ReturnEasy}
                    className="img-fluid d-block mx-auto mb-4 pt-4"
                    alt="logo"
                    loading="lazy"
                  />
                  <p className="fb-fs-26 fw-600 my-md-3 pt-lg-3">
                    Easy Returns
                  </p>
                  <p className=" mb-5">
                  Changed your mind? No worries! Our hassle-free return policy ensures a smooth and stress-free experience every time.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mt-4 mb-4">
              <div className="card rounded-20">
                <div className="card-body text-center  px-lg-5 py-xl-4 py-lg-2">
                  <img
                    src={Satisfaction}
                    className="img-fluid d-block mx-auto mb-4 pt-4"
                    alt="logo"
                    loading="lazy"
                  />
                  <p className="fb-fs-26 fw-600 my-md-3 pt-lg-3">
                    100% Satisfaction
                  </p>
                  <p className=" mb-5">
                  Your satisfaction is our top priority. We’re committed to providing the best quality and service for every purchase.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mt-4 mb-4">
              <div className="card rounded-20">
                <div className="card-body text-center  px-lg-5 py-xl-4 py-lg-2">
                  <img
                    src={GreatDeal}
                    className="img-fluid d-block mx-auto mb-4 pt-4"
                    alt="logo"
                    loading="lazy"
                  />
                  <p className="fb-fs-26 fw-600 my-md-3 pt-lg-3">
                    Best Prices & Offers
                  </p>
                  <p className=" mb-5">
                  Don’t miss out on amazing daily discounts! Find incredible offers on millet food products every single day.
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
                <div className="grey-background ms-lg-5">
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
                  <h3 className="fw-bold pb-lg-4">
                    <span className="fb-fs-26 fw-400 pb-4">Eat Healthy,</span>
                    <br></br>
                    Stay Blessed
                  </h3>
                  <p className="pt-lg-2">
                    Eating healthy is the foundation of a vibrant and active
                    life. A balanced diet not only fuels our bodies but also
                    enhances our overall well-being. Millets, with their rich
                    nutritional profile, are a perfect addition to a healthy
                    diet.
                  </p>

                  <p className="pt-lg-4 pt-md-0 pt-2 pb-2">
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
