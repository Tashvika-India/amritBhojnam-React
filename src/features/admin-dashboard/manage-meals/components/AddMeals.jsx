import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Heading from "@/components/ui/Heading";
import {
    Alert,
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
import FileUpload from "../../../../components/fileUpload/FileUpload";

const AddMeals = () => {
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
      <div className="mt-4 mb-5 row">
        <div className="col-md-6">
          <Heading value="Add Meal" />
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body">
                <div className="mb-4">
                  <FileUpload formik={formik} name="img_file" />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <TextField
                      fullWidth
                      id="roles"
                      name="title"
                      label="Enter Food Name"
                      placeholder="Enter Food Name"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField
                      fullWidth
                      id="roles"
                      name="title"
                      label="Enter Quantity"
                      placeholder="Enter Quantity"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <TextField
                      fullWidth
                      id="roles"
                      name="title"
                      label="Calories"
                      placeholder="Calories"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField
                      fullWidth
                      id="roles"
                      name="title"
                      label="Protein"
                      placeholder="Protein"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <TextField
                      fullWidth
                      id="roles"
                      name="title"
                      label="Carbs"
                      placeholder="Carbs"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField
                      fullWidth
                      id="roles"
                      name="title"
                      label="Fat"
                      placeholder="Fat"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <div>
                  <p className="fb-fs-18 fw-500">
                    Avoid Due to Food Sensitivities:
                  </p>

                  <div className="row py-3">
                    <div className="col-md-4 mb-4">
                      <div className="d-flex align-items-center">
                        <Checkbox
                          checked={isFirstOrder}
                          onChange={(e) => setIsFirstOrder(e.checked)}
                        />
                        <p className="mb-0 ps-3">Dairy Sensitivity</p>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="d-flex align-items-center">
                        <Checkbox
                          checked={isFirstOrder}
                          onChange={(e) => setIsFirstOrder(e.checked)}
                        />
                        <p className="mb-0 ps-3">Nut Allergy</p>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="d-flex align-items-center">
                        <Checkbox
                          checked={isFirstOrder}
                          onChange={(e) => setIsFirstOrder(e.checked)}
                        />
                        <p className="mb-0 ps-3">Gluten Sensitivity</p>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="d-flex align-items-center">
                        <Checkbox
                          checked={isFirstOrder}
                          onChange={(e) => setIsFirstOrder(e.checked)}
                        />
                        <p className="mb-0 ps-3">Soy Allergy</p>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="d-flex align-items-center">
                        <Checkbox
                          checked={isFirstOrder}
                          onChange={(e) => setIsFirstOrder(e.checked)}
                        />
                        <p className="mb-0 ps-3">Egg Allergy</p>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="d-flex align-items-center">
                        <Checkbox
                          checked={isFirstOrder}
                          onChange={(e) => setIsFirstOrder(e.checked)}
                        />
                        <p className="mb-0 ps-3">Seafood Allergy</p>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="d-flex align-items-center">
                        <Checkbox
                          checked={isFirstOrder}
                          onChange={(e) => setIsFirstOrder(e.checked)}
                        />
                        <p className="mb-0 ps-3">Sulfite Sensitivity</p>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="d-flex align-items-center">
                        <Checkbox
                          checked={isFirstOrder}
                          onChange={(e) => setIsFirstOrder(e.checked)}
                        />
                        <p className="mb-0 ps-3">Nightshade Sensitivity</p>
                      </div>
                    </div>
                     <Alert severity="warning" className="mt-3 px-3 py-0"><span className="fw-500 text-black">Warning:</span> Selecting an option means avoiding foods that may trigger allergies or intolerances.</Alert>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-5">
              <div className="card-body">
                <div>
                  <p className="fb-fs-18 fw-500">
                  Avoid Due to Health Issue:
                  </p>

                  <div className="row py-3">
                    <div className="col-md-4 mb-4">
                      <div className="d-flex align-items-center">
                        <Checkbox
                          checked={isFirstOrder}
                          onChange={(e) => setIsFirstOrder(e.checked)}
                        />
                        <p className="mb-0 ps-3">Diabetes</p>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="d-flex align-items-center">
                        <Checkbox
                          checked={isFirstOrder}
                          onChange={(e) => setIsFirstOrder(e.checked)}
                        />
                        <p className="mb-0 ps-3">High Blood Pressure</p>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="d-flex align-items-center">
                        <Checkbox
                          checked={isFirstOrder}
                          onChange={(e) => setIsFirstOrder(e.checked)}
                        />
                        <p className="mb-0 ps-3">High Cholesterol</p>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="d-flex align-items-center">
                        <Checkbox
                          checked={isFirstOrder}
                          onChange={(e) => setIsFirstOrder(e.checked)}
                        />
                        <p className="mb-0 ps-3">Acid Reflux (GERD)</p>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="d-flex align-items-center">
                        <Checkbox
                          checked={isFirstOrder}
                          onChange={(e) => setIsFirstOrder(e.checked)}
                        />
                        <p className="mb-0 ps-3">Irritable Bowel Syndrome</p>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="d-flex align-items-center">
                        <Checkbox
                          checked={isFirstOrder}
                          onChange={(e) => setIsFirstOrder(e.checked)}
                        />
                        <p className="mb-0 ps-3">Kidney Disease</p>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="d-flex align-items-center">
                        <Checkbox
                          checked={isFirstOrder}
                          onChange={(e) => setIsFirstOrder(e.checked)}
                        />
                        <p className="mb-0 ps-3">Thyroid Issues</p>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="d-flex align-items-center">
                        <Checkbox
                          checked={isFirstOrder}
                          onChange={(e) => setIsFirstOrder(e.checked)}
                        />
                        <p className="mb-0 ps-3">Anemia</p>
                      </div>
                    </div>
                    <Alert severity="warning" className="mt-3 px-3 py-0"><span className="fw-500 text-black">Warning:</span> Selecting an option means avoiding foods that may trigger allergies or intolerances.</Alert>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-12 mt-4">
            <div className="row">
              <div className="col-md-12 mb-4 text-end d-flex justify-content-end">
                <Link>
                  <YellowButton lable={"+ Add Meal"} />
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

export default AddMeals;
