import React, { useEffect, useState } from "react";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import homeImg from "../../../assets/images/web/account/home-img.png";
import product from "../../../assets/images/web/product-card.png";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { IoHomeOutline } from "react-icons/io5";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { getCartApi, getFinalCartApi } from "../../../services/adminApiRoutes";
import Loading from "../../../components/ui/Loading";
import { Link } from "react-router-dom";
import { baseURL } from "../../../utils/constant-variable";

const CheckoutPage = () => {
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [finalCart, setFinalCart] = useState({});


  const getCartList = async () => {
    setLoading(true);
    try {
      const response = await getCartApi();
      setCartList(response?.data?.items || []);
      const finalCartData = await getFinalCartApi(response?.data?.id);
      setFinalCart(finalCartData?.data || {});
    } catch (error) {
      console.log("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCartList();
  }, []);

  console.log("finalCart", finalCart, "Cart", cartList);


  const handleChange = (event) => {
    setAge(event.target.value);
  };


  return (
    <div className="web-wrapper-main">
      <Header />
      <div className="container fb-container">
        <div className="row">
          <div className="col-lg-11 col-md-12 mx-auto">
            <div className="checkout-page">
              <p className="fb-fs-40 fw-bold mt-5 mb-4 checkout-head">Checkout</p>
              <p className="fb-fs-26 fw-bold checkout-save">Saved Address</p>
              <div className="row">
                <div className="col-lg-7 col-md-12">
                  <div className="summary-card rounded-20 px-2 py-3 mt-3">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="order-date d-flex">
                            <img
                              className="img-fluid me-1"
                              src={homeImg}
                              alt="pencil"
                            />
                            <div className="ms-md-3">
                              <div className="d-flex mt-2">
                                <p className="fw-600 fb-fs-18">
                                  Piyush Kanwal | 7464810000
                                </p>
                                <button className="button-yellow ms-3">
                                  Default
                                </button>
                              </div>
                              <p className="mt-2 text-wrap">
                                House no. 78, Ward no. 7, Vats Colony, Linepar,
                                Bahadurgarh, Haryana - 124507
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="summary-card rounded-20 px-2 py-3 mt-3">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="order-date d-flex">
                            <img
                              className="img-fluid me-1"
                              src={homeImg}
                              alt="pencil"
                            />
                            <div className="ms-md-3">
                              <div className="d-flex mt-2">
                                <p className="fw-600 fb-fs-18">
                                  Piyush Kanwal | 7464810000
                                </p>
                              </div>
                              <p className="mt-2 text-wrap">
                                House no. 78, Ward no. 7, Vats Colony, Linepar,
                                Bahadurgarh, Haryana - 124507
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="add-address-button w-100 bg-transparent text-center fw-600">
                    + Add New Address
                  </button>
                  <div className="new-address">
                    <p className="fb-fs-26 fw-bold my-3 checkout-save">Add New Address</p>
                    <p className="text-mid-grey">BASIC DETAILS</p>
                    <form>
                      <div className="container fb-container">
                        <div className="row">
                          <div className="col-md-6 ps-md-0">
                            <TextField
                              fullWidth
                              className="rounded-20 me-5 mt-4"
                              id="outlined-basic"
                              label="Name"
                              variant="outlined"
                            />
                          </div>
                          <div className="col-md-6 pe-md-0">
                            <TextField
                              fullWidth
                              className="rounded-20 me-5 mt-4"
                              id="outlined-basic"
                              label="Phone Number"
                              variant="outlined"
                            />
                          </div>
                          <div className="col-md-12 px-md-0 mb-2">
                            <TextField
                              fullWidth
                              className="rounded-20 me-5 mt-4"
                              id="outlined-basic"
                              label="Email Address"
                              variant="outlined"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                    <p className="text-mid-grey my-4">ADDRESS DETAILS</p>
                    <form>
                      <div className="container fb-container">
                        <div className="row">
                          <div className="col-md-6 ps-md-0 pb-4">
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                State
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                              >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                          <div className="col-md-6 pe-md-0">
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                City
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                              >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                          <div className="col-md-12 px-md-0">
                            <TextField
                              fullWidth
                              className="rounded-20 me-5 mt-4"
                              id="outlined-basic"
                              label="Pincode"
                              variant="outlined"
                            />
                          </div>
                          <div className="col-md-12 px-md-0">
                            <TextField
                              fullWidth
                              className="rounded-20 me-5 mt-4"
                              id="outlined-basic"
                              label="House / Flat /Block No."
                              variant="outlined"
                            />
                          </div>
                          <div className="col-md-12 px-md-0">
                            <TextField
                              fullWidth
                              className="rounded-20 me-5 mt-4"
                              id="outlined-basic"
                              label="Road /Area / Colony"
                              variant="outlined"
                            />
                          </div>
                          <div className="d-flex my-5 ps-md-0">
                            <button className="home-btn d-flex  border-0 bg-transparent">
                              <IoHomeOutline
                                className="ms-lg-2 ms-0"
                                size={"20"}
                                color={"#F26722"}
                              />
                              <p className=" text-orange fw-500 ms-lg-3 ms-2">Home</p>
                            </button>
                            <button className="office-btn d-flex  border-0 bg-transparent ms-4">
                              <HiBuildingOffice2
                                className="ms-lg-2 ms-0"
                                size={"23"}
                                color={"#918E92"}
                              />
                              <p className=" text-mid-grey fw-500 ms-lg-3 ms-2">
                                Office
                              </p>
                            </button>
                          </div>

                          <div className="checkout-btn d-flex mb-5 pb-5 pe-0 align-items-end justify-content-end">
                            <button className="button-primary-reverse me-4">
                              Cancel
                            </button>
                            <button className="button-primary fb-fs-16">
                              Save & Continue
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-5 col-md-12">
                  <div className="my-card-section product-detail-shadow rounded-20 p-4">
                    <p className="fb-fs-26 fw-bold mb-4">My Cart</p>

                    {loading ? (
                      <Loading />
                    ) : cartList.length > 0 ? (
                      cartList.map((item, index) => (
                        <div className="cart-items mt-4" key={index}>
                          <div className="product-item p-1">
                            <img
                              src={baseURL + item?.product?.images[0]?.img_files}
                              className="img-fluid"
                              alt={item?.product?.name}
                            />
                          </div>
                          <div className="product-details w-100 ms-3">
                            <p className="item-name  text-black fw-500 mb-0">
                              {item?.product?.name}
                            </p>
                            <p className="item-weight text-grey mb-0 mt-1">{`${item?.product?.quantity} ${item?.product?.quantity_unit}`}</p>
                            <h5 className="item-amount mt-2 fw-600">{`₹ ${Math.trunc(item?.price)} X ${item?.item_quantity}`}</h5>
                          </div>
                          <div className="product-quantity text-end d-flex align-items-center">
                            <h6 style={{ fontWeight: "800" }}>{`₹${Math.trunc(item?.price) * item?.item_quantity}`}</h6>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4">
                        <h4 className="text-muted mb-4">Your cart is empty!</h4>
                        <Link className="button-primary fs-6" to="/products">
                          Browse Products
                        </Link>
                      </div>
                    )}
                    <div className="cart-items mt-5">
                      <div className="product-details w-100 ms-3">
                        <p className="fw-500 my-2">Sub Total </p>
                        <p className="fw-500 my-2"> Handling fee </p>
                        <p className="fw-500 my-2 text-orange">Delivery fee </p>
                        {/* <p className="fw-500 my-2 text-green">
                          Coupon Discount
                        </p> */}
                      </div>
                      <div className="product-quantity text-end">
                        <p className="fb-fs-18 fw-500 mb-2">{(finalCart.total === undefined) ? '₹ 0' : `₹ ${finalCart.total}`}</p>
                        <p className="fw-500 fb-fs-18 mb-1">{(finalCart.handling_fee === undefined) ? '₹ 0' : `₹ ${finalCart.handling_fee}`}</p>
                        <p className="fw-500 fb-fs-18 mb-1 text-orange ">
                          {(finalCart.delivery_charges === undefined) ? '₹ 0' : `₹ ${finalCart.delivery_charges}`} 
                        </p>
                        {/* <p className="fw-500 fb-fs-18 mb-2 text-green">
                        {(finalCart.total === undefined) ? '₹ 0' : `- ₹ ${finalCart.total}`}
                        </p> */}
                      </div>
                    </div>
                    <div className="cart-items mt-4 border-top mb-2">
                      <div className="product-details w-100 ms-3 pt-4">
                        <h6 className="fw-bolder">Total Amount </h6>
                      </div>
                      <div className="product-quantity text-end pt-4">
                        <h5 style={{ textWrap: "nowrap", fontWeight: "800" }}>
                          {(finalCart.amount_to_pay === undefined) ? '₹ 0' : `₹ ${finalCart.amount_to_pay}`}
                        </h5>
                      </div>
                    </div>
                    <div className="w-100">
                      <button className="button-primary w-100">Pay Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default CheckoutPage;
