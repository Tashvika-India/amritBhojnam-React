import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Heading from "@/components/ui/Heading";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Checkbox } from "primereact/checkbox";
import IosSwitch from "../../../../components/ui/IosSwitch";
import { Link } from "react-router-dom";
import { postCouponApi } from "../../../../services/adminApiRoutes";
import { useNavigate } from "react-router-dom";
import YellowButton from "../../../../components/buttons/YellowButton";
const AddRoles = () => {
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

  return (
    <>
      <div className="mt-3 mb-5 row">
        <div className="col-md-6">
          <Heading value="Add Roles" />
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
                  <div className="col-md-12 mb-4 mt-3">
                    <TextField
                      fullWidth
                      id="roles"
                      name="title"
                      label="Role Title"
                      placeholder="Enter Role Title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.title && Boolean(formik.errors.title)
                      }
                      helperText={formik.touched.title && formik.errors.title}
                    />
                    <p className="fb-fs-18 fw-500 mb-0 mt-4 pt-2">
                      Permissions
                    </p>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="d-flex align-items-center">
                      <Checkbox
                        checked={isFirstOrder}
                        onChange={(e) => setIsFirstOrder(e.checked)}
                      />
                      <p className="mb-0 ps-3">Customers</p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="d-flex align-items-center">
                      <Checkbox
                        checked={isFirstOrder}
                        onChange={(e) => setIsFirstOrder(e.checked)}
                      />
                      <p className="mb-0 ps-3">Employees</p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="d-flex align-items-center">
                      <Checkbox
                        checked={isFirstOrder}
                        onChange={(e) => setIsFirstOrder(e.checked)}
                      />
                      <p className="mb-0 ps-3">Employees</p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="d-flex align-items-center">
                      <Checkbox
                        checked={isFirstOrder}
                        onChange={(e) => setIsFirstOrder(e.checked)}
                      />
                      <p className="mb-0 ps-3">POS</p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="d-flex align-items-center">
                      <Checkbox
                        checked={isFirstOrder}
                        onChange={(e) => setIsFirstOrder(e.checked)}
                      />
                      <p className="mb-0 ps-3">Reports</p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="d-flex align-items-center">
                      <Checkbox
                        checked={isFirstOrder}
                        onChange={(e) => setIsFirstOrder(e.checked)}
                      />
                      <p className="mb-0 ps-3">Dashboard</p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="d-flex align-items-center">
                      <Checkbox
                        checked={isFirstOrder}
                        onChange={(e) => setIsFirstOrder(e.checked)}
                      />
                      <p className="mb-0 ps-3">Customers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12 mb-4 text-end d-flex justify-content-end">
                <Link>
                  <YellowButton lable={"+ Add New Role"} />
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
      </form>
    </>
  );
};

export default AddRoles;
