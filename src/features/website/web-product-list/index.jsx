import React, { useState } from 'react'
import Header from '../../../layout/web-layout/Header'
import Footer from '../../../layout/web-layout/Footer'
import fireImg from "../../../assets/images/web/Fire.png";
import productCard from "../../../assets/images/web/product-card.png";
import { FiHeart } from 'react-icons/fi';
import catIcon from "../../../assets/images/web/products/product-cat.svg";
import { Slider } from "primereact/slider";

const ProudctList = () => {
    const [value, setValue] = useState([20, 80]);

    return (
        <div className="web-wrapper-main">
            <Header />
            <section>
                <div className="container fb-container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="bg-white box-shadow rounded-2 p-3 mb-4">
                                <h6 className='underline-heading fw-bold'>Category</h6>
                                <div className="">
                                    <ul className='category-select-list'>
                                        <li className='cat-btn-item active'>
                                            <span className="d-inline-flex align-items-center gap-2"><img src={catIcon} className='img-fluid' alt="icon" /> Millet Rice </span> <span className="pill-circle">6</span>
                                        </li>
                                        <li className='cat-btn-item'>
                                            <span className="d-inline-flex align-items-center gap-2"><img src={catIcon} className='img-fluid' alt="icon" /> Bakery & Confectionery </span> <span className="pill-circle">2</span>
                                        </li>
                                        <li className='cat-btn-item'>
                                            <span className="d-inline-flex align-items-center gap-2"><img src={catIcon} className='img-fluid' alt="icon" /> Flour </span> <span className="pill-circle">5</span>
                                        </li>
                                        <li className='cat-btn-item'>
                                            <span className="d-inline-flex align-items-center gap-2"><img src={catIcon} className='img-fluid' alt="icon" /> Beverages </span> <span className="pill-circle">2</span>
                                        </li>
                                        <li className='cat-btn-item'>
                                            <span className="d-inline-flex align-items-center gap-2"><img src={catIcon} className='img-fluid' alt="icon" /> Snacks & Munching </span> <span className="pill-circle">5</span>
                                        </li>
                                        <li className='cat-btn-item'>
                                            <span className="d-inline-flex align-items-center gap-2"><img src={catIcon} className='img-fluid' alt="icon" /> Instant Mixes </span> <span className="pill-circle">2</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-white box-shadow rounded-2 p-3 px-3">
                                <h6 className='underline-heading fw-bold'>Price & Rating</h6>
                                <div className="mb-4 pb-3 border-bottom">
                                    <Slider value={value} onChange={(e) => setValue(e.value)} className="w-14rem" range />
                                    <div className="row mt-4">
                                        <div className="col-md-5">
                                            <input type="text" className='form-control' name="" id="" placeholder="Min price"/>
                                        </div>
                                        <div className="col-md-2 text-center" >
                                            --
                                        </div>
                                        <div className="col-md-5">
                                            <input type="text" className='form-control' name="" id="" placeholder="Max price"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <p>Customer Ratings</p>
                                    <ul className='mt-2'>
                                        <li>
                                            <input type="checkbox" /> 4 & More
                                        </li>
                                        <li>
                                            <input type="checkbox" /> 3 & More
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className='text-mid-grey'>Showing 6 result</h5>
                                <div className="">
                                    <select className='form-select' name="" id="">
                                        <option value="">Popularity</option>
                                    </select>
                                </div>
                            </div>
                            <div className="d-flex mt-4 gap-4 pt-2 justify-content-start flex-wrap">
                                <div className="product-card border py-3 px-4">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <span className="product-badge badge bg-yellow fw-500">
                                                10% off
                                            </span>
                                        </div>
                                        <div>
                                            <FiHeart color="#F26722" fontSize={"22px"} />
                                        </div>
                                    </div>
                                    <span className="product-fav"></span>
                                    <div className="">
                                        <img
                                            className="img-fluid pb-3"
                                            src={productCard}
                                            alt="product"
                                        />
                                    </div>
                                    <h6 className="fb-fs-12 fw-500 d-flex text-brown">
                                        <span>
                                            <img
                                                className="img-fluid"
                                                src={fireImg}
                                                alt="fire"
                                            />
                                        </span>
                                        80 Calories
                                    </h6>
                                    <h5 className="fb-fs-14 fw-600 masala-con">
                                        Masala Millet (Veggie Masala)
                                    </h5>
                                    <h5 className="fb-fs-14 fw-600 text-grey">100 g</h5>
                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                        <h6 className="fb-fs-20 fw-bold mb-0">
                                            <small className="fw-500 fb-fs-16 text-grey">
                                                <strike>₹80</strike>
                                            </small>
                                            ₹70
                                        </h6>
                                        <button className="button-primary py-1 rounded fb-fs-14 fw-600">
                                            Add
                                        </button>
                                    </div>
                                </div>
                                <div className="product-card border  py-3 px-4">
                                    <div className="d-flex justify-content-between ">
                                        <div>
                                            <span className="product-badge badge bg-yellow fw-500">
                                                10% off
                                            </span>
                                        </div>
                                        <div>
                                            <FiHeart color="#F26722" fontSize={"22px"} />
                                        </div>
                                    </div>
                                    <span className="product-fav"></span>
                                    <div className="">
                                        <img
                                            className="img-fluid pb-3"
                                            src={productCard}
                                            alt="product"
                                        />
                                    </div>
                                    <h6 className="fb-fs-12 fw-500 d-flex text-brown">
                                        <span>
                                            <img
                                                className="img-fluid"
                                                src={fireImg}
                                                alt="fire"
                                            />
                                        </span>
                                        80 Calories
                                    </h6>
                                    <h5 className="fb-fs-14 fw-600 masala-con">
                                        Masala Millet (Veggie Masala)
                                    </h5>
                                    <h5 className="fb-fs-14 fw-600 text-grey">100 g</h5>
                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                        <h6 className="fb-fs-20 fw-bold mb-0">
                                            <small className="fw-500 fb-fs-16 text-grey">
                                                <strike>₹80</strike>
                                            </small>
                                            ₹70
                                        </h6>
                                        <button className="button-primary py-1 rounded fb-fs-14 fw-600">
                                            Add
                                        </button>
                                    </div>
                                </div>
                                <div className="product-card border  py-3 px-4">
                                    <div className="d-flex justify-content-between ">
                                        <div>
                                            <span className="product-badge badge bg-yellow fw-500">
                                                10% off
                                            </span>
                                        </div>
                                        <div>
                                            <FiHeart color="#F26722" fontSize={"22px"} />
                                        </div>
                                    </div>
                                    <span className="product-fav"></span>
                                    <div className="">
                                        <img
                                            className="img-fluid pb-3"
                                            src={productCard}
                                            alt="product"
                                        />
                                    </div>
                                    <h6 className="fb-fs-12 fw-500 d-flex text-brown">
                                        <span>
                                            <img
                                                className="img-fluid"
                                                src={fireImg}
                                                alt="fire"
                                            />
                                        </span>
                                        80 Calories
                                    </h6>
                                    <h5 className="fb-fs-14 fw-600 masala-con">
                                        Masala Millet (Veggie Masala)
                                    </h5>
                                    <h5 className="fb-fs-14 fw-600 text-grey">100 g</h5>
                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                        <h6 className="fb-fs-20 fw-bold mb-0">
                                            <small className="fw-500 fb-fs-16 text-grey">
                                                <strike>₹80</strike>
                                            </small>
                                            ₹70
                                        </h6>
                                        <button className="button-primary py-1 rounded fb-fs-14 fw-600">
                                            Add
                                        </button>
                                    </div>
                                </div>
                                <div className="product-card border  py-3 px-4">
                                    <div className="d-flex justify-content-between ">
                                        <div>
                                            <span className="product-badge badge bg-yellow fw-500">
                                                10% off
                                            </span>
                                        </div>
                                        <div>
                                            <FiHeart color="#F26722" fontSize={"22px"} />
                                        </div>
                                    </div>
                                    <span className="product-fav"></span>
                                    <div className="">
                                        <img
                                            className="img-fluid pb-3"
                                            src={productCard}
                                            alt="product"
                                        />
                                    </div>
                                    <h6 className="fb-fs-12 fw-500 d-flex text-brown">
                                        <span>
                                            <img
                                                className="img-fluid"
                                                src={fireImg}
                                                alt="fire"
                                            />
                                        </span>
                                        80 Calories
                                    </h6>
                                    <h5 className="fb-fs-14 fw-600 masala-con">
                                        Masala Millet (Veggie Masala)
                                    </h5>
                                    <h5 className="fb-fs-14 fw-600 text-grey">100 g</h5>
                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                        <h6 className="fb-fs-20 fw-bold mb-0">
                                            <small className="fw-500 fb-fs-16 text-grey">
                                                <strike>₹80</strike>
                                            </small>
                                            ₹70
                                        </h6>
                                        <button className="button-primary py-1 rounded fb-fs-14 fw-600">
                                            Add
                                        </button>
                                    </div>
                                </div>
                                <div className="product-card border  py-3 px-4">
                                    <div className="d-flex justify-content-between ">
                                        <div>
                                            <span className="product-badge badge bg-yellow fw-500">
                                                10% off
                                            </span>
                                        </div>
                                        <div>
                                            <FiHeart color="#F26722" fontSize={"22px"} />
                                        </div>
                                    </div>
                                    <span className="product-fav"></span>
                                    <div className="">
                                        <img
                                            className="img-fluid pb-3"
                                            src={productCard}
                                            alt="product"
                                        />
                                    </div>
                                    <h6 className="fb-fs-12 fw-500 d-flex text-brown">
                                        <span>
                                            <img
                                                className="img-fluid"
                                                src={fireImg}
                                                alt="fire"
                                            />
                                        </span>
                                        80 Calories
                                    </h6>
                                    <h5 className="fb-fs-14 fw-600 masala-con">
                                        Masala Millet (Veggie Masala)
                                    </h5>
                                    <h5 className="fb-fs-14 fw-600 text-grey">100 g</h5>
                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                        <h6 className="fb-fs-20 fw-bold mb-0">
                                            <small className="fw-500 fb-fs-16 text-grey">
                                                <strike>₹80</strike>
                                            </small>
                                            ₹70
                                        </h6>
                                        <button className="button-primary py-1 rounded fb-fs-14 fw-600">
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default ProudctList