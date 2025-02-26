import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import { TabPanel, TabView } from "primereact/tabview";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import pencilImg from "../../../assets/images/web/account/pencil.png"; 
import otherImg from "../../../assets/images/web/account/other.png";
import pp from "../../../assets/images/web/account/profile-picture.png";
import tickImg from "../../../assets/images/web/account/tick-image.png";
import emptyOrder from "../../../assets/images/web/empty-order.png";
import emptyAddress from "../../../assets/images/web/empty-address.png";
import homeImg from "../../../assets/images/web/account/home-img.png"; 
import { BiEditAlt } from "react-icons/bi";
import { FaCamera } from "react-icons/fa";
import {
  deleteAddressApi,
  getAddressApi,
  getAmritCoinHistoryApi,
  getOrderApi,
  getOrderInvoiceApi,
  getProfile,
  patchProfileApi,
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
import { RiDeleteBin6Line } from "react-icons/ri";
import ReviewModal from "../../../components/ui/ReviewModal";
import {
  notifyError,
  notifySuccess,
} from "../../../components/ui/Notification";
import Loading from "../../../components/ui/Loading";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useDispatch } from "react-redux";
import { fetchCart } from "../../../redux/slices/cartSlice"; 
import AddressDeleteModal from "../../../components/ui/AddressDeleteModal";
import OrderListComponent from "./components/OrderListComponent";
import BackdropLoader from "../../../components/ui/BackdropLoader";
import ProfileBanner from "../../../components/ui/ProfileBanner";
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
  const [load, setLoad] = useState(10);
  const [filter, setFilter] = useState("");
  const [coins , setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [profilePictureImg, setProfilePictureImg] = useState(userDetail?.pp);


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
      formik.resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      notifyError(error.response?.data?.error);
    } finally {
      formik.setSubmitting(false);
    }
  };

  const updateAddress = async (values) => {
    setLoading(true);
    try {
      const response = await putAddressApi(editData?.id, values);
      const address_id = response?.data?.id;
      if (address_id) {
        await postSelectAddressApi({ address_id });
        getAddressList();
      }
      setLoading(false);
      setOpen(false);
      setEditData(null);
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
      const response = await getOrderApi(1, load, filter);
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
      scrollTo(0, 0);
    } catch (error) {
      console.log("Error fetching cart data:", error);
    } finally {
    }
  };

  const handleSelectAddress = async (address_id) => {
    try {
      await postSelectAddressApi({ address_id });
      getAddressList();
      notifySuccess("Address Selected Successfully");
    } catch (error) {
      console.log("Error fetching cart data:", error);
    }
  };

  const openModal = (address_id) => {
    setSelectedAddressId(address_id);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedAddressId(null);
    setIsModalVisible(false);
  };

  const handleDeleteAddress = async () => {
    setLoading(true);
    try {
      const response = await deleteAddressApi(selectedAddressId);
      await getAddressList();
      notifySuccess("Address deleted Successfully");
    } catch (error) {
      notifyError(error.response?.data?.error || "Failed to delete address");
      console.error("Error deleting address:", error);
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  const profile = useFormik({
    initialValues: {
      pp: null,
      full_name: "",
      phone_number: "",
      email: "",
      gender: "",
      date_of_birth: "0000-00-00",
    },
    validationSchema: Yup.object({
      full_name: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      date_of_birth: Yup.date()
        .nullable() // Allow null values
        .max(new Date(), "Date of birth cannot be in the future")
        .test("age", "You must be at least 18 years old", (value) => {
          if (!value) return false; // If no value, validation fails.
          const today = new Date();
          const birthDate = new Date(value);
          const age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          const dayDiff = today.getDate() - birthDate.getDate();
          // Adjust age if the current date is before the birth date in the same year.
          return (
            age > 18 ||
            (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))
          );
        }),
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
    formData.append("phone_number", values.phone_number);
    formData.append("gender", values.gender);
    formData.append("date_of_birth", values.date_of_birth);
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

  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("pp", file);
        const response = await patchProfileApi(userDetail.id, formData);

        if (response.status === 200) {
          setProfilePictureImg(URL.createObjectURL(file));
          notifySuccess("Profile Picture Updated Successfully");
        } else {
          console.error("Failed to update profile picture:", response);
          notifyError("Failed to update profile picture");
        }
      } catch (error) {
        console.error("Error updating profile picture:", error);
        notifyError("Failed to update profile picture");
      }
    }
  };

  const HandleDaysChanges = (value) => {
    setFilter(value);
    setLoad("");
  };

  const handleReviewClick = (id, name, image) => {
    setVisible(true);
    setProductId({ id, name, image });
  };

  const handleInvoiceClick = async (id) => {
    setIsLoading(true);
    try {
      const response = await getOrderInvoiceApi({ shipment_order_id: id });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      setIsLoading(false);
      notifySuccess("Invoice Downloaded Successfully");
    } catch (error) {
      console.error("Error fetching invoice:", error);
      notifyError("Failed to fetch invoice");
      setIsLoading(false);
    }
  };
  const getCoinList = async () => { 
      try {
        const response = await getAmritCoinHistoryApi();  
        setCoins(response?.data);
      } catch (error) {
        console.log(error); 
      }
    }
  

  useEffect(() => {
    getAddressList();
    getProfileList();
    getCoinList();
  }, []);

  useEffect(() => {
    getOrderList();
  }, [load, filter]);

  useEffect(() => {
    if (userDetail) {
      profile.setValues({
        pp: userDetail.pp || "",
        full_name: userDetail.full_name || "",
        email: userDetail.email || "",
        phone_number: userDetail.phone_number || "",
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
          <div className="col-lg-10 mx-auto">
            <ProfileBanner coins={coins}/>
            <div className="p-md-4 p-lg-4 pt-0 ">
              <div className="user-profile-detail  position-relative text-start pb-3">
                <div className="text-center rounded-circle  position-relative d-flex align-items-center gap-lg-3 gap-md-3 gap-2">
                  <div className="position-relative">
                    <img
                      className="img-profile avatar-xl rounded-circle img-fluid justify-content-md-center p-2 bg-white"
                      src={
                        profilePictureImg
                          ? profilePictureImg
                          : userDetail?.pp
                          ? baseURL + userDetail.pp
                          : pp
                      }
                      alt="Profile"
                    />
                    <input
                      className="d-none"
                      type="file"
                      id="customFile"
                      onChange={handleProfileImageChange}
                      accept="image/*"
                    />
                     <label
                      htmlFor="customFile"
                      className="rounded-circle bg-orange  profile-pic-edit"> 
                      <FaCamera color="white" />
                    </label>
                  </div>
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
                  className={`border-0 bg-white fw-600 ${
                    activeIndex === 0
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
                  className={`border-0 bg-white fw-600 ${
                    activeIndex === 1
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
                  className={`border-0 bg-white fw-600 ${
                    activeIndex === 2
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
                      <h4 className="fb-fs-26 fw-bold ">My Account</h4>
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
                          <p className="fw-500 mt-2 text-black">Edit</p>
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
                              disabled={true}
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
                          {/* <div className="col-md-4 mb-4">
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
                          </div> */}
                          <div className="col-md-4 mb-4">
                            <TextField
                              fullWidth
                              className="rounded-20 me-5"
                              id="phone_number"
                              label="Phone Number"
                              name="phone_number"
                              variant="outlined"
                              value={profile.values.phone_number}
                              onChange={profile.handleChange}
                              onBlur={profile.handleBlur}
                              disabled={!profileEdit}
                              error={
                                profile.touched.phone_number &&
                                Boolean(profile.errors.phone_number)
                              }
                              helperText={
                                profile.touched.phone_number &&
                                profile.errors.phone_number
                              }
                            />
                          </div>
                          <div className="col-md-4 mb-4">
                            <FormControl fullWidth >
                              <InputLabel id="demo-simple-select-label">
                                Gender
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="gender"
                                value={profile.values.gender}
                                label="Gender"
                                style={{borderRadius: "10px"}}
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
                    <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                      <h4 className="fb-fs-26 fw-bold mb-3">Order History</h4>
                      <FormControl style={{ width: "9rem" }}>
                        <InputLabel id="demo-simple-select-label" size="small">
                          Filter Orders
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Filter Orders"
                          onChange={(e) => HandleDaysChanges(e.target.value)}
                          size="small"
                        >
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
                      isLoading ? (
                        <BackdropLoader open={isLoading} />
                      ) : (
                        <OrderListComponent
                          order={order}
                          handleReOrderClick={handleReOrderClick}
                          handleInvoiceClick={handleInvoiceClick}
                          handleReviewClick={handleReviewClick}
                          tickImg={tickImg}
                        />
                      )
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
                              className="success-primary-button mt-lg-4 mt-md-4"
                              style={{ paddingInline: "6rem" }}
                            >
                              Order Now
                            </button>
                          </Link>
                        </div>
                      </div>
                    )}
                    {order.results?.length !== order.count && (
                      <div className="d-flex align-items-center justify-content-center mb-3">
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
                    <div className="d-flex justify-content-between align-items-center mt-3 ">
                      <h4 className="fb-fs-26 fw-bold text-dark-grey mb-3">
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
                              className={`summary-card ${
                                item?.selected ? "active" : ""
                              } rounded-20 px-2 py-3 mt-3 cursor-pointer`}
                              key={item?.id}
                            >
                              <div className="px-md-3">
                                <div className="row">
                                  <div className="col-md-12 d-flex justify-content-between">
                                    <div className="order-date d-flex gap-2">
                                      <img
                                        className={`img-fluid me-1 rounded-4 align-self-start ${
                                          item?.selected ? "shadow" : ""
                                        }`}
                                        src={
                                          item?.save_as === "Home"
                                            ? homeImg
                                            : otherImg
                                        }
                                        alt="pencil"
                                      />
                                      <div className="ms-md-3">
                                        <div className="d-flex mt-2 gap-1 align-items-center">
                                          <p className="fw-600">
                                            {item?.ads_name} | {item?.ads_phone}
                                          </p>
                                          {item?.selected && (
                                            <button className="button-yellow default-btn ms-md-3 fw-normal lh-base align-self-center">
                                              Default
                                            </button>
                                          )}
                                        </div>
                                        <p className="mt-2 text-wrap d-none d-md-block">
                                          {item?.house_flat_block_no},
                                          {item?.road_area_colony}, {item?.city}
                                          ,{item?.state} - {item?.pincode}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="">
                                      <button
                                        className="text-end button-set-default"
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          handleSelectAddress(item?.id);
                                        }}
                                        hidden={item?.selected}
                                      >
                                        Set&nbsp;as&nbsp;Default
                                      </button>
                                    </div>
                                  </div>
                                  <div className="d-block d-md-none">
                                    <p className="mt-2 text-wrap">
                                      {item?.house_flat_block_no},
                                      {item?.road_area_colony}, {item?.city},
                                      {item?.state} - {item?.pincode}
                                    </p>
                                  </div>
                                  <div className="col-md-1"></div>
                                  <div className="col-md-6">
                                    <div className="d-flex mt-2 gap-2 gap-md-3 ps-md-1 ">
                                      <button
                                        className="border-0 bg-transparent"
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          setEditData(item);
                                        }}
                                      >
                                        <div className="d-flex align-items-center gap-1">
                                          <BiEditAlt
                                            size={20}
                                            color="#428DC5"
                                          />
                                          <p className="fw-500 text-dark-grey">
                                            Edit
                                          </p>
                                        </div>
                                      </button>
                                      <button
                                        className="border-0 bg-transparent"
                                        key={item.id}
                                        onClick={() => openModal(item.id)}
                                      >
                                        <div className="d-flex align-items-center gap-1">
                                          <RiDeleteBin6Line
                                            color="#E70900"
                                            size={17}
                                          />
                                          <p className="fw-500 text-dark-grey">
                                            Delete
                                          </p>
                                        </div>
                                      </button>
                                      <AddressDeleteModal
                                        visible={isModalVisible}
                                        onHide={closeModal}
                                        onDelete={handleDeleteAddress}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="pt-3 px-3">
                                <Collapse in={editData?.id === item?.id}>
                                  <Address
                                    formik={formik}
                                    loading={loading}
                                    setEditData={setEditData}
                                    setOpen={setOpen}
                                    editData={editData}
                                  />
                                </Collapse>
                              </div>
                            </div>
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
                            <h3 className="text-dark-grey fw-600">
                              No Address Saved
                            </h3>
                            <p className="text-mid-grey fb-fs-20 mb-3">
                              No address saved. Add a new address to proceed.
                            </p>
                            <button
                              className="success-primary-button mt-lg-4 mt-md-4"
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
