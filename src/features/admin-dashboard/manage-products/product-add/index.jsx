import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  IconButton,
  Box,
  Chip,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import RejectButton from "@/components/buttons/RejectButton";
import YellowButton from "@/components/buttons/YellowButton";
import MultiFileUpload from "../../../../components/fileUpload/MultiFileUpload";
import { getCategoriesApi } from "@/services/adminApiRoutes";
import { useFormik } from "formik";
import { productInitalValues } from "@/utils/form-inital-values/InitalValues";
import {
  getSubCategoriesApi,
  postProductApi,
  putProductApi,
} from "../../../../services/adminApiRoutes";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../../components/ui/Loading";
import * as Yup from "yup";
import { baseURL } from "../../../../utils/constant-variable";
import IosSwitch from "../../../../components/ui/IosSwitch";
import { productSchema } from "../../../../schemas/product-schema";

const validationSchema = Yup.object({
  name: Yup.string().required("Product name is required"),
  // Add more validations as needed
});
const ProductAdd = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const location = useLocation();
  const ifError = (key) => errors[key] && touched[key];
  const product = location?.state;
  const isEditMode = !!product;
  const navigate = useNavigate();

  const handleTagAdd = (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      const newTag = event.target.value.trim();
      setValues((prevValues) => ({
        ...prevValues,
        tags: [...prevValues.tags, newTag],
      }));
      event.target.value = ""; // Clear input after adding a tag
    }
  };

  const handleTagRemove = (index) => {
    setValues((prevValues) => ({
      ...prevValues,
      tags: prevValues.tags.filter((_, i) => i !== index),
    }));
  };

  const handleMetaKeywordAdd = (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      const newKeyword = event.target.value.trim();
      setValues((prevValues) => ({
        ...prevValues,
        meta_keywords: [...prevValues.meta_keywords, newKeyword],
      }));
      event.target.value = ""; // Clear input after adding a keyword
    }
  };

  const handleMetaKeywordRemove = (index) => {
    setValues((prevValues) => ({
      ...prevValues,
      meta_keywords: prevValues.meta_keywords.filter((_, i) => i !== index),
    }));
  };

  const formik = useFormik({
    initialValues: productInitalValues,
    validationSchema: productSchema,
    onSubmit: async (values) => {
      isEditMode
        ? updateProduct(values)
        : addProduct({ ...values, discount: values.discount || 0 });
    },
  });
  const { values, resetForm, setValues, errors, touched } = formik;

  async function addProduct(values) {
    try {
      setLoading(true);
      const response = await postProductApi(values);
      navigate("/admin/product");
      resetForm();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notifyError("Failed to add product, please try again!");
      throw error;
    }
  }

  async function updateProduct(values) {
    try {
      setLoading(true);
      const response = await putProductApi(product?.id, values);
      resetForm();
      navigate("/admin/product");
      setLoading(false);
    } catch (error) {
      notifyError("Failed to update product, please try again!");
      setLoading(false);

      throw error;
    }
  }

  async function getCaterioes() {
    try {
      const response = await getCategoriesApi();
      setCategories(response?.data || []);
    } catch (error) {
      console.log("Error on Category List", error);
    }
  }

  async function getSubCaterioes() {
    try {
      const response = await getSubCategoriesApi();
      setSubCategories(response?.data || []);
    } catch (error) {
      console.log("Error on Category List", error);
    }
  }

  useEffect(() => {
    getCaterioes();
    getSubCaterioes();
    if (isEditMode) {
      setValues(product);
    }
  }, [product]);

  return (
    <>
      <div className="mt-3 mb-5 row">
        <div className="col-md-6">
          <Heading value={isEditMode ? "Edit Product" : "Add New Product"} />
        </div>
      </div>
      <form className="" onSubmit={formik.handleSubmit}>
        <div className="card mb-4 px-3 pt-2">
          <div className="card-body">
            <h5 className="mb-4">Image</h5>
            <div className="">
              <MultiFileUpload
                formik={formik}
                name="images"
                baseURL={baseURL}
              />
            </div>
            {ifError("images") && (
              <span className="text-danger">{errors.images}</span>
            )}
          </div>
        </div>
        <div className="card mb-4 px-3 pt-2">
          <div className="card-body">
            <h6 className="mb-4">Product</h6>
            <div className="row">
              <div className="col-md-4 mb-4">
                <TextField
                  id="outlined-basic"
                  name="name"
                  value={values?.name}
                  onChange={formik.handleChange}
                  label="Product Name"
                  variant="outlined"
                  error={ifError("name")}
                  helperText={ifError("name") && errors.name}
                  fullWidth
                />
              </div>
              <div className="col-md-8 mb-4">
                <TextField
                  id="outlined-basic"
                  name="short_description"
                  value={formik.values?.short_description}
                  onChange={formik.handleChange}
                  label="Short description"
                  error={ifError("short_description")}
                  helperText={
                    ifError("short_description") && errors.short_description
                  }
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="col-md-4 mb-4">
                <TextField
                  id="outlined-basic"
                  name="product_type"
                  value={formik.values?.product_type}
                  onChange={formik.handleChange}
                  label="Product Type"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="col-md-4 mb-4">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Category
                  </InputLabel>
                  <Select
                    label="Select Category"
                    name="category_id"
                    value={formik.values?.category_id}
                    onChange={formik.handleChange}
                    error={ifError("category_id")}
                  >
                    {categories?.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {ifError("category_id") && (
                  <p className="text-danger">{errors.category_id}</p>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Sub Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="sub_category_id"
                    value={formik.values?.sub_category_id}
                    onChange={formik.handleChange}
                    error={ifError("sub_category_id")}
                    label="Select Sub Category"
                  >
                    {subCategories?.map((sub) => (
                      <MenuItem key={sub.id} value={sub.id}>
                        {sub.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {ifError("sub_category_id") && (
                  <p className="text-danger">{errors.sub_category_id}</p>
                )}
              </div>
              {/* <div className="col-md-4 mb-4">
                <TextField
                  type="date"
                  id="outlined-basic"
                  variant="outlined"
                  name="mfg_date"
                  label="Manufacturing Date"
                  value={formik.values?.mfg_date}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </div> */}
              {/* <div className="col-md-4 mb-4">
                <TextField
                  id="outlined-basic"
                  label="Days"
                  name="days"
                  value={formik.values?.days}
                  onChange={formik.handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div> */}
              <div className="col-md-12 mb-4">
                <Box mb={2}>
                  <TextField
                    label="Enter Tags"
                    variant="outlined"
                    fullWidth
                    onKeyDown={handleTagAdd}
                    placeholder="Press Enter to add a tag"
                  />
                  <Box
                    display="flex"
                    alignItems="center"
                    flexWrap="wrap"
                    className="mt-2"
                    gap={1}
                    sx={{ marginBottom: "8px" }}
                  >
                    {values.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        onDelete={() => handleTagRemove(index)}
                        sx={{ marginBottom: "8px" }}
                        color="primary"
                      />
                    ))}
                  </Box>
                </Box>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-4 px-3 pt-2">
          <div className="card-body">
            <h6 className="mb-4">Product Detail</h6>
            <div className="row">
              <div className="col-md-4 mb-4">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Quantity
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="quantity"
                    value={formik.values?.quantity}
                    onChange={formik.handleChange}
                    error={ifError("quantity")}
                    label="Quantity"
                  >
                    <MenuItem value=" ">&nbsp;</MenuItem>
                    <MenuItem value="10 gm">10 gm</MenuItem>
                    <MenuItem value="20 gm">20 gm</MenuItem>
                    <MenuItem value="30 gm">30 gm</MenuItem>
                    <MenuItem value="50 gm">50 gm</MenuItem>
                    <MenuItem value="75 gm">75 gm</MenuItem>
                    <MenuItem value="100 gm">100 gm</MenuItem>
                    <MenuItem value="120 gm">120 gm</MenuItem>
                    <MenuItem value="125 gm">125 gm</MenuItem>
                    <MenuItem value="150 gm">150 gm</MenuItem>
                    <MenuItem value="200 gm">200 gm</MenuItem>
                    <MenuItem value="250 gm">250 gm</MenuItem>
                    <MenuItem value="300 gm">300 gm</MenuItem>
                    <MenuItem value="500 gm">500 gm</MenuItem>
                    <MenuItem value="750 gm">750 gm</MenuItem>
                    <MenuItem value="1 kg">1 kg</MenuItem>
                    <MenuItem value="2 kg">2 kg</MenuItem>
                    <MenuItem value="5 kg">5 kg</MenuItem>
                  </Select>
                </FormControl>
                {ifError("quantity") && (
                  <p className="text-danger">{errors.quantity}</p>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <div
                  className={`switch-container ${
                    formik.values.is_manually_popular && "active"
                  }`}
                  onClick={() =>
                    formik.setFieldValue(
                      "is_manually_popular",
                      !formik.values.is_manually_popular
                    )
                  }
                >
                  <div className="">Product Popular</div>
                  <div>
                    <IosSwitch
                      checked={formik.values.is_manually_popular}
                      onChange={(e) =>
                        formik.setFieldValue(
                          "is_manually_popular",
                          e.target.checked
                        )
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div
                  className={`switch-container ${
                    formik.values.is_manually_best_choice && "active"
                  }`}
                  onClick={() =>
                    formik.setFieldValue(
                      "is_manually_best_choice",
                      !formik.values.is_manually_best_choice
                    )
                  }
                >
                  <div className="">Best Choice</div>
                  <div>
                    <IosSwitch
                      checked={formik.values.is_manually_best_choice}
                      onChange={(e) =>
                        formik.setFieldValue(
                          "is_manually_best_choice",
                          e.target.checked
                        )
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div
                  className={`switch-container ${
                    formik.values.is_delicious && "active"
                  }`}
                  onClick={() =>
                    formik.setFieldValue(
                      "is_delicious",
                      !formik.values.is_delicious
                    )
                  }
                >
                  <div className="">Delicious</div>
                  <div>
                    <IosSwitch
                      checked={formik.values.is_delicious}
                      onChange={(e) =>
                        formik.setFieldValue("is_delicious", e.target.checked)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div
                  className={`switch-container ${
                    formik.values.is_best_price && "active"
                  }`}
                  onClick={() =>
                    formik.setFieldValue(
                      "is_best_price",
                      !formik.values.is_best_price
                    )
                  }
                >
                  <div className="">Best Price</div>
                  <div>
                    <IosSwitch
                      checked={formik.values.is_best_price}
                      onChange={(e) =>
                        formik.setFieldValue("is_best_price", e.target.checked)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div
                  className={`switch-container ${
                    formik.values.is_healthy_bites && "active"
                  }`}
                  onClick={() =>
                    formik.setFieldValue(
                      "is_healthy_bites",
                      !formik.values.is_healthy_bites
                    )
                  }
                >
                  <div className="">Quick Healthy Bites</div>
                  <div>
                    <IosSwitch
                      checked={formik.values.is_healthy_bites}
                      onChange={(e) =>
                        formik.setFieldValue("is_healthy_bites", e.target.checked)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-4">
                <TextField
                  id="outlined-basic"
                  label="Description"
                  name="long_description"
                  value={formik.values?.long_description}
                  onChange={formik.handleChange}
                  error={ifError("long_description")}
                  helperText={
                    ifError("long_description") && errors.long_description
                  }
                  multiline
                  rows={3}
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-4 px-3 pt-2">
          <div className="card-body">
            <h6 className="mb-4">Options</h6>
            <div className="row">
              <div className="col-md-4 mb-4">
                <TextField
                  id="outlined-basic"
                  label="Stock"
                  variant="outlined"
                  fullWidth
                  name="stock"
                  value={formik.values?.stock}
                  onChange={formik.handleChange}
                  error={ifError("stock")}
                  helperText={ifError("stock") && errors.stock}
                />
              </div>
              <div className="col-md-4 mb-4">
                <TextField
                  id="outlined-basic"
                  label="Price"
                  variant="outlined"
                  name="max_price"
                  value={formik.values?.max_price}
                  onChange={formik.handleChange}
                  error={ifError("max_price")}
                  helperText={ifError("max_price") && errors.max_price}
                  fullWidth
                />
              </div>
              <div className="col-md-4 mb-4">
                <TextField
                  id="outlined-basic"
                  label="Discount"
                  variant="outlined"
                  name="discount"
                  type="number"
                  value={formik.values?.discount}
                  onChange={formik.handleChange}
                  error={ifError("discount")}
                  helperText={ifError("discount") && errors.discount}
                  fullWidth
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-4 px-3 pt-2">
          <div className="card-body">
            <h6 className="mb-4">Meta Details</h6>
            <div className="row">
              <div className="col-md-6 mb-4">
                <TextField
                  id="outlined-basic"
                  label="Meta Title"
                  name="meta_title"
                  value={formik.values?.meta_title}
                  onChange={formik.handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="col-md-6">
                <div className="d-flex flex-wrap">
                  <Box mb={2} className="w-100">
                    <TextField
                      label="Enter Meta Keywords"
                      variant="outlined"
                      fullWidth
                      onKeyDown={handleMetaKeywordAdd}
                      placeholder="Press Enter to add a keyword"
                    />
                    <Box
                      display="flex"
                      alignItems="center"
                      flexWrap="wrap"
                      className="mt-2"
                      gap={1}
                      sx={{ marginBottom: "8px" }}
                    >
                      {values.meta_keywords.map((keyword, index) => (
                        <Chip
                          key={index}
                          label={keyword}
                          onDelete={() => handleMetaKeywordRemove(index)}
                          sx={{ marginBottom: "8px" }}
                          color="primary"
                        />
                      ))}
                    </Box>
                  </Box>
                </div>
              </div>
              <div className="col-md-12 mb-4">
                <TextField
                  id="outlined-basic"
                  label="Meta Description"
                  name="meta_description"
                  value={formik.values?.meta_description}
                  onChange={formik.handleChange}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-4 px-3 pt-2">
          <div className="card-body">
            <div className="d-flex gap-3 justify-content-end">
              <YellowButton
                lable={
                  loading ? (
                    "Updating..."
                  ) : isEditMode ? (
                    "Update Product"
                  ) : (
                    "Add Product"
                  )
                }
                handleClick={formik.handleSubmit}
                disabled={loading}
              />
              <RejectButton
                lable="Cancel"
                disabled={loading}
                handleClick={() => {
                  resetForm();
                }}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProductAdd;
