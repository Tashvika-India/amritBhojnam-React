import React from "react";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import { Nav, Tab } from "react-bootstrap";
import { FiHeart } from "react-icons/fi";
import bannerAds from "../../../assets/images/web/banner-ads.png";
import bannerAdsmob from "../../../assets/images/web/banner-ads-mob.png";
import amritGroup from "../../../assets/images/web/amrit-group.png";
import milletImg from "../../../assets/images/web/millets-img.png";
import product1 from "../../../assets/images/web/products/product-1.png";
import jowerImg from "../../../assets/images/web/products/jower.png";
import soupImg from "../../../assets/images/web/products/soup.png";
import flourImg from "../../../assets/images/web/products/flour.png";
import idlliImg from "../../../assets/images/web/products/idlli.png";
import murukuImg from "../../../assets/images/web/products/muruku.png";
import phoneImg from "../../../assets/images/web/phone.png";
import appleBtn from "../../../assets/images/web/apple-btn.png";
import androidBtn from "../../../assets/images/web/android-btn.png";
import milletUpper from "../../../assets/images/web/millet-upper.png";
import milletTop from "../../../assets/images/web/millet-top.png";
import milletBottom from "../../../assets/images/web/millet-bottom.png";
import milletRight from "../../../assets/images/web/millet-right.png";
import grain1 from "../../../assets/images/web/grain-1.png";
import grain2 from "../../../assets/images/web/grain-2.png";
import grain3 from "../../../assets/images/web/grain-3.png";
import WebBanner from "./components/WebBanner";
import ItemSlide from "./components/ItemSlide";
import saveImg from "../../../assets/images/web/save-image.png";
import bestPrice from "../../../assets/images/web/offers/best-price.png";
import deliveryImg from "../../../assets/images/web/offers/delivery.png";
import greatDeal from "../../../assets/images/web/offers/great-deal.png";
import easyReturn from "../../../assets/images/web/offers/easy-return.png";
import productCard from "../../../assets/images/web/product-card.png";
import fireImg from "../../../assets/images/web/Fire.png";
import firstPurchase from "../../../assets/images/web/first-purchase.png";
import { Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import ProductCard from "./components/ProductCard";
import { Link } from "react-router-dom";

const HomePage = () => { 

  const data = [
    {
      name: "Masala Millet (Veggie Masala)",
      category: "Millet",
      description: "Veggie Masala Millet",
      image_url: "path/to/image.png",
      weight: "100g",
      price: {
        original: 80,
        discounted: 70,
        currency: "₹",
      },
      discount_percentage: "10 % Off",
      calories: 80,
      availability: "In Stock",
    },
    {
      name: "Masala Millet (Veggie Masala)",
      category: "Millet",
      description: "Veggie Masala Millet",
      image_url: "path/to/image.png",
      weight: "100g",
      price: {
        original: 80,
        discounted: 70,
        currency: "₹",
      },
      discount_percentage: "10 % Off",
      calories: 80,
      availability: "In Stock",
    },
    {
      name: "Masala Millet (Veggie Masala)",
      category: "Millet",
      description: "Veggie Masala Millet",
      image_url: "path/to/image.png",
      weight: "100g",
      price: {
        original: 80,
        discounted: 70,
        currency: "₹",
      },
      discount_percentage: "10 % Off",
      calories: 80,
      availability: "In Stock",
    },
    {
      name: "Masala Millet (Veggie Masala)",
      category: "Millet",
      description: "Veggie Masala Millet",
      image_url: "path/to/image.png",
      weight: "100g",
      price: {
        original: 80,
        discounted: 70,
        currency: "₹",
      },
      discount_percentage: "10 % Off",
      calories: 80,
      availability: "In Stock",
    },
    {
      name: "Masala Millet (Veggie Masala)",
      category: "Millet",
      description: "Veggie Masala Millet",
      image_url: "path/to/image.png",
      weight: "100g",
      price: {
        original: 80,
        discounted: 70,
        currency: "₹",
      },
      discount_percentage: "10 % Off",
      calories: 80,
      availability: "In Stock",
    },
  ];
  return (
    <div className="web-wrapper-main">
      <Header />
      <section>
        <div
          className="home-banner-wrapper"
          style={{ maxWidth: "90%", margin: "0 auto" }}
        >
          <WebBanner />
        </div>
      </section>
      <section>
        <div className="container fb-container">
          <div className="cat-items-wrapper">
          <Link to="/products"><div className="cat-itmes">
              <div
                className="item-image"
                style={{
                  "--linear":
                    "linear-gradient(180deg, #FFB7B7 0%, #FFE0E0 100%)",
                }}
              >
                <img className="img-fluid" src={product1} alt="millet-rice" />
              </div>
              <h6 className="fb-fs-16 fw-500">Millet Rice</h6>
            </div></Link>
            <Link to="/products"><div className="cat-itmes">
              <div
                className="item-image"
                style={{
                  "--linear":
                    "linear-gradient(180deg, #96D7FF 0%, #D7F0FF 100%)",
                }}
              >
                <img className="img-fluid" src={jowerImg} alt="millet-rice" />
              </div>
              <h6 className="fb-fs-16 fw-500">Bakery & Confectionery</h6>
            </div></Link>
            <Link to="/products"><div className="cat-itmes">
              <div
                className="item-image"
                style={{
                  "--linear":
                    "linear-gradient(180deg, #FFCC8F 0%, #FFE9CF 100%)",
                }}
              >
                <img className="img-fluid" src={flourImg} alt="millet-rice" />
              </div>
              <h6 className="fb-fs-16 fw-500">Flour</h6>
            </div></Link>
            <Link to="/products"><div className="cat-itmes">
              <div
                className="item-image"
                style={{
                  "--linear":
                    " linear-gradient(180deg, #C2FFBD 0%, #EFFFEE 100%)",
                }}
              >
                <img className="img-fluid" src={idlliImg} alt="millet-rice" />
              </div>
              <h6 className="fb-fs-16 fw-500">Beverages</h6>
            </div></Link>
            <Link to="/products"><div className="cat-itmes">
              <div
                className="item-image"
                style={{
                  "--linear":
                    "linear-gradient(180deg, #F6D4FF 0%, #FBECFF 100%)",
                }}
              >
                <img className="img-fluid" src={murukuImg} alt="millet-rice" />
              </div>
              <h6 className="fb-fs-16 fw-500">Snacks & Munching Rice</h6>
            </div></Link>
            <Link to="/products"><div className="cat-itmes">
              <div
                className="item-image"
                style={{
                  "--linear":
                    "linear-gradient(180deg, #C3CCFF 0%, #E0E5FF 100%)",
                }}
              >
                <img className="img-fluid" src={soupImg} alt="millet-rice" />
              </div>
              <h6 className="fb-fs-16 fw-500">Instant Mixes</h6>
            </div></Link>
          </div>
        </div>
      </section>
      <section>
        <div className="container fb-container">
          <Tab.Container id="left-tabs-example" defaultActiveKey="All">
            <div className="row">
              <div className="col-md-6">
                <h3 className="fw-bold">Our Best Selling Products</h3>
              </div>
              <div className="col-md-6">
                <Nav
                  variant="pills"
                  className="flex-row justify-content-lg-end tab-nav-wrapper"
                >
                  <Nav.Item className="nav">
                    <Nav.Link className="fb-fs-18 px-2 px-lg-3" eventKey="All">
                      All
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="fb-fs-18 px-2 px-lg-3" eventKey="Snacks">
                      Snacks
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="fb-fs-18 px-2 px-lg-3" eventKey="Instant-Mix">
                      Instant Mix
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="fb-fs-18 px-2 px-lg-3" eventKey="Flour">
                      Flour
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="fb-fs-18 px-2 px-lg-3" eventKey="Rice">
                      Rice
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              <div className="col-md-12">
                <Tab.Content>
                  <Tab.Pane eventKey="All">
                    <div className="row">
                      <div className="d-flex mt-4 pt-2 gap-4 flex-wrap justify-content-between">
                        {data?.map((card, index) => <ProductCard card={card} key={index} />)}
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="Snacks">Second tab content</Tab.Pane>
                  <Tab.Pane eventKey="Instant-Mix">Second tab content</Tab.Pane>
                  <Tab.Pane eventKey="Flour">Second tab content</Tab.Pane>
                  <Tab.Pane eventKey="Rice">Second tab content</Tab.Pane>
                </Tab.Content>
              </div>
            </div>
          </Tab.Container>
        </div>
      </section>
      <section className="offer-cards">
        <div className="container fb-container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="protein-left">
                <div className="left-content p-5">
                  <h4 className="fw-bold mb-lg-3">
                    Upto 40% Off on special Items
                  </h4>
                  <p className="fw-500">
                    Millets are packed with essential nutrients, including
                    fiber, protein, vitamins, and minerals, offering
                  </p>
                </div>
                <button className="button-primary ms-5  mb-4 text-center">
                  Shop Now
                </button>
                {/* <img src={protein1} alt="millet-rice" /> */}
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="row">
                <div className="col-md-12 mb-lg-4">
                  <div className="protein-right-top">
                    <div className="right-top-content p-5 pb-4">
                      <h4 className="fw-bold mb-3">Upto 40% Off </h4>
                      <p className="fw-500">
                        As naturally gluten-free grains, millets provide a great
                        alternative for those with gluten sensitivities
                      </p>
                    </div>
                    <button className="button-primary mt-0 m-5 text-center">
                      Shop Now
                    </button>
                  </div>
                </div>
                <div className="col-md-12 mt-lg-4">
                  <div className="protein-right-bottom">
                    <div className="right-bottom-content p-5 pb-4">
                      <h4 className="fw-bold mb-3">Upto 40% Off </h4>
                      <p className="fw-500">
                        With a low glycemic index, millets help regulate blood
                        sugar levels, making them ideal.
                      </p>
                    </div>
                    <button className="button-primary  mt-0 m-5 text-center">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container fb-container">
          <h3 className="fw-bold text-center mb-5">Super Saver of the Week</h3>
          <ItemSlide />
        </div>
      </section>
      <section className="banner-ads">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 p-0">
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
                <div className="millet-content ps-5">
                  <h6 className="text-brown">MILLET POWER</h6>
                  <h3>Amrit Bhojanam</h3>
                  <p className="mt-4">
                    Amrit Bhojanam started with a simple yet powerful discovery:
                    the incredible benefits <br />
                    of millet. Our founders, who are passionate about
                    sustainable and nutritious food, <br />
                    realized just how incredible this ancient grain is. Millet
                    has been a staple in many <br />
                    cultures for centuries, known for its nutritional value and
                    ability to thrive in different <br />
                    climates. Seeing its potential to tackle today's health
                    challenges, our founders set out <br />
                    on a mission to bring millet back into modern diets and
                    highlight its many benefits.
                  </p>
                  <p className="mt-3">
                    With a lot of research and dedication, Amrit Bhojanam came
                    to life. We’re here to make <br />
                    millet accessible to everyone by offering a variety of
                    delicious, millet-based products. <br />
                    We believe that a healthier lifestyle starts with mindful
                    eating, and our products are <br />
                    crafted to provide essential nutrients while also supporting
                    sustainable farming.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="first_purchase">
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
                      On your first purchase
                    </span>
                  </h1>
                  <p className="text-white pt-1">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer
                  </p>
                  <button className="button-white">Shop Now</button>
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
          <div className="row">
            <div className="col-lg-6 col-md-6 mt-5 align-self-center">
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
                <h2 className="pb-3 fw-normal lh-1 text-black pb-4 mt-4">
                  Download Our
                  <span className="fw-bold text-orange">
                    <br></br>Mobile App
                  </span>
                </h2>
                <p className="pb-5 mb-4">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer
                </p>
                <div className="download-btn d-flex">
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
                </div>
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
      <section>
        <div className="container fb-container">
          <div className="cat-items-wrapper offers-cards">
            <div className="cat-itmes bg-light border-raidus-10">
              <div className="d-flex py-4">
                <div>
                  <img
                    className="img-fluid ps-3"
                    src={bestPrice}
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
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
