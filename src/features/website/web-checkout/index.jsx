import * as Yup from "yup";
import React, { useEffect, useRef, useState } from "react";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import homeImg from "../../../assets/images/web/account/home-img.png"; 
import { 
  Collapse, 
} from "@mui/material"; 
import { getAddressApi, getCartApi, getFinalCartApi, getProfile, getProfileApi, postAddressApi, postPayNowApi, postSelectAddressApi } from "../../../services/adminApiRoutes";
import Loading from "../../../components/ui/Loading";
import { Link } from "react-router-dom";
import { baseURL } from "../../../utils/constant-variable";
import { useFormik } from "formik";
import Address from "../../../assets/common-components/website/Address";
import MobileLogin from "../../../components/ui/MobileLogin";


const CheckoutPage = () => {

  const [loading, setLoading] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [finalCart, setFinalCart] = useState({});
  const [open, setOpen] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [showWebLogin, setShowWebLogin] = useState(false);
  const toggleWebLogin = () => setShowWebLogin((prev) => !prev);

  const accessToken = localStorage.getItem("access") || localStorage.getItem("refresh");

  const login = accessToken;

  const getCartList = async () => {
    try {
      const response = await getCartApi();
      setCartList(response?.data?.items || []);
      const finalCartData = await getFinalCartApi(response?.data?.id);
      setFinalCart(finalCartData?.data || {});
    } catch (error) {
      console.log("Error fetching cart data:", error);
    } finally {
    }
  };

  const getAddressList = async () => {
    try {
      const response = await getAddressApi();
      setAddressList(response?.data || []);

    } catch (error) {
      console.log("Error fetching cart data:", error);
    } finally {
    }
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };


  const handlePayNow = async (amount, userId, productinfo, surl, furl) => {
    setLoading(true);

    try {
      // Step 1: Fetch User Profile
      const response = await getProfileApi(userId);
      const user = response?.data;

      if (!user) {
        throw new Error("User profile not found");
      }

      // Step 2: Prepare Payment Details
    const payDetails = {
        amount: 1,
        firstname: user.full_name || "N/A",
        email: user.email || "N/A",
        phone: user.phone || "N/A",
        productinfo,
        surl: `https://dev-env.amritbhojanam.com/api/accounts/payu/payment_success_web/`, 
        furl: `https://dev-env.amritbhojanam.com/api/accounts/payu/payment_failed_web/`,  
      }; 

      const data = await postPayNowApi(payDetails);
      const paymentResponse = data?.data; 
      
      if (!paymentResponse?.payment_url || !paymentResponse?.form_data) {
        throw new Error("Invalid payment response");
      }

      const { payment_url, form_data } = paymentResponse;

      const form = document.createElement("form");
      form.method = "POST";
      form.action = payment_url;

      Object.keys(form_data).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = form_data[key];
        form.appendChild(input); 
      });

      console.log(payment_url,form_data);
      document.body.appendChild(form); 
      form.submit();
    } catch (error) {
      console.error("Error during payment:", error);
      alert(`Payment failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


  const formik = useFormik({
    initialValues: {
      house_flat_block_no: "",
      road_area_colony: "",
      city: "",
      state: "",
      pincode: "",
      save_as: "home", // Default value
    },
    validationSchema: Yup.object({
      house_flat_block_no: Yup.string().required("Required"),
      road_area_colony: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      pincode: Yup.string()
        .matches(/^\d{6}$/, "Pincode must be exactly 6 digits")
        .required("Required"),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setLoading(true);
      try {
        const response = await postAddressApi(values);
        const address_id = response?.data?.id;
        await postSelectAddressApi({ address_id });
        getAddressList();
        setLoading(false);
        setOpen(false);
        resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleSelectAddress = async (address_id) => {
    try {
      const response = await postSelectAddressApi({ address_id });
      getAddressList();
    } catch (error) {
      console.log("Error fetching cart data:", error);
    }
  }

  useEffect(() => {
    getAddressList();
    getCartList();
  }, []);


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
                  {loading ? (
                    <Loading />
                  ) : addressList.length > 0 ? (
                    addressList.map((item, index) => (
                      <div className={`summary-card ${item?.selected ? 'active' : ''} rounded-20 px-2 py-3 mt-3 cursor-pointer`} key={index} onClick={() => handleSelectAddress(item?.id)}>
                        <div className="container">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="order-date d-flex">
                                <img
                                  className={`img-fluid me-1 rounded-4 ${item?.selected ? 'shadow' : ''}`}
                                  src={homeImg}
                                  alt="pencil"
                                />
                                <div className="ms-md-3">
                                  <div className="d-flex mt-2">
                                    <p className="fw-600 fb-fs-18">
                                      {item?.user_detail?.full_name} | {item?.user_detail?.phone_number}
                                    </p>
                                    {item?.selected && (
                                      <button className="button-yellow ms-3">
                                        Default
                                      </button>
                                    )}
                                  </div>
                                  <p className="mt-2 text-wrap">
                                    {item?.house_flat_block_no}, {item?.road_area_colony}, {item?.city}, {item?.state} - {item?.pincode}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <h6 className="text-muted mb-4">Your Address is empty!</h6>
                    </div>
                  )}

                  <button className="add-address-button w-100 bg-transparent text-center fw-600" onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}>
                    + Add New Address
                  </button>
                  <Collapse in={open}>
                    <Address
                      formik={formik}
                      loading={loading}
                      setOpen={setOpen}
                    />
                  </Collapse >
                </div>
                <div className="col-lg-5 col-md-12">
                  <div className="my-card-section product-detail-shadow rounded-20 p-4 mb-4 sticky-top">
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
                            <small className="item-weight text-grey mb-0 mt-1">{`${item?.product?.quantity} ${item?.product?.quantity_unit}`}</small>
                            <h6 className="item-amount mt-2 fw-600">{`₹ ${Math.trunc(item?.price)} X ${item?.item_quantity}`}</h6>
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
                      <ul className="list-unstyled w-100">
                        <li className="d-flex justify-content-between my-2">
                          <span className="fw-500">Sub Total</span>
                          <span className="fb-fs-18 fw-500">{finalCart.total === undefined ? '₹ 0' : `₹ ${finalCart.total}`}</span>
                        </li>
                        <li className="d-flex justify-content-between my-2">
                          <span className="fw-500">Handling fee</span>
                          <span className="fb-fs-18 fw-500">{finalCart.handling_fee === undefined ? '₹ 0' : `₹ ${finalCart.handling_fee}`}</span>
                        </li>
                        <li className="d-flex justify-content-between my-2">
                          <span className="fw-500 text-orange">Delivery fee</span>
                          <span className="fb-fs-18 fw-500 text-orange">
                            {finalCart.delivery_charges === undefined ? '₹ 0' : `₹ ${finalCart.delivery_charges}`}
                          </span>
                        </li>
                        {/* <li className="d-flex justify-content-between my-2">
                          <span className="fw-500 text-green">Coupon Discount</span>
                          <span className="fb-fs-18 fw-500 text-green">
                            {finalCart.discount === undefined ? '₹ 0' : `- ₹ ${finalCart.discount}`}
                          </span>
                        </li> */}
                      </ul>
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
                    {(cartList.length > 0) ? (
                      <>
                        <div className="w-100">
                          {
                            (login) ?
                              <button className="button-primary w-100" onClick={() => handlePayNow(finalCart.amount_to_pay, finalCart?.user_id, finalCart?.status)}>Pay Now</button>
                              :
                              <button className="button-primary w-100" onClick={toggleWebLogin}>
                                Login
                              </button>
                          }
                          <MobileLogin
                            otpShow={showWebLogin}
                            onOtpClose={toggleWebLogin}
                            align="end"
                          />
                        </div>
                      </>
                    )
                      : ''}
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
