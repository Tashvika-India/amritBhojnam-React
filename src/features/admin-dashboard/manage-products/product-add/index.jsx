import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import RejectButton from "@/components/buttons/RejectButton";
import YellowButton from "@/components/buttons/YellowButton";
import MultiFileUpload from "../../../../components/fileUpload/MultiFileUpload";
import { getCategoriesApi } from "@/services/adminApiRoutes";
import { useFormik } from "formik";
import { productInitalValues } from "@/utils/form-inital-values/InitalValues";
import { postProductApi, putProductApi } from "../../../../services/adminApiRoutes";
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
  const location = useLocation();
  const product = location?.state;
  const isEditMode = !!product;
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: productInitalValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      isEditMode ? updateProduct(values) : addProduct(values);
    },
  });
  const { values, handleSubmit, resetForm, setValues, handleBlur, handleChange } = formik;
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  async function addProduct(values) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("category_id", values.category_id);
    formData.append("short_description", values.short_description);
    formData.append("long_description", values.long_description);
    formData.append("quantity", values.quantity);
    formData.append("quantity_unit", values.quantity_unit);
    formData.append("max_price", values.max_price);
    formData.append("offer_price", values.offer_price);
    formData.append("nutritions", values.nutritions);

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
    formData.append("short_description", values.short_description);
    formData.append("long_description", values.long_description);
    formData.append("quantity", values.quantity);
    formData.append("quantity_unit", values.quantity_unit);
    formData.append("max_price", values.max_price);
    formData.append("offer_price", values.offer_price);
    formData.append("nutritions", values.nutritions);
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

  useEffect(() => {
    getCaterioes();
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
        <div className="card mb-4">
          <div className="card-body">
            <h6 className="mb-4">Image</h6>
            <div className="">
              <MultiFileUpload formik={formik} name="images" baseURL={baseURL} />
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <h6 className="mb-4">Product</h6>
            <div className="row">
              <div className="col-md-4 mb-4">
                <TextField
                  id="outlined-basic"
                  name="name"
                  value={values?.name}
                  onChange={handleChange}
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
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select Type"
                  // onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
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
                    value=""
                    label="Select Sub Category"
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-4 mb-4">
                <TextField
                  type="date"
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="col-md-4 mb-4">
                <TextField
                  id="outlined-basic"
                  label="Days"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="col-md-4 mb-4">
                <TextField
                  id="outlined-basic"
                  label="Enter Tags"
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <h6 className="mb-4">Product Detail</h6>
            <div className="row">
              <div className="col-md-4 mb-4">
                <TextField
                  id="outlined-basic"
                  label="Unit Type"
                  variant="outlined"
                  name="quantity_unit"
                  value={formik.values?.quantity_unit}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </div>
              <div className="col-md-4 mb-4">
                <TextField
                  id="outlined-basic"
                  label="Unit Title"
                  variant="outlined"
                  name="quantity"
                  value={formik.values?.quantity}
                  onChange={formik.handleChange}
                  fullWidth
                />
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
        <div className="card mb-4">
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
        <div className="card mb-4">
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
