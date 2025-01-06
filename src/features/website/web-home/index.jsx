import React, { useEffect, useRef, useState } from "react";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import amritGroup from "../../../assets/images/web/amrit-group.png";
import milletImg from "../../../assets/images/web/millets-img.png";
import phoneImg from "../../../assets/images/web/phone.png";
import bestBackgroundTop from "../../../assets/images/web/best-background-top.png";
import bestBackgroundBottom from "../../../assets/images/web/best-background-bottom.png";
import appleBtn from "../../../assets/images/web/apple-btn.png";
import androidBtn from "../../../assets/images/web/android-btn.png";
import milletUpper from "../../../assets/images/web/millet-upper.png";
import milletTop from "../../../assets/images/web/millet-top.png";
import milletBottom from "../../../assets/images/web/millet-bottom.png";
import milletRight from "../../../assets/images/web/millet-right.png";
import grain1 from "../../../assets/images/web/grain-1.png";
import grain2 from "../../../assets/images/web/grain-2.png";
import earthImage from "../../../assets/images/web/earth-image.png";
import grain3 from "../../../assets/images/web/grain-3.png";
import WebBanner from "./components/WebBanner";
import ItemSlide from "./components/ItemSlide";
import astrick from "../../../assets/images/web/asterisk.png";
import popProduct from "../../../assets/images/web/popular-product.png";
import firstPurchase from "../../../assets/images/web/first-purchase.png";
import ProductCard from "./components/ProductCard";
import { Link } from "react-router-dom";
import {
  getCategoriesApi,
} from "../../../services/adminApiRoutes";
import Loading from "../../../components/ui/Loading";
import { motion } from "framer-motion";
import { baseURL } from "../../../utils/constant-variable";
import useURLFilters from "../../../custom-compoents/useURLFilters";
import ProductSlide from "./components/productSlide";
import BestProduct from "./components/BestProduct";
import { useDispatch, useSelector } from "react-redux";
import { clearProductList, fetchProductList } from "../../../redux/slices/productSlice";

const HomePage = () => {
  const [category, setCategory] = useState([]);
  const [filter, setFilter] = useURLFilters([]);
  const dispatch = useDispatch();
  const { productList, popularProducts, bestPriceProducts, bestChoiceProducts, deliciousProducts, healthyBitesProducts, error, loading } = useSelector((state) => state.product);

  async function getCategory() {
    try {
      const response = await getCategoriesApi();
      const filteredData = (response?.data || []).filter(
        (item) => item.is_active === true
      );
      setCategory(filteredData);
    } catch (error) {
      console.log("Error on Banner List", error);
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    dispatch(fetchProductList(filter));
    return () => { dispatch(clearProductList()) };
  }, [dispatch]);

  return (
    <div className="web-wrapper-main">
      <Header />
      <section>
        <div
          className="home-banner-wrapper"
          style={{ maxWidth: "93%", maxHeight: "90%", margin: "0 auto" }}
        >
          <WebBanner />
          <div className="mt-lg-5">
            <div className="row my-4 px-lg-3 gap-sm-3 gap-xl-0">
              <div className="col-xl-4 col-lg-12 ">
                <div className="card-left mb-3">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="pt-xxl-4 pt-1 mt-2 ps-xxl-3 ms-xxl-3 ps-2">
                        <p className="text-white fb-fs-24 beyond-class">Beyond Business,</p>
                        <p className="text-white fb-fs-28 fw-bold lh-1">
                          Backing Farmers
                        </p>
                        <p className="text-white py-xxl-4 py-xxl-3 mt-2 mb-xxl-5 con-ban">
                          Farmers are the backbone of our organic journey. We
                          strive to build communities, support organic
                          practices, ensure sustainable livelihoods, and nurture
                          strong partnerships with them.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6"></div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-12 mb-3 mb-xl-0">
                <div className="card-center mb-md-3">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="pt-xxl-4 pt-1 mt-2 ps-xxl-3 ms-xxl-3  ps-2">
                        <p className="text-white fb-fs-24">Wholesome Food,</p>
                        <p className="text-white fb-fs-28 fw-bold lh-1">
                          Fulfilling Life
                        </p>
                        <p className="text-white py-xxl-3 mt-2 mb-xxl-5 con-ban">
                          Organic is a lifestyle, a habit, and a practice
                          combined. It embodies the methods of growing and
                          processing food naturally.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6"></div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-12 ">
                <div className="card-right">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="pt-xxl-4 pt-1 mt-2 ps-xxl-3 ms-xxl-3  ps-2">
                        <p className="text-white fb-fs-24">Healthy Bites,</p>
                        <p className="text-white fb-fs-28 fw-bold lh-1">
                          Greener Future
                        </p>
                        <p className="text-white py-xxl-4 mt-2 mb-5 con-ban">
                          Every healthy bite you take nurtures your body and the
                          planet. Together, let's build a greener future, one
                          meal at a time.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="explore-categories">
        <div className="container fb-container">
          <div className="text-center mb-4">
            <p className="fb-fs-40 text-blue">EAT HEALTHY</p>
            <h1 className="text-blue fw-bolder">BE HEALTHY</h1>
            <button className="orange-button align-item-center mt-3 mb-5 fb-fs-20">
              Explore Categories
            </button>
          </div>
          <div className="cat-items-wrapper">
            {category?.map((item, index) => (
              <Link
                to={`/products?category_id=${item.id}`}
                className="cat-card"
                key={index}
              >
                <motion.div whileHover={{ scale: 1.1 }} className="cat-itmes">
                  <div className="item-image">
                    <img
                      className="img-fluid"
                      src={baseURL + item.img_file}
                      alt="millet-rice"
                    />
                  </div>
                  <h6 className="fb-fs-16 fw-500">{item.name}</h6>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="container fb-container">
          <div className="row">
            <div className="col-lg-6">
              <h3 className="fw-bold mb-3">Our Best Selling Products</h3>
            </div>
            <div className="col-md-12">
              <div className="row">
                <div
                  className="d-grid mt-4 pt-2 gap-4 justify-content-between product-container"
                  style={{
                    gridTemplateColumns:
                      window.innerWidth > 992
                        ? "repeat(5, 1fr)"
                        : window.innerWidth > 768
                          ? "repeat(3, 1fr)"
                          : "repeat(2, 1fr)",
                  }}
                >
                  {loading ? (
                    <Loading />
                  ) : (
                    bestChoiceProducts?.slice(0, 10).map((item, index) => (
                      <ProductCard product={item} key={index} />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="offer-cards">
        <div className="container fb-container">
          <div className="row">
            <div className="col-lg-6 col-md-12 pe-lg-4">
              <div className="protein-left">
                <div className="left-content p-5">
                  {/* <h4 className="fw-bold mb-lg-3">
                    Upto 40% Off on special Items
                  </h4> */}
                  <p className="fw-bold">
                    Millets are packed with essential nutrients, including
                    fiber, protein, vitamins, and minerals, offering
                  </p>
                </div>
                <Link
                  to="/products"
                  className="button-primary d-inlin-block ms-5  mb-4 text-center"
                >
                  Shop Now
                </Link>
                {/* <img src={protein1} alt="millet-rice" /> */}
              </div>
            </div>
            <div className="col-lg-6 col-md-12 ps-lg-4">
              <div className="row">
                <div className="col-md-12 mb-lg-4 mb-md-3">
                  <div className="protein-right-top">
                    <div className="right-top-content p-5 pb-4">
                      {/* <h4 className="fw-bold mb-lg-3">Upto 40% Off </h4> */}
                      <p className="fw-bold">
                        As naturally gluten-free grains, millets provide a great
                        alternative for those with gluten sensitivities
                      </p>
                    </div>
                    <Link to="/products" className="button-primary mt-0 m-lg-5 text-center d-inline-block">
                      Shop Now
                    </Link>
                  </div>
                </div>
                <div className="col-md-12 mt-lg-4">
                  <div className="protein-right-bottom">
                    <div className="right-bottom-content p-5 pb-4">
                      {/* <h4 className="fw-bold mb-lg-3">Upto 40% Off </h4> */}
                      <p className="fw-bold">
                        With a low glycemic index, millets help regulate blood
                        sugar levels, making them ideal.
                      </p>
                    </div>
                    <Link to="/products" className="button-primary  d-inline-block mt-0 m-lg-5 text-center">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="overflow-hidden">
        <div className="container-fluid px-0 mt-3">
          <div className="row">
            {/* Marquee section with Framer Motion */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="marquee flex-shrink-0 "
              style={{ whiteSpace: "nowrap" }}
            >
              <div className="d-flex">
                <span className="marquee-content fb-fs-18 fw-600 px-5 py-4 bg-background d-flex">
                  <img className="me-2 h-75 mt-1" src={astrick} alt="millet-rice" />
                  <span className="">
                    Discover the Power of Millets – Nutritious, Delicious, and Sustainable!
                  </span>
                </span>
                <span className="marquee-content fb-fs-18 fw-600 px-5 py-4 bg-background d-flex">
                  <img className="me-2 h-75 mt-1" src={astrick} alt="millet-rice" />
                  <span className="">
                    Shop Fresh, Organic Millet Products Delivered Right to Your Doorstep!

                  </span>
                </span>
                <span className="marquee-content fb-fs-18 fw-600 px-5 py-4 bg-background d-flex">
                  <img className="me-2 h-75 mt-1" src={astrick} alt="millet-rice" />
                  <span className="">
                    Join the Millet Revolution – Healthy Living Starts Here!
                  </span>
                </span>
                <span className="marquee-content fb-fs-18 fw-600 px-5 py-4 bg-background d-flex">
                  <img className="me-2 h-75 mt-1" src={astrick} alt="millet-rice" />
                  <span className="">
                    Millets for Every Meal – Your Path to a Healthier Lifestyle!

                  </span>
                </span>
                <span className="marquee-content fb-fs-18 fw-600 px-5 py-4 bg-background d-flex">
                  <img className="me-2 h-75 mt-1" src={astrick} alt="millet-rice" />
                  <span className="">
                    Discover the Power of Millets – Nutritious, Delicious, and Sustainable!
                  </span>
                </span>
                <span className="marquee-content fb-fs-18 fw-600 px-5 py-4 bg-background d-flex">
                  <img className="me-2 h-75 mt-1" src={astrick} alt="millet-rice" />
                  <span className="">
                    Shop Fresh, Organic Millet Products Delivered Right to Your Doorstep!

                  </span>
                </span>
                <span className="marquee-content fb-fs-18 fw-600 px-5 py-4 bg-background d-flex">
                  <img className="me-2 h-75 mt-1" src={astrick} alt="millet-rice" />
                  <span className="">
                    Join the Millet Revolution – Healthy Living Starts Here!
                  </span>
                </span>
                <span className="marquee-content fb-fs-18 fw-600 px-5 py-4 bg-background d-flex">
                  <img className="me-2 h-75 mt-1" src={astrick} alt="millet-rice" />
                  <span className="">
                    Millets for Every Meal – Your Path to a Healthier Lifestyle!

                  </span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <section>
        <div className="container fb-container">
          <h3 className="fw-bold text-center mb-5">Super Saver of the Week</h3>
          <ItemSlide healthyBitesProducts={healthyBitesProducts}/>
        </div>
      </section> */}
      <section className="banner-ads mt-5">
        <div className="container-fluid">
          <div className="row">
            {/* <div className="col-md-6 p-0">
              <div className="image-sec">
                <img
                  className="d-lg-block d-md-block d-none desktop-ban h-100"
                  src={bannerAds}
                  alt="banner-ads"
                />
                <img
                  className="d-lg-none d-md-none d-block mn-1 mobile-ban h-100"
                  style={{ marginBottom: "-3px" }}
                  src={bannerAdsmob}
                  alt="banner-ads"
                />
              </div>
            </div>
            <div className="col-md-6 p-0">
              <div className="content-sec">
                <h2 className="pb-3 fw-normal text-white lh-1">
                  Good For
                  <span className="fw-bold">
                    You <br></br> and the Planet
                  </span>
                </h2>
                <p className="pb-5 text-white">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer
                </p>
                <button className="button-white rounded-3">Shop Now</button>
              </div>
            </div> */}
            <div className="col-md-5">
              <div>
                <img
                  className="d-lg-none d-md-block d-none desktop-ban h-100"
                  src={earthImage}
                  alt="banner-ads"
                />
              </div>
            </div>
            <div className="col-lg-7 col-md-12">
              <div className="content-sec">
                <h2 className="pb-3 text-white" style={{ lineHeight: "68px" }}>
                  <span className="fw-400">Good For&nbsp;</span>
                  <span className="fw-bold">
                    You <br></br> and the Planet
                  </span>
                </h2>
                <p className="pb-5 text-white mt-3 mb-2 w-75">
                  Our commitment to sustainability ensures that every choice you
                  make with us positively impacts both you and the planet. By
                  prioritizing eco-friendly solutions, we create a future that
                  is healthier, greener, and more equitable for everyone.
                </p>
                <Link
                  to="/products"
                  className="button-white rounded-3 d-inline-block"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="popular-product" id="best">
        <div className="container fb-container">
          <h3 className="fw-bold text-center mb-5 ms-lg-5">Daily Best Sells</h3>
          <div className="row">
            <div className="col-md-5 align-self-center">
              <div className="popularleft">
                <img src={popProduct} alt="amrit img" className="img-fluid" />
              </div>
            </div>
            <div className="col-md-7">
              {
                loading ? <Loading /> : <ProductSlide bestPriceProduct={bestPriceProducts} />
              }
            </div>
          </div>
        </div>
      </section>
      <section className="amrit_bhojanam pb-6">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 mb-4 ps-0">
              <div className="amrit">
                <img src={amritGroup} alt="amrit img" className="img-fluid" />
              </div>
            </div>
            <div className="col-lg-6 pe-0">
              <div className="millets">
                <div className="millet-left-img mb-lg-4">
                  <img
                    src={milletImg}
                    alt="millets img"
                    className="img-fluid millet-img"
                  />
                </div>
                <div className="millet-content ps-lg-5">
                  <h6 className="text-brown">MILLET POWER</h6>
                  <h3>Amrit Bhojanam</h3>
                  <p className="mt-4">
                    Amrit Bhojanam started with a simple yet powerful discovery:
                    the incredible benefits <br className="d-none d-lg-inline-block" />
                    of millet. Our founders, who are passionate about
                    sustainable and nutritious food, <br className="d-none d-lg-inline-block" />
                    realized just how incredible this ancient grain is. Millet
                    has been a staple in many <br className="d-none d-lg-inline-block" />
                    cultures for centuries, known for its nutritional value and
                    ability to thrive in different <br className="d-none d-lg-inline-block" />
                    climates. Seeing its potential to tackle today's health
                    challenges, our founders set out <br className="d-none d-lg-inline-block" />
                    on a mission to bring millet back into modern diets and
                    highlight its many benefits.
                  </p>
                  <p className="mt-3">
                    With a lot of research and dedication, Amrit Bhojanam came
                    to life. We’re here to make <br className="d-none d-lg-inline-block" />
                    millet accessible to everyone by offering a variety of
                    delicious, millet-based products. <br className="d-none d-lg-inline-block" />
                    We believe that a healthier lifestyle starts with mindful
                    eating, and our products are <br className="d-none d-lg-inline-block" />
                    crafted to provide essential nutrients while also supporting
                    sustainable farming.
                  </p>
                  <Link to="/about-us" className="button-primary d-inline-block mt-4">About us</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <img
        className="img-fluid w-100 mt-5"
        style={{ marginBottom: "-1px" }}
        src={bestBackgroundTop}
        alt="purchase-page"
      />
      <section id="popular"
        className="best-product bg-semi-orange overflow-hidden"

      >
        <div className="container-fluid">
          <div className="h-100">
            <h3 className="fw-bold mb-5 pb-2 text-center text-white">
              Our Trending Products
            </h3>
            {
              loading ? <Loading /> : <BestProduct products={bestPriceProducts} />
            }
            <div className="mt-5 text-center">
              <Link
                to="/products"
                className="white-button fw-500 mt-4 d-inline-block"
              >
                See all Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      <img
        className="img-fluid w-100"
        style={{ marginTop: "-1px" }}
        src={bestBackgroundBottom}
        alt="purchase-page"
      />
      <section className="first_purchase mt-5 py-5">
        <div className="container fb-container">
          <div className="purchase-bg">
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <div className="purchase-content">
                  <h4 className="text-white mb-0">Get</h4>
                  <h1 className="text-white">
                    25% Off
                    <span
                      className="text-white"
                      style={{ fontSize: "23.11px", fontWeight: "400" }}
                    >
                      &nbsp;&nbsp;&nbsp;On your first purchase
                    </span>
                  </h1>
                  <p className="text-white pt-3">
                    Get 25% off your first purchase of premium millet-based
                    products. Embrace nutritious, sustainable eating with this
                    special offer. Don't miss out—order now and start your
                    healthy journey!
                  </p>
                  <Link to="/products" className="button-white d-inline-block">Shop Now</Link>
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="purchase-image-sec">
                  <img
                    className="img-fluid h-100 mt-5"
                    src={firstPurchase}
                    alt="purchase-page"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="download-section">
        <div className="container fb-container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 mt-5">
              <div className="download-content ms-5 mt-5 p-0">
                <span className="millet-top">
                  <img
                    src={milletTop}
                    alt="millets img"
                    className="img-fluid millet-img"
                  />
                </span>
                <span className="millet-upper">
                  <img
                    src={milletUpper}
                    alt="millets img"
                    className="img-fluid millet-img"
                  />
                </span>
                <h2 className="fw-normal lh-1 text-black pb-4 mb-2 mt-4">
                  Download Our
                  <span className="fw-bold text-orange">
                    <br></br>Mobile App
                  </span>
                </h2>
                <p className="pb-4 mb-lg-4 mb-0 pe-5">
                  Enjoy the convenience of shopping for your favorite
                  millet-based products directly from your phone. Our app offers
                  a user-friendly interface, exclusive deals, and personalized
                  recommendations to enhance your shopping experience. Download
                  now and start exploring a healthier lifestyle at your
                  fingertips.
                </p>
                {/* <div className="download-btn d-flex">
                  <div className="apple-btn me-3">
                    <img
                      src={appleBtn}
                      alt="apple"
                      className="img-fluid apple-img"
                    />
                  </div>
                  <div className="android-btn">
                    <img
                      src={androidBtn}
                      alt="android"
                      className="img-fluid android-img"
                    />
                  </div>
                </div> */}
                <span className="millet-bottom">
                  <img
                    src={milletBottom}
                    alt="millets img"
                    className="img-fluid millet-img"
                  />
                </span>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-8 mx-auto">
              <span className="millet-right">
                <img
                  src={milletRight}
                  alt="millets img"
                  className="img-fluid millet-img"
                />
              </span>
              <span className="grain-1">
                <img
                  src={grain1}
                  alt="millets img"
                  className="img-fluid millet-img"
                />
              </span>
              <span className="grain-2">
                <img
                  src={grain2}
                  alt="millets img"
                  className="img-fluid millet-img"
                />
              </span>
              <span className="grain-3">
                <img
                  src={grain3}
                  alt="millets img"
                  className="img-fluid millet-img"
                />
              </span>
              <div className="phone-image">
                <img src={phoneImg} alt="amrit img" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section>
        <div className="container fb-container">
          <div className="cat-items-wrapper offers-cards">
            <div className="cat-itmes bg-light border-raidus-10">
              <div className="d-flex py-4">
                <div>
                  <img
                    className="img-fluid ps-3"
                    src={bestOffer}
                    alt="millet-rice"
                  />
                </div>
                <div className="ps-4 text-start">
                  <h6 style={{ textWrap: "nowrap" }}>Best Prices & Offers</h6>
                  <p>Orders ₹50 or more</p>
                </div>
              </div>
            </div>
            <div className="cat-itmes bg-light border-raidus-10">
              <div className="d-flex py-4">
                <div>
                  <img
                    className="img-fluid ps-4"
                    src={deliveryImg}
                    alt="millet-rice"
                  />
                </div>
                <div className="ps-4 text-start">
                  <h6 style={{ textWrap: "nowrap" }}>Free Delivery</h6>
                  <p>For order above ₹300</p>
                </div>
              </div>
            </div>
            <div className="cat-itmes bg-light border-raidus-10">
              <div className="d-flex py-4">
                <div>
                  <img
                    className="img-fluid ps-4"
                    src={greatDeal}
                    alt="millet-rice"
                  />
                </div>
                <div className="ps-4 text-start">
                  <h6 style={{ textWrap: "nowrap" }}>Great Daily Deal</h6>
                  <p>When you sign up</p>
                </div>
              </div>
            </div>
            <div className="cat-itmes bg-light border-raidus-10">
              <div className="d-flex py-4">
                <div>
                  <img
                    className="img-fluid ps-4"
                    src={easyReturn}
                    alt="millet-rice"
                  />
                </div>
                <div className="ps-4 text-start">
                  <h6 style={{ textWrap: "nowrap" }}>Easy Return</h6>
                  <p>Within 3 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <Footer />
    </div>
  );
};

export default HomePage;
