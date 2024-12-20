import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button, IconButton,
  Box,
  Chip
} from "@mui/material";
import { Add, Remove } from '@mui/icons-material';
import RejectButton from "@/components/buttons/RejectButton";
import YellowButton from "@/components/buttons/YellowButton";
import MultiFileUpload from "../../../../components/fileUpload/MultiFileUpload";
import { getCategoriesApi } from "@/services/adminApiRoutes";
import { useFormik } from "formik";
import { productInitalValues } from "@/utils/form-inital-values/InitalValues";
import { getSubCategoriesApi, postProductApi, putProductApi } from "../../../../services/adminApiRoutes";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../../components/ui/Loading";
import * as Yup from "yup";
import { baseURL } from "../../../../utils/constant-variable";


const validationSchema = Yup.object({
  name: Yup.string().required("Product name is required"),
  // Add more validations as needed
});
const ProductAdd = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const location = useLocation();
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
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      isEditMode ? updateProduct(values) : addProduct(values);
    },
  });
  const { values, handleSubmit, resetForm, setValues, handleBlur, handleChange, setFieldValue } = formik;
  const MAX_FILE_SIZE = 5 * 1024 * 1024;



  async function addProduct(values) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("category_id", values.category_id);
    formData.append("sub_category_id", values.sub_category_id);
    formData.append("short_description", values.short_description);
    formData.append("long_description", values.long_description);
    formData.append("quantity", values.quantity);
    formData.append("quantity_unit", values.quantity_unit);
    formData.append("max_price", values.max_price);
    formData.append("offer_price", values.offer_price);
    formData.append("nutritions", values.nutritions);
    formData.append("is_manually_popular", values.is_manually_popular);
    formData.append("is_manually_best_choice", values.is_manually_best_choice);
    formData.append("is_delicious", values.is_delicious);
    formData.append("is_deleted", values.is_deleted);
    formData.append("product_type", values.product_type);
    formData.append("days", values.days);
    formData.append("mfg_date", values.mfg_date);
    formData.append("ratings", values.ratings);
    formData.append("meta_title", values.meta_title);
    formData.append("meta_description", values.meta_description);

    // Add tags as a comma-separated string
    if (values.tags && Array.isArray(values.tags)) {
      formData.append("tags", values.tags.join(","));
    }


    // Add meta_keywords as a comma-separated string
    if (values.meta_keywords && Array.isArray(values.meta_keywords)) {
      formData.append("meta_keywords", values.meta_keywords.join(","));
    }

    if (values.images && Array.isArray(values.images)) {
      values.images.forEach((image, index) => {
        if (image instanceof File) {
          if (image.size > MAX_FILE_SIZE) {
            console.error(`Image at index ${index} exceeds the size limit.`);
            return; // Skip this image or set an error state
          }
          const validFormats = ['image/jpeg', 'image/png', 'image/gif'];
          if (!validFormats.includes(image.type)) {
            console.error(`Image at index ${index} is not a valid format.`);
            return; // Skip this image or set an error state
          }
          formData.append("images", image);
        } else {
          console.error(`Image at index ${index} is not a valid File instance.`);
        }
      });
    }
    try {
      const response = await postProductApi(formData);
      navigate("/product");
      resetForm();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }

  async function updateProduct(values) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("category_id", values.category_id);
    formData.append("sub_category_id", values.sub_category_id);
    formData.append("short_description", values.short_description);
    formData.append("long_description", values.long_description);
    formData.append("quantity", values.quantity);
    formData.append("quantity_unit", values.quantity_unit);
    formData.append("max_price", values.max_price);
    formData.append("offer_price", values.offer_price);
    formData.append("nutritions", values.nutritions);
    formData.append("is_manually_popular", values.is_manually_popular);
    formData.append("is_manually_best_choice", values.is_manually_best_choice);
    formData.append("is_delicious", values.is_delicious);
    formData.append("is_deleted", values.is_deleted);
    formData.append("product_type", values.product_type);
    formData.append("days", values.days);
    formData.append("mfg_date", values.mfg_date);
    formData.append("ratings", values.ratings);
    formData.append("meta_title", values.meta_title);
    formData.append("meta_description", values.meta_description);

    // Add tags as a comma-separated string
    if (values.tags && Array.isArray(values.tags)) {
      formData.append("tags", values.tags.join(","));
    }

    // Add meta_keywords as a comma-separated string
    if (values.meta_keywords && Array.isArray(values.meta_keywords)) {
      formData.append("meta_keywords", values.meta_keywords.join(","));
    }


    if (values.images && Array.isArray(values.images)) {
      values.images.forEach((image, index) => {
        if (image instanceof File) {
          if (image.size > MAX_FILE_SIZE) {
            console.error(`Image at index ${index} exceeds the size limit.`);
            return; // Skip this image or set an error state
          }
          const validFormats = ['image/jpeg', 'image/png', 'image/gif'];
          if (!validFormats.includes(image.type)) {
            console.error(`Image at index ${index} is not a valid format.`);
            return; // Skip this image or set an error state
          }
          formData.append("images", image);
        } else {
          console.error(`Image at index ${index} is not a valid File instance.`);
        }
      });
    }
    try {
      const response = await putProductApi(product?.id, formData);
      resetForm();
      navigate("/product");
      setLoading(false);
    } catch (error) {
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
              <MultiFileUpload formik={formik} name="images" baseURL={baseURL} />
            </div>
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
                  fullWidth
                  error={!!formik.errors.name && formik.touched.name}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </div>
              <div className="col-md-8 mb-4">
                <TextField
                  id="outlined-basic"
                  name="short_description"
                  value={formik.values?.short_description}
                  onChange={formik.handleChange}
                  label="Short description"
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
                  >
                    {categories?.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                    label="Select Sub Category"
                  >
                    {subCategories?.map((sub) => (
                      <MenuItem key={sub.id} value={sub.id}>
                        {sub.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-4 mb-4">
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
              </div>
              <div className="col-md-4 mb-4">
                <TextField
                  id="outlined-basic"
                  label="Days"
                  name="days"
                  value={formik.values?.days}
                  onChange={formik.handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
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
              {/* <div className="col-md-4 mb-4">
                <TextField
                  id="outlined-basic"
                  label="Quantity"
                  variant="outlined"
                  name="quantity"
                  value={formik.values?.quantity}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </div>
              <div className="col-md-4 mb-4">
                <TextField
                  id="outlined-basic"
                  label="Quantity Type"
                  variant="outlined"
                  name="quantity_unit"
                  value={formik.values?.quantity_unit}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </div> */}
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
                    label="Quantity">
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
              </div>
              <div className="col-md-12 mb-4">
                <TextField
                  id="outlined-basic"
                  label="Description"
                  name="long_description"
                  value={formik.values?.long_description}
                  onChange={formik.handleChange}
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
                  label="Option"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="col-md-4 mb-4">
                <TextField
                  id="outlined-basic"
                  label="Price"
                  name="max_price"
                  value={formik.values?.max_price}
                  onChange={formik.handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="col-md-4 mb-4">
                <TextField
                  id="outlined-basic"
                  label="Stock"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="col-md-4 mb-4"></div>
              <div className="col-md-4 mb-4">
                <TextField
                  id="outlined-basic"
                  label="Dicsount"
                  variant="outlined"
                  name="offer_price"
                  value={formik.values?.offer_price}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </div>
              <div className="col-md-4 mb-4">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Discount Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value=""
                    label="Discount Type"
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-4 mb-4"></div>
              <div className="col-md-4 mb-4">
                <TextField
                  id="outlined-basic"
                  label="SKU"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="col-md-4 mb-4">
                <TextField
                  id="outlined-basic"
                  label="Unique Barcode(If you want)"
                  variant="outlined"
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
                    <Loading size={24} color="inherit" />
                  ) : isEditMode ? "Update Product" : "Add Product"
                }
                handleClick={formik.handleSubmit}
                disabled={loading}
              />
              <RejectButton lable="Cancel" disabled={loading} handleClick={() => {
                resetForm();
              }} />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProductAdd;
