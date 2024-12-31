import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { IoHomeOutline } from "react-icons/io5";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { getPincodeApi } from "../../../services/adminApiRoutes";

const Address = ({ formik, loading, setOpen, editData }) => {

  useEffect(() => {
    if (editData && Object.keys(editData).length > 0) {
      formik.setValues(editData);
    } else {
      formik.resetForm();
    }
  }, [editData]);

  async function stateCityFromPincode() {
    try {
      const response = await getPincodeApi(formik.values.pincode);
      const { state, district } = response?.data || {};

      formik.setFieldValue('state', state);
      formik.setFieldValue('city', district);
    } catch (error) {
      console.error('Error fetching pincode details:', error);
    } finally {
    }
  }

  useEffect(() => {
    if (formik.values.pincode?.length === 6) {
      stateCityFromPincode()
    }
    else {
      formik.setFieldValue('city', "");
      formik.setFieldValue('state', "");

    }
  }, [formik.values.pincode])


  return (
    <div>
      <div className="new-address" id="new-address">
        <p className="fb-fs-26 fw-bold my-3 checkout-save">Add New Address</p>
        <p className="text-mid-grey">BASIC DETAILS</p>
        <form onSubmit={formik.handleSubmit} key={editData?.id || "new"}>
          <div className="container fb-container">
            <div className="row">
              <div className="col-md-6">
                <TextField
                  fullWidth
                  className="rounded-20  mt-4"
                  id="ads_name"
                  name="ads_name"
                  label="Name"
                  variant="outlined"
                  value={formik.values.ads_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.ads_name && formik.errors.ads_name ? (
                  <div className="error text-danger">
                    {formik.errors.ads_name}
                  </div>
                ) : null}
              </div>
              <div className="col-md-6 ">
                <TextField
                  fullWidth
                  className="rounded-20 mt-4"
                  id="ads_phone"
                  label="Phone Number"
                  name="ads_phone"
                  variant="outlined"
                  value={formik.values.ads_phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
                    formik.setFieldValue("ads_phone", value); // Update Formik value
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.ads_phone && formik.errors.ads_phone ? (
                  <div className="error text-danger">
                    {formik.errors.ads_phone}
                  </div>
                ) : null}
              </div>
              <div className="col-md-12 mb-2">
                <TextField
                  fullWidth
                  className="rounded-20 mt-4"
                  id="outlined-basic"
                  label="Email Address"
                  name="ads_email"
                  variant="outlined"
                  value={formik.values.ads_email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.ads_email && formik.errors.ads_email ? (
                  <div className="error text-danger">
                    {formik.errors.ads_email}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <p className="text-mid-grey my-4">ADDRESS DETAILS</p>

          <div className="container fb-container">
            <div className="row">
              <div className="col-md-4 mb-3">
                <TextField
                  fullWidth
                  className="rounded-20 "
                  id="pincode"
                  label="Pincode"
                  name="pincode"
                  variant="outlined"
                  value={formik.values.pincode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.pincode && formik.errors.pincode ? (
                  <div className="error text-danger">
                    {formik.errors.pincode}
                  </div>
                ) : null}
              </div>
              <div className="col-md-4 mb-3">
                <FormControl fullWidth>
                  <TextField
                    id="state"
                    fullWidth
                    className="rounded-20 "
                    name="state"
                    label="State"
                    variant="outlined"
                    disabled
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                  </TextField>
                  {formik.touched.state && formik.errors.state ? (
                    <div className="error text-danger">
                      {formik.errors.state}
                    </div>
                  ) : null}
                </FormControl>
              </div>
              <div className="col-md-4 mb-3">
                <FormControl fullWidth>
                  <TextField
                    id="city"
                    readOnly
                    fullWidth
                    disabled
                    className="rounded-20 "
                    label="City"
                    name="city"
                    variant="outlined"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                  </TextField>
                  {formik.touched.city && formik.errors.city ? (
                    <div className="error text-danger">
                      {formik.errors.city}
                    </div>
                  ) : null}
                </FormControl>
              </div>
              <div className="col-md-12 mb-3">
                <TextField
                  fullWidth
                  className="rounded-20  "
                  id="house_flat_block_no"
                  name="house_flat_block_no"
                  label="House / Flat / Block No."
                  variant="outlined"
                  value={formik.values.house_flat_block_no}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.house_flat_block_no &&
                  formik.errors.house_flat_block_no ? (
                  <div className="error text-danger">
                    {formik.errors.house_flat_block_no}
                  </div>
                ) : null}
              </div>
              <div className="col-md-12 mb-3">
                <TextField
                  fullWidth
                  className="rounded-20  "
                  id="road_area_colony"
                  name="road_area_colony"
                  label="Road / Area / Colony"
                  variant="outlined"
                  value={formik.values.road_area_colony}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.road_area_colony &&
                  formik.errors.road_area_colony ? (
                  <div className="error text-danger">
                    {formik.errors.road_area_colony}
                  </div>
                ) : null}
              </div>
              <div className="col-12 d-flex my-3 my-lg-4 gap-3">
                <button
                  type="button"
                  className={`d-flex align-items-center border-0 bg-transparent ${formik.values.save_as === "Home" ? "home-btn" : "office-btn"}`}
                  onClick={() => formik.setFieldValue("save_as", "Home")}
                  onBlur={formik.handleBlur}>
                  <IoHomeOutline
                    size={"20"}
                    color={formik.values.save_as === "Home" ? "#F26722" : "#918E92"}
                  />
                  <p className={`${formik.values.save_as === "Home" ? "text-orange" : "text-mid-grey"} fw-500 ms-lg-2 ms-2`}>Home</p>
                </button>
                <button
                  type="button"
                  className={`d-flex align-items-center border-0 bg-transparent ${formik.values.save_as === "Office" ? "home-btn" : "office-btn"}`}
                  onClick={() => formik.setFieldValue("save_as", "Office")}
                  onBlur={formik.handleBlur}
                >
                  <HiBuildingOffice2
                    size={"23"}
                    color={formik.values.save_as === "Office" ? "#F26722" : "#918E92"}
                  />
                  <p className={`${formik.values.save_as === "Office" ? "text-orange" : "text-mid-grey"} fw-500 ms-lg-2 ms-2`}>Office</p>
                </button>
                <button
                  type="button"
                  className={`d-flex align-items-center border-0 bg-transparent ${formik.values.save_as === "Other" ? "home-btn" : "office-btn"}`}
                  onClick={() => formik.setFieldValue("save_as", "Other")}
                  onBlur={formik.handleBlur}
                >
                  <HiBuildingOffice2
                    size={"23"}
                    color={formik.values.save_as === "Other" ? "#F26722" : "#918E92"}
                  />
                  <p className={`${formik.values.save_as === "Other" ? "text-orange" : "text-mid-grey"} fw-500 ms-lg-2 ms-2`}>Other</p>
                </button>
                {formik.touched.save_as &&
                  formik.errors.save_as ? (
                  <div className="error text-danger">
                    {formik.errors.save_as}
                  </div>
                ) : null}
              </div>
              <div className="checkout-btn d-flex mb-5 pb-5 pe-0 align-items-end justify-content-end">
                <button
                  className="button-primary-reverse me-4"
                  type="button"
                  onClick={() => {
                    formik.resetForm();
                    setOpen(false);
                    scrollTo(0, 0);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="button-primary fb-fs-16"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save & Continue"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Address;
