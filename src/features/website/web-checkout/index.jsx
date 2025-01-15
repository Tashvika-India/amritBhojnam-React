import * as Yup from "yup";
import React, { useEffect, useRef, useState } from "react";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import homeImg from "../../../assets/images/web/account/home-img.png";
import { Collapse } from "@mui/material";
import {
  getAddressApi,
  getCartApi,
  getFinalCartApi,
  getProfile,
  getProfileApi,
  postAddressApi,
  postPayNowApi,
  postSelectAddressApi,
  putAddressApi,
} from "../../../services/adminApiRoutes";
import paymentFailed from "../../../assets/images/web/payment-failed.png";
import Loading from "../../../components/ui/Loading";
import Link from '@mui/material/Link';
import { baseURL } from "../../../utils/constant-variable";
import { useFormik } from "formik";
import Address from "../../../assets/common-components/website/Address";
import MobileLogin from "../../../components/ui/MobileLogin";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { notifyError, notifySuccess } from "../../../components/ui/Notification";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { fetchFinalCart } from "../../../redux/slices/cartSlice";


const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [finalCartNew, setFinalCart] = useState({});
  const [open, setOpen] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [showWebLogin, setShowWebLogin] = useState(false);
  const [visible, setVisible] = useState(false);
  const toggleWebLogin = () => setShowWebLogin((prev) => !prev);
  const dispatch = useDispatch();
  const accessToken =
    localStorage.getItem("access") || localStorage.getItem("refresh");

  const login = accessToken;

  const { cartItems, finalCart, cartId } = useSelector((state) => state.cart);
 
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

  const handlePayNow = async (amount, userId, cartId, delivery_charges, delivery_date, delivery_days, coupon_code, surl, furl) => {
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
        firstname: user?.full_name || "N/A",
        email: user?.email || "N/A",
        phone: user?.phone || "N/A",
        coupon_code: coupon_code,
        shipping_charge: delivery_charges,
        delivery_date: delivery_date,
        delivery_days: delivery_days,
        productinfo: cartId,
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

      console.log(payment_url, form_data);
      document.body.appendChild(form);
      form.submit();
      notifySuccess("Payment Initiated Successfully");
    } catch (error) {
      console.error("Error during payment:", error);
      notifyError(`Payment failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      ads_name: "",
      ads_phone: "",
      ads_email: "",
      house_flat_block_no: "",
      road_area_colony: "",
      city: "",
      state: "",
      pincode: "",
      save_as: "",
    },
    validationSchema: Yup.object({
      ads_name: Yup.string().required("Name is required"),
      ads_phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
        .required("Phone number is required"),
      ads_email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      house_flat_block_no: Yup.string().required(
        "House/Flat/Block No is required"
      ),
      road_area_colony: Yup.string().required("Road/Area/Colony is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      pincode: Yup.string()
        .matches(/^\d{6}$/, "Pincode must be exactly 6 digits")
        .required("Pincode is required"),
      save_as: Yup.string().required("Save as field is required"),
    }),
    onSubmit: (values) => {
      addAddress(values);
    },
  });

  const addAddress = async (values) => {
    try {
      const response = await postAddressApi(values);
      const address_id = response?.data?.id;
      if (address_id) {
        await postSelectAddressApi({ address_id });
        getAddressList();
        dispatch(fetchFinalCart(cartId));
        notifySuccess("Address added Successfully");
      }
      setLoading(false);
      setOpen(false);
      scrollTo(0, 0);
      formik.resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      notifyError("Error submitting form:", error);
    } finally {
      formik.setSubmitting(false);
    }
  };

  const handleSelectAddress = async (address_id) => {
    try {
      await postSelectAddressApi({ address_id });
      console.log("Address Selected Successfully");
      scrollTo(0, 0);
      getAddressList();
      dispatch(fetchFinalCart(cartId));
      notifySuccess("Address Selected Successfully");
    } catch (error) {
      console.log("Error fetching cart data:", error);
      notifyError("Something went wrong, please try again.");
    }
  };

  useEffect(() => {
    getAddressList(); 
  }, []);

  return (
    <div className="web-wrapper-main">
      <Header />
      <div className="pt-5">
        <div className="container fb-container">
          <Breadcrumbs aria-label="breadcrumb">
            <Typography>Home</Typography>
            <Typography>Cart</Typography>
            <Typography className="text-orange">Checkout</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <div className="container fb-container">
        <div className="row">
          <div className="col-lg-11 col-md-12 mx-auto">
            <div className="checkout-page">
              <p className="fb-fs-40 fw-bold mt-5 mb-4 checkout-head">
                Checkout
              </p>
              <p className="fb-fs-26 fw-bold checkout-save">Saved Address</p>
              <div className="row">
                <div className="col-lg-7 col-md-12">
                  {loading ? (
                    <Loading />
                  ) : addressList.length > 0 ? (
                    addressList.map((item, index) => (
                      <div
                        className={`summary-card ${item?.selected ? "active" : ""
                          } rounded-20 px-2 py-3 mt-3 cursor-pointer`}
                        key={index}
                        onClick={() => handleSelectAddress(item?.id)}>
                        <div className="container">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="order-date d-flex">
                                <img
                                  className={`img-fluid me-1 rounded-4 ${item?.selected ? "shadow" : ""
                                    }`}
                                  src={homeImg}
                                  alt="pencil"
                                />
                                <div className="ms-md-3">
                                  <div className="d-flex mt-2">
                                    <p className="fw-600 fb-fs-18">
                                      {item?.ads_name} |&nbsp;
                                      {item?.ads_phone}
                                    </p>
                                    {item?.selected && (
                                      <button className="button-yellow ms-3">
                                        Default
                                      </button>
                                    )}
                                  </div>
                                  <p className="mt-2 text-wrap">
                                    {item?.house_flat_block_no},
                                    {item?.road_area_colony}, {item?.city},
                                    {item?.state} - {item?.pincode}
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
                      <h6 className="text-muted mb-4">
                        Your Address is empty!
                      </h6>
                    </div>
                  )}

                  <button
                    className="add-address-button w-100 bg-transparent text-center fw-600"
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                  >
                    + Add New Address
                  </button>
                  <Collapse in={open}>
                    <Address
                      formik={formik}
                      loading={loading}
                      setOpen={setOpen}
                    />
                  </Collapse>
                </div>
                <div className="col-lg-5 col-md-12">
                  <div className="my-card-section product-detail-shadow rounded-20 p-4 mb-4 sticky-top " style={{ zIndex: 10 }}>
                    <p className="fb-fs-26 fw-bold mb-4">My Cart</p>

                    {loading ? (
                      <Loading />
                    ) : cartItems?.length > 0 ? (
                      cartItems?.map((item, index) => (
                        <>
                          <div className="cart-items mt-4" key={index}>
                            <div className="product-item p-1">
                              <img
                                src={item?.product?.images[0]?.image
                                }
                                className="img-fluid"
                                alt={item?.product?.name}
                              />
                            </div>
                            <div className="product-details w-100 ms-3">
                              <p className="item-name  text-black fw-500 mb-0">
                                {item?.product?.name}
                              </p>
                              <small className="item-weight text-grey mb-0 mt-1">{`${item?.product?.quantity}`}</small>
                              <h6 className="item-amount mt-2 fw-600">{`₹ ${Math.trunc(
                                item?.price
                              )} X ${item?.item_quantity}`}</h6>
                            </div>
                            <div className="product-quantity text-end d-flex align-items-center">
                              <h6 style={{ fontWeight: "800" }}>{`₹${Math.trunc(item?.price) * item?.item_quantity
                                }`}</h6>
                            </div>
                          </div>
                        </>
                      ))
                    ) : (
                      <div className="text-center py-4">
                        <h5 className="text-muted pb-4">Your cart is empty!</h5>
                        <Link className="button-primary fs-6 d-inline-block text-decoration-none" href="/products">
                          Browse Products
                        </Link>
                      </div>
                    )}
                    {/* <div className="mt-5">
                      <div
                        className="border-gray border-raidus-10 mt-2 input-box"
                        style={{ width: "100%" }}
                      >
                        <div className="input-group mb-2 mt-2">
                          <input
                            type="text"
                            className="form-control border-0 box-shadow-0 fw-600"
                            placeholder="Apply Coupon"
                            aria-describedby="basic-addon2"
                          />
                          <button className="input-group-text border-0 text-orange fw-bold bg-transparent border-start border-2 ps-4 me-3">
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>  */}
                    <div className="cart-items mt-2">
                      <ul className="list-unstyled w-100">
                        <li className="d-flex justify-content-between my-2">
                          <span className="fw-500">Sub Total</span>
                          <span className="fb-fs-18 fw-500">
                            {finalCart?.total === undefined
                              ? "₹ 0"
                              : `₹ ${finalCart?.total}`}
                          </span>
                        </li>
                        <li className="d-flex justify-content-between my-2">
                          <span className="fw-500">Handling fee</span>
                          <span className="fb-fs-18 fw-500">
                            {finalCart?.handling_fee === undefined
                              ? "₹ 0"
                              : `₹ ${finalCart?.handling_fee}`}
                          </span>
                        </li>
                        <li className="d-flex justify-content-between my-2">
                          <span className="fw-500 text-orange">
                            Delivery fee
                          </span>
                          <span className="fb-fs-18 fw-500 text-orange">
                            {finalCart?.delivery_charges === undefined
                              ? "₹ 0"
                              : `₹ ${finalCart?.delivery_charges}`}
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
                          {finalCart?.amount_to_pay === undefined
                            ? "₹ 0"
                            : `₹ ${finalCart?.amount_to_pay}`}
                        </h5>
                      </div>
                    </div>
                    {cartItems.length > 0 && addressList.length > 0 ? (
                      <>
                        <div className="w-100">
                          {login ? (
                            <button
                              className="button-primary w-100"
                              onClick={() =>
                                handlePayNow(
                                  finalCart?.amount_to_pay,
                                  finalCart?.user_id,
                                  finalCart?.id,
                                  finalCart?.delivery_charges,
                                  finalCart?.delivery_date,
                                  finalCart?.delivery_days,
                                  finalCart?.coupon_data?.coupon_code
                                )
                              }>
                              Proceed to Pay
                            </button>
                          ) : (
                            <button
                              className="button-primary w-100"
                              onClick={toggleWebLogin}
                            >
                              Login
                            </button>
                          )}
                          <MobileLogin
                            otpShow={showWebLogin}
                            onOtpClose={toggleWebLogin}
                            align="end"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-100 text-center">
                          {cartItems.length > 0 ? (
                            <h6 className="text-danger text-uppercase fs-6"> 
                              Please Add Your address
                            </h6>
                          ) : (
                            <h6 className="text-danger text-uppercase fs-6"> 
                              Please Add Product in Cart
                            </h6>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* modal for payment failed */}

        {/* <Button
          label="Show"
          icon="pi pi-external-link"
          onClick={() => setVisible(true)}
        /> */}
        <Dialog
          visible={visible}
          style={{ width: "35vw", borderRadius: "20px" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
        >
          <div className="text-center">
            <img src={paymentFailed} alt="pencil" className="mx-auto" />
            <p
              className="fw-600 text-bright-red mt-3"
              style={{ fontSize: "xx-large" }}
            >
              Payment Failed
            </p>
            <p className="fb-fs-24 px-5 py-2">
              Your payment could not be processed at this time. Please try
              again, use a different payment method, or contact customer support
              if the issue persists.
            </p>
            <div className="d-flex gap-3 text-center justify-content-center my-4">
              <button className="bright-red-button">Try Again</button>
              <button className="bright-red-button-reverse">
                Back to home
              </button>
            </div>
          </div>
        </Dialog>
      </div>
      <Footer />
    </div>
  );
};
export default CheckoutPage;
