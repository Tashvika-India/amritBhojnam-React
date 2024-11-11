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
  Autocomplete,
} from "@mui/material";
import ProfileAvatar from "../../../../assets/images/dashboard/profile-avatar.png";
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
import { Checkbox } from "primereact/checkbox";

const validationSchema = Yup.object({
  name: Yup.string().required("Product name is required"),
  // Add more validations as needed
});
const EmployeeAdd = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const location = useLocation();
  const product = location?.state;
  const isEditMode = !!product;
  const navigate = useNavigate();

  const [tags, setTags] = useState([""]);


  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
      title: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
    },

   
  ];

  const options = top100Films.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

 

  const addTag = () => setTags([...tags, ""]);
  const removeTag = (index) => setTags(tags.filter((_, i) => i !== index));

  const [keyword, setKeyword] = useState([""]);

  const addKeyword = () => setKeyword([...keyword, ""]);
  const removeKeyword = (index) =>
    setKeyword(keyword.filter((_, i) => i !== index));

  const formik = useFormik({
    initialValues: productInitalValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      isEditMode ? updateProduct(values) : addProduct(values);
    },
  });
  const {
    values,
    handleSubmit,
    resetForm,
    setValues,
    handleBlur,
    handleChange,
    setFieldValue,
  } = formik;
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const handleTagsChange = (index, value) => {
    const updatedTags = [...tags];
    updatedTags[index] = value;
    setTags(updatedTags);
    setFieldValue("tags", updatedTags);
  };

  const handleKeywordChange = (index, value) => {
    const updatedKeyword = [...keyword];
    updatedKeyword[index] = value;
    setTags(updatedKeyword);
    setFieldValue("meta_keywords", updatedKeyword);
  };

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

    // Append tags
    values.tags?.forEach((tag, index) => {
      if (tag.trim()) {
        formData.append(`tags[${index}]`, tag.trim());
      }
    });

    values.keyword?.forEach((key, index) => {
      if (key.trim()) {
        formData.append(`meta_keywords[${index}]`, key.trim());
      }
    });

    if (values.images && Array.isArray(values.images)) {
      values.images.forEach((image, index) => {
        if (image instanceof File) {
          if (image.size > MAX_FILE_SIZE) {
            console.error(`Image at index ${index} exceeds the size limit.`);
            return; // Skip this image or set an error state
          }
          const validFormats = ["image/jpeg", "image/png", "image/gif"];
          if (!validFormats.includes(image.type)) {
            console.error(`Image at index ${index} is not a valid format.`);
            return; // Skip this image or set an error state
          }
          formData.append("images", image);
        } else {
          console.error(
            `Image at index ${index} is not a valid File instance.`
          );
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

    // Append tags
    values.tags?.forEach((tag, index) => {
      if (tag.trim()) {
        formData.append(`tags[${index}]`, tag.trim());
      }
    });

    values.keyword?.forEach((key, index) => {
      if (key.trim()) {
        formData.append(`meta_keywords[${index}]`, key.trim());
      }
    });

    if (values.images && Array.isArray(values.images)) {
      values.images.forEach((image, index) => {
        if (image instanceof File) {
          if (image.size > MAX_FILE_SIZE) {
            console.error(`Image at index ${index} exceeds the size limit.`);
            return; // Skip this image or set an error state
          }
          const validFormats = ["image/jpeg", "image/png", "image/gif"];
          if (!validFormats.includes(image.type)) {
            console.error(`Image at index ${index} is not a valid format.`);
            return; // Skip this image or set an error state
          }
          formData.append("images", image);
        } else {
          console.error(
            `Image at index ${index} is not a valid File instance.`
          );
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
      setTags(product?.tags);
      setKeyword(product?.meta_keywords);
    }
  }, [product]);

  return (
    <>
      <div className="mt-3 mb-5 row">
        <div className="col-md-6">
          <Heading value={isEditMode ? "Edit Product" : "Add New Employee"} />
        </div>
      </div>
      <form className="w-75" onSubmit={formik.handleSubmit}>
        <div className="card mb-4">
          <div className="card-body">
            <h6 className="mb-4">Avatar</h6>
            <div className="d-flex align-items-center">
              <div>
                <img
                  src={ProfileAvatar}
                  alt="logo"
                  className="img-fluid"
                  loading="lazy"
                />
              </div>
              <div className="ps-5">
                <button className="button-primary d-block">Upload New</button>
                <button className="button-red d-block mt-2">Delete</button>
              </div>
            </div>
            <h6 className="my-4 mt-5">General</h6>
            <div className="container fb-container">
              <div className="row">
                <div className="col-md-6">
                  <TextField
                    fullWidth
                    className="rounded-20"
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                  />
                </div>
                <div className="col-md-6">
                  <TextField
                    fullWidth
                    className="rounded-20"
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                  />
                </div>
                <div className="col-md-6 mt-4">
                  <TextField
                    fullWidth
                    className="rounded-20"
                    id="outlined-basic"
                    label="Mobile Number"
                    variant="outlined"
                  />
                  <div className="d-flex align-items-center pt-2">
                    <div>
                      {" "}
                      <Checkbox
                        onChange={(e) => setChecked(e.checked)}
                        checked={checked}
                      ></Checkbox>
                    </div>
                    <div>
                      <p className="mb-0 ps-3 pt-1">
                        Set mobile number as verified
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-4">
                  <TextField
                    fullWidth
                    className="rounded-20"
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                  />
                  <div className="d-flex align-items-center pt-2">
                    <div>
                      {" "}
                      <Checkbox
                        onChange={(e) => setChecked(e.checked)}
                        checked={checked}
                      ></Checkbox>
                    </div>
                    <div>
                      <p className="mb-0 ps-3 pt-1">
                        Set email number as verified
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-4">
                  <Autocomplete className="w-100"
                    options={options.sort(
                      (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                    )}
                    groupBy={(option) => option.firstLetter}
                    getOptionLabel={(option) => option.title}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Roles" />
                    )}
                  />
                </div>
                <div className="col-md-6 mt-4">
                  <TextField
                    fullWidth
                    className="rounded-20"
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </form>
    </>
  );
};

export default EmployeeAdd;
