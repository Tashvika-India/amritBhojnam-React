import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
  Chip,
} from "@mui/material";
import RejectButton from "@/components/buttons/RejectButton";
import YellowButton from "@/components/buttons/YellowButton";
import MultiFileUpload from "../../../../components/fileUpload/MultiFileUpload";
import { getCategoriesApi } from "@/services/adminApiRoutes";
import { setIn, useFormik } from "formik";
import { productInitalValues } from "@/utils/form-inital-values/InitalValues";
import {
  getNutritionApi,
  getSubCategoriesApi,
  postProductApi,
  putProductApi,
} from "../../../../services/adminApiRoutes";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { baseURL } from "../../../../utils/constant-variable";
import IosSwitch from "../../../../components/ui/IosSwitch";
import {
  notifyError,
  notifySuccess,
} from "../../../../components/ui/Notification";
import NutritionComponent from "../product-nutrition/NutritionComponent";
import { RxCross2 } from "react-icons/rx";
import { productSchema } from "../../../../schemas/product-schema";

const validationSchema = Yup.object({
  name: Yup.string().required("Product name is required"),
  // Add more validations as needed
});
const ProductAdd = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [nutritionList, setNutritionList] = useState([]);
  const location = useLocation();
  const ifError = (key) => errors[key] && touched[key];
  const product = location?.state;
  const isEditMode = !!product;
  const navigate = useNavigate();
  const [activeOption, setActiveOption] = useState(0);
  const [activeInput, setActiveInput] = useState(false);

  const addUrl = location?.pathname;


  const handleTagAdd = (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      const newTag = event.target.value.trim();
      setValues((prevValues) => ({
        ...prevValues,
        tags: [...(prevValues.tags || []), newTag],
      }));
      event.target.value = "";
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
        ? updateProduct({
          ...values,
          max_price: Number(formik.values.max_price),
        })
        : addProduct({ ...values, discount: values.discount || 0 });
    },
  });
  const { values, resetForm, setValues, errors, touched } = formik;

  console.log(errors);
  

  async function addProduct(values) {
    try {
      setLoading(true);
      const response = await postProductApi(values);
      navigate("/admin/product");
      resetForm();
      setLoading(false);
      notifySuccess("Product Added Successfully");
    } catch (error) {
      setLoading(false);
      notifyError(error.response?.data?.error);
      throw error;
    }
  }

  async function updateProduct(values) {
    try {
      setLoading(true);
      const response = await putProductApi(product?.id, values);
      resetForm();
      navigate("/admin/product");
      notifySuccess("Product Updated Successfully");
      setLoading(false);
    } catch (error) {
      notifyError(error.response?.data?.error);
      setLoading(false);
      throw error;
    }
  }

  async function getNutrition() {
    setLoading(true);
    try {
      const response = await getNutritionApi();
      setNutritionList(response?.data || []);
    } catch (error) {
      console.log("Error on Nutrition List", error);
    } finally {
      setLoading(false);
    }
  }

  const handleNutritionChange = (data) => {
    setFieldValue("nutritions[]", data);
  };

  async function getCaterioes() {
    try {
      const response = await getCategoriesApi();
      const filteredData = (response?.data || []).filter(
        (item) => item.is_active === true
      );
      setCategories(filteredData);
    } catch (error) {
      notifyError("Failed to save coupon. Please try again.");
      console.log("Error on Category List", error);
    }
  }

  async function getSubCaterioes() {
    try {
      const response = await getSubCategoriesApi();
      const filteredSubData = (response?.data || []).filter(
        (item) => item.is_active === true
      );
      setSubCategories(filteredSubData);
    } catch (error) {
      console.log("Error on Category List", error);
    }
  }

  useEffect(() => {
    getCaterioes();
    getSubCaterioes();
    getNutrition();
    if (isEditMode) {
      setValues(product);
    }
  }, [product]);

  useEffect(() => {
    if (addUrl == "/admin/add-product") {
      setActiveInput(true);
    }
  }, [product]);

  function handleAddOption() {
    formik.setFieldValue("options", [
      ...values.options,
      {
        option: "",
        measurement_unit: "",
        max_price: 0,
        discount: 0,
        stock: 0,
        length: "",
        breadth: "",
        height: "",
      },
    ]);
  }

  const handleRemoveOption = (index) => {
    const updatedOptions = [...values.options];
    updatedOptions.splice(index, 1); // Remove the option at the specified index
    formik.setFieldValue("options", updatedOptions);
  
    // Reset the active option to the first one if the removed option was the active one
    if (activeOption >= updatedOptions.length) {
      setActiveOption(updatedOptions.length - 1);
    }
  };

  function handleOptionsChange(name, value, number = false) {
    const updatedOptions = [...values.options];
    updatedOptions[activeOption][name] = value;
    formik.setFieldValue("options", updatedOptions);
  }

  return (
    <>
      <div className="mt-5 mb-5 row">
        <div className="col-md-12 d-flex justify-content-between align-items-center">
          <Heading value={(!isEditMode) ? "Add Product" : "Edit Product"} />
          {
            (isEditMode) && <button className="button-primary" type="button" onClick={() => setActiveInput(!activeInput)}>Edit Product</button>
          }
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
                disabled={!activeInput}
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
                  disabled={!activeInput}
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
                  disabled={!activeInput}
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
                  disabled={!activeInput}
                />
              </div>
              <div className="col-md-4 mb-4">
                <FormControl fullWidth
                  disabled={!activeInput}>
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
                <FormControl fullWidth
                  disabled={!activeInput}>
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
                  disabled={!activeInput}
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
                  disabled={!activeInput}
                />
              </div>
              <div className="col-md-12 mb-4">
                <Box mb={2}>
                  <TextField
                    label="Enter Tags"
                    variant="outlined"
                    fullWidth
                    disabled={!activeInput}
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
                    {values?.tags?.map((tag, index) => (
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
                <div
                  className={`switch-container ${formik.values.is_manually_popular && "active"
                    }`} style={{ pointerEvents: `${(!activeInput) ? "none" : "auto"}`, filter: `${(!activeInput) ? "grayscale(100%)" : "none"}` }}
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
                  className={`switch-container ${formik.values.is_manually_best_choice && "active"
                    }`}
                  style={{ pointerEvents: `${(!activeInput) ? "none" : "auto"}`, filter: `${(!activeInput) ? "grayscale(100%)" : "none"}` }}
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
                  className={`switch-container ${formik.values.is_delicious && "active"
                    }`}
                  style={{ pointerEvents: `${(!activeInput) ? "none" : "auto"}`, filter: `${(!activeInput) ? "grayscale(100%)" : "none"}` }}
                  onClick={() =>
                    formik.setFieldValue(
                      "is_delicious",
                      !formik.values.is_delicious
                    )
                  }
                >
                  <div className="">Healthy & Tasty</div>
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
                  className={`switch-container ${formik.values.is_best_price && "active"
                    }`}
                  style={{ pointerEvents: `${(!activeInput) ? "none" : "auto"}`, filter: `${(!activeInput) ? "grayscale(100%)" : "none"}` }}
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
                  className={`switch-container ${formik.values.is_healthy_bites && "active"
                    }`}
                  style={{ pointerEvents: `${(!activeInput) ? "none" : "auto"}`, filter: `${(!activeInput) ? "grayscale(100%)" : "none"}` }}
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
                        formik.setFieldValue(
                          "is_healthy_bites",
                          e.target.checked
                        )
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
                  disabled={!activeInput}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-4 px-3 pt-2">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="mb-4">Options</h6>
            </div>
            <div className="mb-4 mt-2">
              {values?.options?.map((_, index) => (
                <div key={index} className="d-inline-block me-3">
                  <button
                    className={`option-button py-2 px-3 rounded ${activeOption === index && "active"
                      }`}
                    type="button"
                    onClick={() => setActiveOption(index)}
                  >
                    Option {index + 1}  {index > 0 && ( // Only show the remove button for options other than the first one
                    <button
                      type="button"
                      className="btn btn-danger px-1 btn-sm ms-2"
                      onClick={() => handleRemoveOption(index)}
                    >
                    <RxCross2 />
                    </button>
                  )}
                  </button>
                </div>
              ))}
              <p
                className="m-0 d-inline cursor-pointer"
                onClick={handleAddOption}
                type="button"
              >
                Add New Options +
              </p>
            </div>
            <div className="row">
              <div className="col-md-4 mb-4">
                <TextField
                  id="outlined-basic"
                  label="Option"
                  placeholder="eg: 250"
                  variant="outlined"
                  type="number"
                  fullWidth
                  disabled={!activeInput}
                  name="option"
                  value={formik.values?.options[activeOption]?.option}
                  onChange={(event) =>
                    handleOptionsChange("option", event.target.value)
                  }/>
                  <p className="text-danger">{errors.options?.[activeOption]?.option}</p>
              </div>
              <div className="col-md-4 mb-4">
                <FormControl fullWidth
                  disabled={!activeInput}>
                  <InputLabel id="demo-simple-select-unit">Unit</InputLabel>
                  <Select
                    labelId="demo-simple-select-unit"
                    id="demo-simple-select"
                    name="measurement_unit"
                    value={formik.values?.options[activeOption]?.measurement_unit}
                    onChange={(event) =>
                      handleOptionsChange("measurement_unit", event.target.value)
                    }
                    label="Unit">
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="gm">gm</MenuItem>
                    <MenuItem value="kg">kg</MenuItem>
                  </Select>
                  <p className="text-danger">{errors.options?.[activeOption]?.measurement_unit}</p>
                </FormControl>
              </div>
              <div className="col-md-4 mb-4">
                <TextField
                  id="outlined-basic"
                  label="Stock"
                  variant="outlined"
                  fullWidth
                  disabled={!activeInput}
                  name="stock"
                  value={formik.values?.options[activeOption]?.stock}
                  onChange={(event) =>
                    handleOptionsChange("stock", event.target.value)
                  }
                />
                <p className="text-danger">{errors.options?.[activeOption]?.stock}</p>
              </div>
              <div className="col-md-4 mb-4">
                <TextField
                  id="outlined-basic"
                  type="number"
                  label="Price"
                  variant="outlined"
                  name="max_price"
                  value={formik.values?.options[activeOption]?.max_price}
                  onChange={(event) =>
                    handleOptionsChange("max_price", event.target.value, true)
                  }
                  fullWidth
                  disabled={!activeInput}
                />
                <p className="text-danger">{errors.options?.[activeOption]?.max_price}</p>
              </div>
              <div className="col-md-4 mb-4">
                <TextField
                  id="outlined-basic"
                  label="Discount %"
                  placeholder="eg : 10"
                  variant="outlined"
                  name="discount"
                  value={formik.values?.options[activeOption]?.discount}
                  onChange={(event) =>
                    handleOptionsChange("discount", event.target.value, true)
                  }
                  fullWidth
                  disabled={!activeInput}
                />
                <p className="text-danger">{errors.options?.[activeOption]?.discount}</p>
              </div>
              <div className="col-md-4 mb-4">
                <TextField
                  id="outlined-basic"
                  label="Length (cm)"
                  name="length"
                  value={formik.values?.options[activeOption]?.length}
                  onChange={(event) =>
                    handleOptionsChange("length", event.target.value)
                  }
                  variant="outlined"
                  fullWidth
                  disabled={!activeInput}
                />
                <p className="text-danger">{errors.options?.[activeOption]?.length}</p>
              </div>
              <div className="col-md-4 mb-4">
                <TextField
                  id="outlined-basic"
                  label="Breadth (cm)"
                  name="breadth"
                  value={formik.values?.options[activeOption]?.breadth}
                  onChange={(event) =>
                    handleOptionsChange("breadth", event.target.value)
                  }
                  variant="outlined"
                  fullWidth
                  disabled={!activeInput}
                />
                <p className="text-danger">{errors.options?.[activeOption]?.breadth}</p>
              </div>
              <div className="col-md-4 mb-4">
                <TextField
                  id="outlined-basic"
                  label="Height (cm)"
                  variant="outlined"
                  name="height"
                  value={formik.values?.options[activeOption]?.height}
                  onChange={(event) =>
                    handleOptionsChange("height", event.target.value)
                  }
                  fullWidth
                  disabled={!activeInput}
                />
                <p className="text-danger">{errors.options?.[activeOption]?.height}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-4 px-3 pt-2">
          <div className="card-body">
            <h6 className="mb-4">Nutrition Details</h6>
            <div className="col-12">
              <NutritionComponent
                nutritionList={nutritionList}
                formik={formik}
                disabled={!activeInput}
              />
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
                  disabled={!activeInput}
                />
              </div>
              <div className="col-md-6">
                <div className="d-flex flex-wrap">
                  <Box mb={2} className="w-100">
                    <TextField
                      label="Enter Meta Keywords"
                      variant="outlined"
                      fullWidth
                      disabled={!activeInput}
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
                  disabled={!activeInput}
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
                  loading
                    ? "Updating..."
                    : (isEditMode)
                      ? "Update Product"
                      : "Add Product"
                }
                handleClick={formik.handleSubmit}
                disabled={!activeInput || loading}
              />
              <RejectButton
                lable="Cancel"
                disabled={loading}
                handleClick={() => {
                  navigate(-1);
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
