import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Heading from "@/components/ui/Heading";
import {
  Breadcrumbs,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Checkbox } from "primereact/checkbox";
import IosSwitch from "../../../../components/ui/IosSwitch";
import { Link } from 'react-router-dom';
import { postCouponApi, putCouponApi } from "../../../../services/adminApiRoutes";
import { useNavigate } from "react-router-dom";
import YellowButton from "../../../../components/buttons/YellowButton";
import { ColorLensOutlined } from "@mui/icons-material";
const AddCoupon = ({editData}) => {
  const [isFirstOrder, setIsFirstOrder] = useState(false);
  const [isDeliveryFree, setIsDeliveryFree] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      coupon_code: "",
      coupon_type: "",
      discount_value: "",
      max_discount: "",
      valid_from: "",
      valid_to: "",
      is_active: true,
      buy_quantity: "",
      buy_quantity_unit: "",
      free_quantity: "",
      free_quantity_unit: "",
      buy_product: "",
      free_product: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      coupon_code: Yup.string().required("Coupon code is required"),
      coupon_type: Yup.string().required("Coupon type is required"),
      discount_value: Yup.number().required("Discount value is required"),
      max_discount: Yup.number().required("Max discount is required"),
      valid_from: Yup.date().required("Valid from date is required"),
      valid_to: Yup.date().required("Valid to date is required"),
      buy_quantity: Yup.number().required("Buy quantity is required"),
      buy_quantity_unit: Yup.string().required("Buy quantity unit is required"),
      free_quantity: Yup.number().required("Free quantity is required"),
      free_quantity_unit: Yup.string().required(
        "Free quantity unit is required"
      ),
      buy_product: Yup.string().required("Buy product is required"),
      free_product: Yup.string().required("Free product is required"),
    }),
    onSubmit: async (values) => {
      const payload = {
        ...values,
        is_first_order: isFirstOrder,
        is_delivery_free: isDeliveryFree,
      };

      try {
        await postCouponApi(payload);
        navigate("/admin/coupons");
      } catch (error) {
        alert("Failed to add coupon.");
      }
    },
  });

  
  const addCoupon = async (payload) => {
    try {
      const response = await postCouponApi(payload);
      return response.data;
    } catch (error) {
      console.error("Failed to update coupon:", error);
      throw error;
    }
  };

   const updateCoupon = async (payload) => {
    try {
      const response = await putCouponApi(payload);
      return response.data;
    } catch (error) {
      console.error("Failed to update coupon:", error);
      throw error;
    }
  };

  return (
    <>
      <div className="mt-3 mb-4 row">
        <div className="col-md-6">
          <Heading value="Add Coupon" />
        </div>
        <div className="col-12 mt-4">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to={"/admin/coupons"}>Coupons</Link>
            <Typography className="text-orange">Add Coupon</Typography>
          </Breadcrumbs>
        </div>
      </div> 
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h6 className="mb-4">General</h6>
                  <IosSwitch
                    name="is_active"
                    checked={formik.values.is_active}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="row">
                  <div className="col-md-12 mb-4">
                    <TextField
                      fullWidth
                      id="title"
                      name="title"
                      label="Title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.title && Boolean(formik.errors.title)
                      }
                      helperText={formik.touched.title && formik.errors.title}
                    />
                  </div>
                  <div className="col-md-12 mb-4">
                    <TextField
                      fullWidth
                      id="description"
                      name="description"
                      label="Description"
                      multiline
                      rows={3}
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
                    />
                  </div>
                  <div className="col-md-12 mb-4">
                    <TextField
                      fullWidth
                      id="coupon_code"
                      name="coupon_code"
                      label="Coupon Code"
                      value={formik.values.coupon_code}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.coupon_code &&
                        Boolean(formik.errors.coupon_code)
                      }
                      helperText={
                        formik.touched.coupon_code && formik.errors.coupon_code
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="card mb-4">
              <div className="card-body">
                <h6 className="mb-4">Discount</h6>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="d-flex align-items-center">
                      <Checkbox
                        checked={isFirstOrder}
                        onChange={(e) => setIsFirstOrder(e.checked)}
                      />
                      <p className="mb-0 ps-3">First Order</p>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="d-flex align-items-center">
                      <Checkbox
                        checked={isDeliveryFree}
                        onChange={(e) => setIsDeliveryFree(e.checked)}
                      />
                      <p className="mb-0 ps-3">Delivery Free</p>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <TextField
                      fullWidth
                      id="discount_value"
                      name="discount_value"
                      label="Discount Value"
                      value={formik.values.discount_value}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.discount_value &&
                        Boolean(formik.errors.discount_value)
                      }
                      helperText={
                        formik.touched.discount_value &&
                        formik.errors.discount_value
                      }
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <FormControl fullWidth>
                      <InputLabel id="coupon_type-label">
                        Coupon Type
                      </InputLabel>
                      <Select
                        labelId="coupon_type-label"
                        id="coupon_type"
                        label="Coupon Type"
                        name="coupon_type"
                        value={formik.values.coupon_type}
                        onChange={formik.handleChange}
                      >
                        <MenuItem value="">SELECT</MenuItem>
                        <MenuItem value="FLAT">FLAT</MenuItem>
                        <MenuItem value="PERCENTAGE">PERCENTAGE</MenuItem>
                        <MenuItem value="UPTO">UPTO</MenuItem>
                        <MenuItem value="BUY_X_GET_Y">BUY_X_GET_Y</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-md-6 mb-4">
                    <TextField
                      fullWidth
                      id="max_discount"
                      name="max_discount"
                      label="Max Discount"
                      value={formik.values.max_discount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.max_discount &&
                        Boolean(formik.errors.max_discount)
                      }
                      helperText={
                        formik.touched.max_discount &&
                        formik.errors.max_discount
                      }
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <TextField
                      fullWidth
                      id="valid_from"
                      name="valid_from"
                      label="Valid From"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={formik.values.valid_from}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.valid_from &&
                        Boolean(formik.errors.valid_from)
                      }
                      helperText={
                        formik.touched.valid_from && formik.errors.valid_from
                      }
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <TextField
                      fullWidth
                      id="valid_to"
                      name="valid_to"
                      label="Valid To"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={formik.values.valid_to}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.valid_to &&
                        Boolean(formik.errors.valid_to)
                      }
                      helperText={
                        formik.touched.valid_to && formik.errors.valid_to
                      }
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <TextField
                      fullWidth
                      id="buy_quantity"
                      name="buy_quantity"
                      label="Buy Quantity"
                      value={formik.values.buy_quantity}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.buy_quantity &&
                        Boolean(formik.errors.buy_quantity)
                      }
                      helperText={
                        formik.touched.buy_quantity &&
                        formik.errors.buy_quantity
                      }
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <TextField
                      fullWidth
                      id="buy_quantity_unit"
                      name="buy_quantity_unit"
                      label="Buy Quantity Unit"
                      value={formik.values.buy_quantity_unit}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.buy_quantity_unit &&
                        Boolean(formik.errors.buy_quantity_unit)
                      }
                      helperText={
                        formik.touched.buy_quantity_unit &&
                        formik.errors.buy_quantity_unit
                      }
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <TextField
                      fullWidth
                      id="free_quantity"
                      name="free_quantity"
                      label="Free Quantity"
                      value={formik.values.free_quantity}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.free_quantity &&
                        Boolean(formik.errors.free_quantity)
                      }
                      helperText={
                        formik.touched.free_quantity &&
                        formik.errors.free_quantity
                      }
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <TextField
                      fullWidth
                      id="free_quantity_unit"
                      name="free_quantity_unit"
                      label="Free Quantity Unit"
                      value={formik.values.free_quantity_unit}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.free_quantity_unit &&
                        Boolean(formik.errors.free_quantity_unit)
                      }
                      helperText={
                        formik.touched.free_quantity_unit &&
                        formik.errors.free_quantity_unit
                      }
                    />
                  </div>
                  {/* <div className="col-md-6 mb-4">
                    <TextField
                      fullWidth
                      id="buy_product"
                      name="buy_product"
                      label="Buy Product"
                      value={formik.values.buy_product}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.buy_product &&
                        Boolean(formik.errors.buy_product)
                      }
                      helperText={
                        formik.touched.buy_product && formik.errors.buy_product
                      }
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <TextField
                      fullWidth
                      id="free_product"
                      name="free_product"
                      label="Free Product"
                      value={formik.values.free_product}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.free_product &&
                        Boolean(formik.errors.free_product)
                      }
                      helperText={
                        formik.touched.free_product &&
                        formik.errors.free_product
                      }
                    />
                  </div> */}
                  <div className="col-md-12 mb-4 text-end">
                    <Link to="/admin/add-coupon">
                      <YellowButton lable={"+ Add Coupons"} handleClick={formik.handleSubmit} />
                    </Link>
                    <button
                  className="button-primary-reverse me-4 ms-3 py-2"
                  type="button"
                  onClick={() => {
                    formik.resetForm();
                    setOpen(false);
                  }}
                >
                  Cancel
                </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddCoupon;
