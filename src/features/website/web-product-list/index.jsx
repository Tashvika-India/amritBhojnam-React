import React, { useState } from "react";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import fireImg from "../../../assets/images/web/Fire.png";
import productCard from "../../../assets/images/web/product-card.png";
import { FiHeart, FiMinus } from "react-icons/fi";
import catIcon from "../../../assets/images/web/products/product-cat.svg";
import { Slider } from "primereact/slider";
import starImg from "../../../assets/images/web/products/star.png";
import { grey } from "@mui/material/colors";
import ProductCard from "../web-home/components/ProductCard";

const ProudctList = () => {
  const [value, setValue] = useState([20, 80]);

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
        <div className="container fb-container">
          <div className="row">
            <div className="col-md-3">
              <div className="bg-white product-detail-shadow rounded-20 p-4 mb-5">
                <h6 className="underline-heading fw-bold">Category</h6>
                <div className="">
                  <ul className="category-select-list">
                    <li className="cat-btn-item active">
                      <span className="d-inline-flex align-items-center gap-2">
                        <img src={catIcon} className="img-fluid" alt="icon" />
                        Millet Rice
                      </span>
                      <span className="pill-circle">6</span>
                    </li>
                    <li className="cat-btn-item">
                      <span className="d-inline-flex align-items-center gap-2">
                        <img src={catIcon} className="img-fluid" alt="icon" />
                        Bakery & Confectionery
                      </span>
                      <span className="pill-circle">2</span>
                    </li>
                    <li className="cat-btn-item">
                      <span className="d-inline-flex align-items-center gap-2">
                        <img src={catIcon} className="img-fluid" alt="icon" />
                        Flour
                      </span>
                      <span className="pill-circle">5</span>
                    </li>
                    <li className="cat-btn-item">
                      <span className="d-inline-flex align-items-center gap-2">
                        <img src={catIcon} className="img-fluid" alt="icon" />
                        Beverages
                      </span>
                      <span className="pill-circle">2</span>
                    </li>
                    <li className="cat-btn-item">
                      <span className="d-inline-flex align-items-center gap-2">
                        <img src={catIcon} className="img-fluid" alt="icon" />
                        Snacks & Munching
                      </span>
                      <span className="pill-circle">5</span>
                    </li>
                    <li className="cat-btn-item">
                      <span className="d-inline-flex align-items-center gap-2">
                        <img src={catIcon} className="img-fluid" alt="icon" />
                        Instant Mixes
                      </span>
                      <span className="pill-circle">2</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-white product-detail-shadow rounded-20 p-4 px-3">
                <h6 className="underline-heading fw-bold">Price & Rating</h6>
                <div className="mb-4 pb-3 border-bottom mt-5">
                  <Slider
                    value={value}
                    onChange={(e) => setValue(e.value)}
                    className="w-14rem"
                    range
                  />
                  <div className="row mt-4">
                    <div className="col-5">
                      <div className="max-border">
                        <p className="ms-1 fw-300">
                          Min: <span className="fw-500 ms-2"> Rs.100</span>
                        </p>
                      </div>
                    </div>
                    <div className="col-2 text-center">
                      <FiMinus size={50} />
                    </div>
                    <div className="col-5">
                      <div className="max-border">
                        <p className="ms-1 fw-300">
                          Max: <span className="fw-500 ms-2"> Rs.200</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <p className="fw-500 pb-2">Customer Ratings</p>
                  <ul className="mt-2">
                    <li className="d-flex mt-3">
                      <input type="checkbox" className="me-3 bg-grey" /> 4
                      <span>
                        <img
                          className="img-fluid mt-1 mx-1"
                          src={starImg}
                          alt="star"
                        />
                      </span>
                      & More
                    </li>
                    <li className="d-flex my-3">
                      <input type="checkbox" id="myCheckbox" className="me-3 bg-grey" /> 3
                      <span>
                        <img
                          className="img-fluid mt-1 mx-1"
                          src={starImg}
                          alt="star"
                        />
                      </span>
                      & More
                      <label for="myCheckbox"></label>
                    </li>
                    <li className="d-flex my-3">
                      <input type="checkbox" className="me-3 bg-grey" style={{ backgroundColor: "#000", border: "1px solid #000"}} /> 2
                      <span>
                        <img
                          className="img-fluid mt-1 mx-1"
                          src={starImg}
                          alt="star"
                        />
                      </span>
                      & More
                    </li>
                    <li className="d-flex my-3">
                      <input type="checkbox" className="me-3 bg-grey" /> 1
                      <span>
                        <img
                          className="img-fluid mt-1 mx-1"
                          src={starImg}
                          alt="star"
                        />
                      </span>
                      & More
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="d-flex justify-content-between align-items-center mt-lg-0 mt-4">
                <h5 className="text-mid-grey">Showing 6 result</h5>
                <div className="sort-select d-flex">
                  <p className="mt-1 text-mid-grey">
                    Sort by:
                  </p>
                  <span>
                      <select
                        className="form-select fw-600 text-mid-grey border-0"
                        name=""
                        id=""
                      >
                        <option value="">Popularity</option>
                      </select>
                    </span>
                </div>
              </div>
              <div className="d-flex mt-4 gap-4 pt-2 justify-content-start flex-wrap">
                {data?.map((card, index) => <ProductCard card={card} key={index} />)}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProudctList;
