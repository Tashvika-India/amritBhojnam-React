import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import { TabPanel, TabView } from "primereact/tabview";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import pencilImg from "../../../assets/images/web/account/pencil.png";
import profileBg from "../../../assets/images/web/account/profile-bg.png";
import profilePic from "../../../assets/images/web/account/profile-picture.png";
import tickImg from "../../../assets/images/web/account/tick-image.png";
import homeImg from "../../../assets/images/web/account/home-img.png";
import editButton from "../../../assets/images/web/account/edit-button.png";
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
} from "../../../services/adminApiRoutes";
import { Collapse } from "@mui/material";
import { useFormik } from "formik";
import Address from "../../../assets/common-components/website/Address";
import Loading from "../../../components/ui/Loading";
import { baseURL } from "../../../utils/constant-variable";
import { useLocation } from "react-router-dom";
const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [editData, setEditData] = useState([null]);
  const [userDetail, setUserDetail] = useState({});
  const [order, setOrder] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [profileEdit, setProfileEdit] = useState(false);
  const location = useLocation();

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
      house_flat_block_no: Yup.string().required("House/Flat/Block No is required"),
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
      formik.resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      formik.setSubmitting(false);
    }
  }

  const updateAddress = async (values) => {
    try {
      const response = await putAddressApi(editData?.id, values);
      const address_id = response?.data?.id;
      if (address_id) {
        await postSelectAddressApi({ address_id });
        getAddressList();
      }
      setLoading(false);
      setOpen(false);
      formik.resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      formik.setSubmitting(false);
    }
  }


  // Fetch Profile Data
  const getProfileList = async () => {
    setLoading(true);
    try {
      const response = await getProfile();
      setUserDetail(response?.data[0] || {});
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const getOrderList = async () => {
    setLoading(true);
    try {
      const response = await getOrderApi();
      setOrder(response?.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching order dataL", error);
    } finally {
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
    } catch (error) {
      console.log("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  const profile = useFormik({
    initialValues: {
      pp: "",
      full_name: "",
      email: "",
      gender: "",
      date_of_birth: "00-00-0000",
    },
    validationSchema: Yup.object({
      full_name: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      await updateProfile(values);
      resetForm();
      setSubmitting(false);
    },
  });

  const updateProfile = async (values) => {
    const formData = new FormData();
    formData.append("full_name", values.full_name);
    formData.append("email", values.email);
    formData.append("gender", values.gender);
    formData.append("date_of_birth", values.date_of_birth);
    try {
      setLoading(true);
      const response = await putProfileApi(userDetail.id, formData);
      getProfileList();
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAddressList();
    getProfileList();
    getOrderList();
  }, []);

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
  }, [userDetail]);

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
    if (userDetail?.full_name === null && userDetail?.email === null && userDetail?.gender === null && userDetail?.date_of_birth === null) {
      setProfileEdit(true);
    }
  }, [userDetail]);


  return (
    <div className="web-wrapper-main">
      <Header />
      <div className="container fb-container mb-md-5 pb-md-5">
        <div className="row">
          <div className="col-md-10 mx-auto">
            <div className="user-profile-img mt-5">
              {/* <img
                className="img-fluid profile-img profile-foreground-img rounded-top w-100 mt-5"
                src={profileBg}
                alt="pencil"
                style={{ height: "200px" }}
              /> */}
            </div>
            <div className="p-4 pt-0">
              <div
                className="position-relative text-start pb-3"
                style={{ marginTop: "-5rem" }}
              >
                <div className="text-center rounded-circle  position-relative d-flex align-items-center">
                  <img
                    className="img-profile avatar-xl rounded-circle img-fluid justify-content-md-center"
                    src={profilePic}
                    alt="Card image cap"
                  />
                  <div className="image-content mt-5 mt-md-3 pt-md-5 ms-md-3">
                    <h4 className="text-dark-grey fw-bold">{userDetail?.full_name}</h4>
                    <p className="fw-500 text-mid-grey fb-fs-18 text-start">
                      {userDetail?.phone_number}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex mb-2 gap-2 justify-content-end border-bottom profile-tabs">
                <button className={`border-0 bg-white fw-600 ${activeIndex === 0 ? "text-yellow bg-footer-bg border-bottom border-yellow-color" : 'text-dark-grey'}`} onClick={() => setActiveIndex(0)} rounded outlined={activeIndex !== 0} label="1" > <span className="me-1"><i className="pi pi-user"></i> </span> My Account</button>
                <button className={`border-0 bg-white fw-600 ${activeIndex === 1 ? "text-yellow bg-footer-bg border-bottom border-yellow-color" : 'text-dark-grey'}`} onClick={() => setActiveIndex(1)} rounded outlined={activeIndex !== 1} label="2"> <span className="me-1"><i className="pi pi-box"></i> </span>  Order History</button>
                <button className={`border-0 bg-white fw-600 ${activeIndex === 2 ? "text-yellow bg-footer-bg border-bottom border-yellow-color" : 'text-dark-grey'}`} onClick={() => setActiveIndex(2)} rounded outlined={activeIndex !== 2} label="3" > <span className="me-1"><i className="pi pi-map-marker"></i> </span>  Address Book</button>
              </div>
              <TabView className="custom-tabview" activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header="My Account"  >
                  <div className="account-section mb-md-4">
                    <div className="d-flex justify-content-between">
                      <p className="fb-fs-26 fw-bold">My Account</p>
                      <div className="d-flex">
                        <button
                          className="d-inline-flex align-items-end border-0 bg-transparent"
                          onClick={() => setProfileEdit(true)}>
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
                              error={
                                profile.touched.email &&
                                Boolean(profile.errors.email)
                              }
                              helperText={
                                profile.touched.email && profile.errors.email
                              }
                            />
                          </div>
                          <div className="col-md-6 mb-4">
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
                                  profile.touched.gender && profile.errors.gender
                                }
                              >
                                <MenuItem value={""}>Select</MenuItem>
                                <MenuItem value={"Male"}>Male</MenuItem>
                                <MenuItem value={"Female"}>Female</MenuItem>
                                <MenuItem value={"Other"}>Other</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                          <div className="col-md-6 mb-4">
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
                          {
                            profileEdit &&
                            <div className="col-12 mt-4 text-end"> 
                              <button
                                type="submit"
                                className="button-primary"
                                disabled={profile.isSubmitting || loading}
                              >
                                {loading ? "Saving..." : "Save"}
                              </button>
                            </div>
                          }
                        </div>
                      </div>
                    </form>
                  </div>
                </TabPanel>
                <TabPanel header="Order History"  >
                  <div className="order-section">
                    <p className="fb-fs-26 fw-bold my-4">Order History</p>
                    {order.map((item, index) => (
                      <div className="summary-card rounded-20 mb-4" key={index}>
                        <div className="container">
                          <div className="row border-bottom px-2 px-md-3 py-3">
                            <div className="col-md-3">
                              <p>
                                Order ID:
                                <span className="fw-600" title={item?.id}>&nbsp;&nbsp;
                                {item?.id?.slice(0, 12)}...
                                </span>
                              </p>
                            </div>
                            <div className="col-md-3">
                              <p>
                                Order Placed:
                                <span className="fw-600">&nbsp;&nbsp;
                                  {new Date(item?.created_at).toLocaleDateString(
                                    "en-GB"
                                  )}
                                </span>
                              </p>
                            </div>
                            <div className="col-6 col-md-3">
                              <p>
                                Total Amount:
                                <span className="fw-600">&nbsp;&nbsp; 
                                  ₹ {item?.amount_to_pay}
                                </span>
                              </p>
                            </div>
                            <div className="col-6 col-md-3 text-end">
                              <p className="text-orange fw-500">
                                Download Invoice
                              </p>
                            </div>
                          </div>
                          {item?.product_details.map((data) => (
                            <div className="row px-2 px-md-3 pt-3 py-md-4">
                              <div className="col-md-8">
                                <div className="prod-detail d-flex align-items-center">
                                  <img
                                    className="img-fluid me-4 rounded-4"
                                    style={{ height: "7rem", width: "7rem" }}
                                    src={
                                      baseURL +
                                      data?.product?.images[0]?.img_files
                                    }
                                    alt="pencil"
                                  />
                                  <div>
                                    <p className="fb-fs-18 fw-600 text-dark-grey">
                                      {data?.product?.name}
                                    </p>
                                    <p className="mt-2">
                                      Qty: <span className="fw-600"> {data?.item_quantity}</span>
                                    </p>
                                    <p className="mt-2">
                                      Size:
                                      <span className="fw-600">{`${data?.product?.quantity}${data?.product?.quantity_unit}`}</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="price-sec text-end text-dark-grey">
                                  <p className="fb-fs-24 fw-bold">₹{data?.price}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className="row p-2 p-md-3">
                            <div className="col-md-6">
                              <div className="d-flex mb-2 mb-md-0">
                                <img
                                  className="img-fluid me-2"
                                  src={tickImg}
                                  alt="pencil"
                                />
                                <p className="text-dark-grey">
                                  Delivered within 5-7 days
                                  {/* {new Date(item?.delivered_on).toLocaleDateString("en-US", {year: "numeric",month: "long",day: "numeric",})} */}
                                </p>
                              </div>
                            </div>
                            <div className="col-md-6 text-md-end">
                              <div className="more-option d-flex justify-content-md-end">
                                <button className="fw-bold border-0 text-dark-grey bg-transparent border-end pe-4">
                                  View Product
                                </button>
                                <button className="fw-bold border-0 text-orange bg-transparent ms-3">
                                  Buy Again
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabPanel>
                <TabPanel header="Address Book" >
                  <div className="address-section">
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="fb-fs-26 fw-bold text-dark-grey my-md-4">
                        Saved Address
                      </h4>
                      <button
                        type="button"
                        className="d-flex align-items-center border-0 bg-transparent"
                        onClick={() => {
                          setOpen(!open);
                          setEditData(null);
                        }}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                      >
                        <i className="pi pi-plus text-yellow me-2 mt-md-1"></i>
                        <p className="fw-500">Add New Address</p>
                      </button>
                    </div>
                    <div className="">
                      {loading ? (
                        <Loading />
                      ) : addressList.length > 0 ? (
                        addressList.map((item, index) => (
                          <div
                            className={`summary-card ${item?.selected ? "active" : ""
                              } rounded-20 px-2 py-3 mt-3 cursor-pointer`}
                            key={index}
                            onClick={() => handleSelectAddress(item?.id)}
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
                                        <p className="fw-600 fb-fs-18">{item?.user_detail?.full_name} | {item?.user_detail?.phone_number}</p>
                                        {item?.selected && (
                                          <button className="button-yellow default-btn ms-md-3 fw-normal lh-base align-self-center">
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
                                <div className="col-md-1"></div>
                                <div className="col-md-11">
                                  <div className="d-flex mt-2">
                                    <button
                                      className="border-0 bg-transparent"
                                      onClick={() => {
                                        setOpen(!open);
                                        setEditData(item);
                                      }}
                                    >
                                      <img
                                        className="img-fluid me-3"
                                        src={editButton}
                                        alt="Edit"
                                      />
                                    </button>
                                    <button
                                      className="border-0 bg-transparent"
                                      onClick={() =>
                                        handleDeleteAddress(item?.id)
                                      }
                                    >
                                      <img
                                        className="img-fluid me-2"
                                        src={deleteButton}
                                        alt="Delete"
                                      />
                                    </button>
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
                    </div>
                    <div className="">
                      <Collapse in={open}>
                        <Address
                          formik={formik}
                          loading={loading}
                          setOpen={setOpen}
                          editData={editData}
                        />
                      </Collapse>
                    </div>
                  </div>
                </TabPanel>
              </TabView>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default UserProfile;
