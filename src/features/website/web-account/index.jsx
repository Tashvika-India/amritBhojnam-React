import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import { TabPanel, TabView } from "primereact/tabview";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { TfiDownload } from "react-icons/tfi";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import pencilImg from "../../../assets/images/web/account/pencil.png";
import profileBg from "../../../assets/images/web/account/profile-bg.png";
import pp from "../../../assets/images/web/account/profile-picture.png";
import { Button } from "primereact/button";
import tickImg from "../../../assets/images/web/account/tick-image.png";
import milletIcon from "../../../assets/images/web/millet-icon.png";
import emptyOrder from "../../../assets/images/web/empty-order.png";
import emptyAddress from "../../../assets/images/web/empty-address.png";
import homeImg from "../../../assets/images/web/account/home-img.png";
import editButton from "../../../assets/images/web/account/edit-button.png";
import { BiEditAlt } from "react-icons/bi";
import deleteButton from "../../../assets/images/web/account/delete-button.png";
import {
  deleteAddressApi,
  getAddressApi,
  getOrderApi,
  getProfile,
  postAddressApi,
  postSelectAddressApi,
  putAddressApi,
  putProfileApi,
  reOrderApi,
} from "../../../services/adminApiRoutes";
import { Collapse } from "@mui/material";
import { useFormik } from "formik";
import Address from "../../../assets/common-components/website/Address";
import { baseURL } from "../../../utils/constant-variable";
import { Link, useLocation } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Rating } from "primereact/rating";
import ReviewModal from "../../../components/ui/ReviewModal";
import { HiDownload } from "react-icons/hi";
import {
  notifyError,
  notifySuccess,
} from "../../../components/ui/Notification";
import Loading from "../../../components/ui/Loading";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { BsArrowRepeat } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../../redux/slices/cartSlice"; 
const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [editData, setEditData] = useState([null]);
  const [userDetail, setUserDetail] = useState({});
  const [order, setOrder] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [profileEdit, setProfileEdit] = useState(false);
  const location = useLocation();
  const [productId, setProductId] = useState("");
  const [load, setLoad] = useState(2);
  const [filter,setFilter] = useState("");
  const profilePicture = baseURL + userDetail?.pp;

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

    onSubmit: async (values) => {
      editData ? updateAddress(values) : addAddress(values);
    },
  });

  const dispatch = useDispatch();

  const addAddress = async (values) => {
    setLoading(true);
    try {
      const response = await postAddressApi(values);
      const address_id = response?.data?.id;
      if (address_id) {
        await postSelectAddressApi({ address_id });
        getAddressList();
      }
      setLoading(false);
      setOpen(false);
      notifySuccess("Address added Successfully");
      scrollTo(0, 0);
      formik.resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      notifyError(error.response?.data?.error);
    } finally {
      formik.setSubmitting(false);
    }
  };

  const updateAddress = async (values) => {
    try {
      const response = await putAddressApi(editData?.id, values);
      const address_id = response?.data?.id;
      if (address_id) {
        await postSelectAddressApi({ address_id });
        getAddressList();
      }
      setLoading(false);
      scrollTo(0, 0);
      setOpen(false);
      notifySuccess("Address updated Successfully");
      formik.resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      notifyError(error.response?.data?.error);
    } finally {
      formik.setSubmitting(false);
    }
  };

  // Fetch Profile Data
  const getProfileList = async () => {
    setLoading(true);
    try {
      const response = await getProfile();
      setUserDetail(response?.data[0] || {});
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      notifyError(error.response?.data?.error);
    }
  };

  const getOrderList = async () => {
    setLoading(true);
    try { 
      const response = await getOrderApi(1,load,filter);
      setOrder(response?.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching order data", error);
    }
  };

  const handleLoadMore = () => {
    setLoad((pre) => pre + 3);
  };

  const handleReOrderClick = async (order_id) => {
    try {
      await reOrderApi(order_id);
      notifySuccess("Order Added to Cart Successfully");
      dispatch(fetchCart());
    } catch (error) {
      notifyError("Error placing order");
      console.log("Error placing order:", error);
    }
  };

  const getAddressList = async () => {
    setLoading(true);
    try {
      const response = await getAddressApi();
      setAddressList(response?.data || []);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching cart data:", error);
    } finally {
    }
  };

  const handleSelectAddress = async (address_id) => {
    try {
      const response = await postSelectAddressApi({ address_id });
      getAddressList();
    } catch (error) {
      console.log("Error fetching cart data:", error);
    }
  };

  const handleDeleteAddress = async (address_id) => {
    setLoading(true);
    try {
      const response = await deleteAddressApi(address_id);
      getAddressList();
      setLoading(false);
      notifySuccess("Address deleted Successfully");
    } catch (error) {
      notifyError(error.response?.data?.error);
      console.log("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  const profile = useFormik({
    initialValues: {
      pp: null,
      full_name: "",
      email: "",
      gender: "",
      date_of_birth: "0000-00-00",
    },
    validationSchema: Yup.object({
      full_name: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      await updateProfile(values);
      setSubmitting(false);
    },
  });

  const updateProfile = async (values) => {
    const formData = new FormData();
    formData.append("full_name", values.full_name);
    formData.append("email", values.email);
    formData.append("gender", values.gender);
    formData.append("date_of_birth", values.date_of_birth);
    if (values.pp) formData.append("pp", values.pp);
    try {
      setLoading(true);
      const response = await putProfileApi(userDetail.id, formData);
      getProfileList();
      notifySuccess("Profile Data is Updated");
      window.location.reload();
    } catch (error) {
      console.log("Error updating profile:", error?.response?.data?.message);
      notifyError(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewClick = (id, name, image) => {
    setVisible(true);
    setProductId({ id, name, image });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      profile.setFieldValue("pp", file);

      // Generate preview
      const reader = new FileReader();
      // reader.onload = () => {
      //   setProfilePic(reader.result); // Update the profile picture preview
      // };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    getAddressList();
    getProfileList();
  }, []);

  useEffect(() => {
    getOrderList();
  }, [load,filter]);

  useEffect(() => {
    if (userDetail) {
      profile.setValues({
        pp: userDetail.pp || "",
        full_name: userDetail.full_name || "",
        email: userDetail.email || "",
        gender: userDetail.gender || "",
        date_of_birth: userDetail.date_of_birth || "00-00-0000",
      });
    }
  }, [userDetail, profileEdit]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");

    if (tab === "orders") {
      setActiveIndex(1);
    } else if (tab === "addresses") {
      setActiveIndex(2);
    } else {
      setActiveIndex(0);
    }
  }, [location.search]);

  useEffect(() => {
    if (
      userDetail?.full_name === null &&
      userDetail?.email === null &&
      userDetail?.gender === null &&
      userDetail?.date_of_birth === null
    ) {
      setProfileEdit(true);
    }
  }, [userDetail]);

  return (
    <div className="web-wrapper-main">
      <Header />
      <div className="pt-4">
        <div className="container fb-container">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/">
              Home
            </Link>
            <Typography className="text-orange">Profile</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <div className="container fb-container mb-md-5 pb-md-5">
        <div className="row">
          <div className=" col-lg-10 mx-auto">
            <div className="user-profile-img  mt-lg-5 mt-md-5 mt-4">
              {/* <img
                className="img-fluid profile-img profile-foreground-img rounded-top w-100 mt-5"
                src={profileBg}
                alt="pencil"
                style={{ height: "200px" }}
              /> */}
            </div>
            <div className="p-4 pt-0 ">
              <div className="user-profile-detail  position-relative text-start pb-3">
                <div className="text-center rounded-circle  position-relative d-flex align-items-center gap-3">
                  <img
                    className="img-profile avatar-xl rounded-circle img-fluid justify-content-md-center p-2 bg-white"
                    src={userDetail?.pp ? profilePicture : pp}
                    alt="Card image cap"
                  />
                  <div className="image-content mt-4 mt-md-3 pt-md-5 ms-md-3">
                    <h4 className="text-dark-grey fw-bold text-start">
                      {userDetail?.full_name}
                    </h4>
                    <p className="fw-500 text-mid-grey fb-fs-18 text-start">
                      {userDetail?.phone_number === null
                        ? userDetail?.email
                        : userDetail?.phone_number}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex mb-2 gap-2 justify-content-end border-bottom profile-tabs">
                <button
                  className={`border-0 bg-white fw-600 ${activeIndex === 0
                      ? "text-yellow bg-footer-bg border-bottom border-yellow-color"
                      : "text-dark-grey"
                    }`}
                  onClick={() => setActiveIndex(0)}
                  rounded
                  outlined={activeIndex !== 0}
                  label="1"
                >
                  <span className="me-2">
                    <i className="pi pi-user"></i>
                  </span>
                  My Account
                </button>
                <button
                  className={`border-0 bg-white fw-600 ${activeIndex === 1
                      ? "text-yellow bg-footer-bg border-bottom border-yellow-color"
                      : "text-dark-grey"
                    }`}
                  onClick={() => setActiveIndex(1)}
                  rounded
                  outlined={activeIndex !== 1}
                  label="2"
                >
                  <span className="me-2">
                    <i className="pi pi-box"></i>
                  </span>
                  Order History
                </button>
                <button
                  className={`border-0 bg-white fw-600 ${activeIndex === 2
                      ? "text-yellow bg-footer-bg border-bottom border-yellow-color"
                      : "text-dark-grey"
                    }`}
                  onClick={() => setActiveIndex(2)}
                  rounded
                  outlined={activeIndex !== 2}
                  label="3"
                >
                  <span className="me-2">
                    <i className="pi pi-map-marker"></i>
                  </span>
                  Address Book
                </button>
              </div>
              <TabView
                className="custom-tabview"
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
              >
                <TabPanel header="My Account">
                  <div className="account-section mb-md-4 mt-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="fb-fs-26 fw-bold mt-3">My Account</h4>
                      <div className="d-flex">
                        <button
                          className="d-inline-flex align-items-end border-0 bg-transparent"
                          onClick={() => setProfileEdit(true)}
                        >
                          <img
                            className="img-fluid"
                            src={pencilImg}
                            alt="pencil"
                            style={{
                              width: "2rem",
                              aspectRatio: "16/14",
                              objectFit: "scale-down",
                            }}
                          />
                          <p className="fw-500 mt-2">Edit</p>
                        </button>
                      </div>
                    </div>
                    <form onSubmit={profile.handleSubmit}>
                      <div className="container fb-container">
                        <div className="row">
                          <div className="col-md-6">
                            <TextField
                              fullWidth
                              className="rounded-20 me-5 mt-4"
                              id="full_name"
                              label="Name"
                              name="full_name"
                              variant="outlined"
                              value={profile.values.full_name}
                              onChange={profile.handleChange}
                              onBlur={profile.handleBlur}
                              disabled={!profileEdit}
                              error={
                                profile.touched.full_name &&
                                Boolean(profile.errors.full_name)
                              }
                              helperText={
                                profile.touched.full_name &&
                                profile.errors.full_name
                              }
                            />
                          </div>
                          <div className="col-md-6 mb-4">
                            <TextField
                              fullWidth
                              className="rounded-20 me-5 mt-4 mb-3"
                              id="email"
                              label="Email Address"
                              name="email"
                              variant="outlined"
                              value={profile.values.email}
                              onChange={profile.handleChange}
                              onBlur={profile.handleBlur}
                              disabled={!profileEdit}
                              helperText={
                                profile.touched.email && profile.errors.email
                              }
                              error={
                                !!(
                                  profile.touched.email && profile.errors.email
                                )
                              }
                            />
                          </div>
                          <div className="col-md-4 mb-4">
                            <FormControl fullWidth variant="outlined">
                              <InputLabel shrink htmlFor="file-input">
                                Profile Picture
                              </InputLabel>
                              <OutlinedInput
                                id="file-input"
                                type="file"
                                notched
                                disabled={!profileEdit}
                                onChange={handleImageChange}
                                label="Profile Picture"
                                inputProps={{ style: { cursor: "pointer" } }}
                                className="rounded-3"
                              />
                            </FormControl>
                          </div>
                          <div className="col-md-4 mb-4">
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Gender
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="gender"
                                value={profile.values.gender}
                                label="Gender"
                                onChange={profile.handleChange}
                                onBlur={profile.handleBlur}
                                disabled={!profileEdit}
                                error={
                                  profile.touched.gender &&
                                  Boolean(profile.errors.gender)
                                }
                                helperText={
                                  profile.touched.gender &&
                                  profile.errors.gender
                                }
                              >
                                <MenuItem value={""}>Select</MenuItem>
                                <MenuItem value={"Male"}>Male</MenuItem>
                                <MenuItem value={"Female"}>Female</MenuItem>
                                <MenuItem value={"Other"}>Other</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                          <div className="col-md-4 mb-4">
                            <TextField
                              fullWidth
                              className="rounded-20 me-5"
                              id="date_of_birth"
                              label="Date of Birth"
                              name="date_of_birth"
                              variant="outlined"
                              disabled={!profileEdit}
                              type="date"
                              value={profile.values.date_of_birth}
                              onChange={profile.handleChange}
                              onBlur={profile.handleBlur}
                              error={
                                profile.touched.date_of_birth &&
                                Boolean(profile.errors.date_of_birth)
                              }
                              helperText={
                                profile.touched.date_of_birth &&
                                profile.errors.date_of_birth
                              }
                            />
                          </div>
                          {profileEdit && (
                            <div className="col-12 mt-4 text-end d-flex justify-content-end gap-3">
                              <button
                                className="button-red px-5"
                                onClick={() => setProfileEdit(false)}
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="button-primary px-5"
                                disabled={profile.isSubmitting || loading}
                              >
                                {loading ? "Saving..." : "Save"}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </TabPanel>
                <TabPanel header="Order-history">
                  <div className="order-section">
                    <div className="d-flex justify-content-between align-items-center mb-3 mt-lg-3">
                      <h4 className="fb-fs-26 fw-bold my-3">Order History</h4>
                      <FormControl style={{ width: "15%" }}>
                        <InputLabel id="demo-simple-select-label" size="small">Days</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Days"
                          onChange={(e) => setFilter(e.target.value )
                          }
                          size="small">
                          <MenuItem value={""}>Select</MenuItem>
                          <MenuItem value={7}>Last Week</MenuItem>
                          <MenuItem value={30}>Last Month</MenuItem>
                          <MenuItem value={90}>Last 3 Month</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    {loading ? (
                      <Loading />
                    ) : order?.results?.length > 0 ? (
                      order.results.map((item) => (
                        <div
                          className="summary-card rounded-20 mb-4"
                          key={item.id}
                        >
                          <div className="container">
                            <div className="row border-bottom px-2 px-md-3 py-3 align-items-center">
                              <div className="col-md-3">
                                <p>
                                  Order ID:
                                  <span
                                    className="fw-600"
                                    title={item?.display_order_id}
                                  >
                                    &nbsp;&nbsp;
                                    {item?.display_order_id}
                                  </span>
                                </p>
                              </div>
                              <div className="col-md-3">
                                <p>
                                  Order Placed:
                                  <span className="fw-600">
                                    &nbsp;&nbsp;
                                    {new Date(
                                      item?.created_at
                                    ).toLocaleDateString("en-GB")}
                                  </span>
                                </p>
                              </div>
                              <div className="col-6 col-md-3">
                                <p>
                                  Total Amount:
                                  <span className="fw-600">
                                    &nbsp;&nbsp; ₹ {item?.amount_to_pay}
                                  </span>
                                </p>
                              </div>
                              <div className="col-6 col-md-3 d-flex align-items-center justify-content-end gap-3 text-end align-self-end">
                                <button
                                  onClick={() => handleReOrderClick(item?.id)}
                                  className="fw-500 text-center border-0 text-orange bg-custom-btn-bg px-2 py-1 rounded-2 d-flex align-items-center gap-1"
                                >
                                  <BsArrowRepeat size={"1.2rem"} />
                                  Buy Again
                                </button>
                                <button className="fw-500 text-center border-0 text-orange bg-custom-btn-bg d-flex align-items-center py-1 rounded-2 px-2 gap-1">
                                  <HiDownload size={"1.2rem"} />
                                  Invoice
                                </button>
                              </div>
                            </div>
                            {item?.product_details.map((data) => (
                              <div className="border-bottom" key={data?.id}>
                                <div className="row px-2 px-md-3 pt-3 py-md-4">
                                  <div className="col-md-8">
                                    <div className="prod-detail d-flex align-items-center">
                                      <img
                                        className="img-fluid me-4 rounded-4"
                                        style={{
                                          height: "6rem",
                                          width: "6rem",
                                        }}
                                        src={data?.product?.images[0]?.image}
                                        alt="pencil"
                                      />
                                      <div>
                                        <p className="fb-fs-18 fw-600 text-dark-grey">
                                          {data?.product?.name}
                                        </p>
                                        <p className="mt-2">
                                          Qty:
                                          <span className="fw-600">
                                            {data?.item_quantity}
                                          </span>
                                        </p>
                                        <p className="mt-2">
                                          Size:
                                          <span className="fw-600">
                                            {`${data?.product?.quantity}`}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="price-sec text-end text-dark-grey">
                                      <p className="fb-fs-24 fw-bold">
                                        ₹{data?.price}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="row m-md-3">
                                  <div className="col-md-6">
                                    <div className="d-flex mb-2 mb-md-0">
                                      <img
                                        className="img-fluid me-2"
                                        style={{
                                          height: "1.3rem",
                                          width: "1.3rem",
                                          aspectRatio: "1/1",
                                        }}
                                        src={tickImg}
                                        alt="pencil"
                                      />
                                      <p className="text-dark-grey">
                                        Delivered within 5-7 days
                                      </p>
                                    </div>
                                  </div>
                                  <div className="col-md-5 col-xxl-3 ms-auto text-md-end">
                                    <div className="more-option d-flex mb-2 mb-lg-0 justify-content-evenly justify-content-md-between">
                                      <button
                                        onClick={() =>
                                          handleReviewClick(
                                            data?.product?.id,
                                            data?.product?.name,
                                            data?.product?.images[0]?.image
                                          )
                                        }
                                        className="fw-500 text-center border-0 text-dark-grey bg-transparent "
                                      >
                                        Add Review
                                      </button>
                                      <span className="vr"></span>
                                      <Link
                                        to={`/product-detail?product_id=${data?.product?.id}`}
                                        className="fw-600 text-center border-0 bg-transparent text-orange"
                                      >
                                        View Product
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      // Show "No Data Found" design
                      <div className="empty-order text-center">
                        <div className="mt-5">
                          <img
                            className="img-fluid mx-auto mb-4"
                            src={emptyOrder}
                            alt="empty-order"
                          />
                          <h3 className="text-dark-grey fw-600">0 Orders</h3>
                          <p className="text-mid-grey fb-fs-20 mb-3">
                            You haven’t placed any orders yet.
                          </p>
                          <Link to="/products">
                            <button
                              className="success-primary-button mt-4"
                              style={{ paddingInline: "6rem" }}
                            >
                              Order Now
                            </button>
                          </Link>
                        </div>
                      </div>
                    )}

                    {order?.results?.length > 0 && (
                      <div className="d-flex align-items-center justify-content-center">
                        <button
                          className="fw-500 text-center border-0 text-orange bg-transparent success-primary-button"
                          onClick={handleLoadMore}
                        >
                          Load More Orders
                        </button>
                      </div>
                    )}
                  </div>
                </TabPanel>
                <TabPanel header="Address Book">
                  <div className="address-section mt-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="fb-fs-26 fw-bold text-dark-grey my-3">
                        Saved Address
                      </h4>
                      <button
                        type="button"
                        className="d-flex align-items-center border-0 bg-transparent"
                        onClick={() => {
                          setEditData(null);
                          setOpen(!open);
                        }}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                      >
                        {open ? (
                          <>
                            <p className="fw-500">Cancel</p>
                          </>
                        ) : (
                          <>
                            <i className="pi pi-plus text-yellow me-2 mt-md-1"></i>
                            <p className="fw-500">Add New Address</p>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="" hidden={editData}>
                      <Collapse in={open}>
                        <Address
                          formik={formik}
                          setEditData={setEditData}
                          loading={loading}
                          setOpen={setOpen}
                          editData={editData}
                        />
                      </Collapse>
                    </div>
                    <div className="">
                      {addressList.length > 0 ? (
                        addressList.map((item, index) => (
                          <>
                            <div
                              className={`summary-card ${item?.selected ? "active" : ""
                                } rounded-20 px-2 py-3 mt-3 cursor-pointer`}
                              key={index}
                            >
                              <div className="px-md-3">
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="order-date d-flex gap-2">
                                      <img
                                        className={`img-fluid me-1 rounded-4 ${item?.selected ? "shadow" : ""
                                          }`}
                                        src={homeImg}
                                        alt="pencil"
                                      />
                                      <div className="ms-md-3">
                                        <div className="d-flex mt-2 gap-1 align-items-center">
                                          <p className="fw-600 fb-fs-18">
                                            {item?.ads_name} | {item?.ads_phone}
                                          </p>
                                          {item?.selected && (
                                            <button className="button-yellow default-btn ms-md-3 fw-normal lh-base align-self-center">
                                              Default
                                            </button>
                                          )}
                                        </div>
                                        <p className="mt-2 text-wrap">
                                          {item?.house_flat_block_no},
                                          {item?.road_area_colony}, {item?.city}
                                          ,{item?.state} - {item?.pincode}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-1"></div>
                                  <div className="col-md-6">
                                    <div className="d-flex mt-2 gap-4">
                                      <button
                                        className="border-0 bg-transparent"
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          setEditData(item);
                                        }}
                                      >
                                        <div className="d-flex align-items-center gap-1">
                                        <BiEditAlt size={20} color="#428DC5" />
                                        <p className="fw-500 text-dark-grey">Edit</p>
                                        </div>
                                      </button>
                                      <button
                                        className="border-0 bg-transparent"
                                        onClick={() =>
                                          handleDeleteAddress(item?.id)
                                        }
                                      >
                                        <div className="d-flex align-items-center gap-1">
                                        <RiDeleteBin6Line color="#E70900" size={17} />
                                        <p className="fw-500 text-dark-grey">Delete</p>
                                        </div>
                                      </button>
                                    </div>
                                  </div>
                                  <div className="col-md-5 text-end">
                                    <p
                                      className="text-end"
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        handleSelectAddress(item?.id);
                                      }}
                                      hidden={item?.selected}
                                    >
                                      Set as Default
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Collapse in={editData?.id === item?.id}>
                              <Address
                                formik={formik}
                                loading={loading}
                                setEditData={setEditData}
                                setOpen={setOpen}
                                editData={editData}
                              />
                            </Collapse>
                          </>
                        ))
                      ) : (
                        <div className="empty-address text-center">
                          <div className="mt-5">
                            <img
                              className="img-fluid mx-auto mb-4"
                              src={emptyAddress}
                              alt="empty-address"
                            />
                            <h3 className="text-dark-grey fw-600">No Address Saved</h3>
                            <p className="text-mid-grey fb-fs-20 mb-3">
                              No address saved. Add a new address to proceed.
                            </p>

                            <button
                              className="success-primary-button mt-4"
                              onClick={() => {
                                setEditData(null);
                                setOpen(!open);
                              }}
                              style={{ paddingInline: "6rem" }}
                            >
                              Add Address
                            </button>

                          </div>
                        </div>
                      )}
                    </div>
                  </div>


                </TabPanel>
              </TabView>
            </div>
          </div>
        </div>
      </div>
      <ReviewModal visible={visible} setVisible={setVisible} data={productId} />
      <Footer />
    </div>
  );
};
export default UserProfile;
