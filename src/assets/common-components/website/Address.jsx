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

const Address = ({ formik, loading, setOpen, editData }) => { 

  const [age, setAge] = useState("");
  
  useEffect(() => {
    if (editData) {
      formik.setValues(editData);
    } else {
      formik.resetForm();
    }
  }, [editData]); 


  return (
    <div>
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
        <form onSubmit={formik.handleSubmit}>
          <div className="container fb-container">
            <div className="row">
              <div className="col-md-6 ps-md-0 pb-4">
                <FormControl fullWidth>
                  <InputLabel id="state-select-label">State</InputLabel>
                  <Select
                    id="state-select"
                    name="state"
                    label="State"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value=" ">Select</MenuItem>
                    <MenuItem value="Delhi">Delhi</MenuItem>
                    <MenuItem value="UttarPradesh">Uttar Pradesh</MenuItem>
                  </Select>
                  {formik.touched.state && formik.errors.state ? (
                    <div className="error text-danger">
                      {formik.errors.state}
                    </div>
                  ) : null}
                </FormControl>
              </div>
              <div className="col-md-6 pe-md-0">
                <FormControl fullWidth>
                  <InputLabel id="city-select-label">City</InputLabel>
                  <Select
                    id="city-select"
                    label="City"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value=" ">Select</MenuItem>
                    <MenuItem value="NewDelhi">New Delhi</MenuItem>
                    <MenuItem value="OldDelhi">Old Delhi</MenuItem>
                    <MenuItem value="Noida">Noida</MenuItem>
                  </Select>
                  {formik.touched.city && formik.errors.city ? (
                    <div className="error text-danger">
                      {formik.errors.city}
                    </div>
                  ) : null}
                </FormControl>
              </div>
              <div className="col-md-12 px-md-0 ">
                <TextField
                  fullWidth
                  className="rounded-20 me-5"
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
              <div className="col-md-12 px-md-0">
                <TextField
                  fullWidth
                  className="rounded-20 me-5 mt-4"
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
              <div className="col-md-12 px-md-0">
                <TextField
                  fullWidth
                  className="rounded-20 me-5 mt-4"
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
              <div className="d-flex my-5 ps-md-0">
                <button
                  type="button"
                  className="home-btn d-flex border-0 bg-transparent"
                  onClick={() => formik.setFieldValue("save_as", "home")}
                >
                  <IoHomeOutline
                    className="ms-lg-2 ms-0"
                    size={"20"}
                    color={"#F26722"}
                  />
                  <p className="text-orange fw-500 ms-lg-3 ms-2">Home</p>
                </button>
                <button
                  type="button"
                  className="office-btn d-flex border-0 bg-transparent ms-4"
                  onClick={() => formik.setFieldValue("save_as", "office")}
                >
                  <HiBuildingOffice2
                    className="ms-lg-2 ms-0"
                    size={"23"}
                    color={"#918E92"}
                  />
                  <p className="text-mid-grey fw-500 ms-lg-3 ms-2">Office</p>
                </button>
              </div>
              <div className="checkout-btn d-flex mb-5 pb-5 pe-0 align-items-end justify-content-end">
                <button
                  className="button-primary-reverse me-4"
                  type="button"
                  onClick={() => {
                    formik.resetForm();
                    setOpen(false);
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
