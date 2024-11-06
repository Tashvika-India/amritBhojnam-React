import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import YellowButton from "../../../../components/buttons/YellowButton";
import RejectButton from "../../../../components/buttons/RejectButton";
import {  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField } from "@mui/material";
import IosSwitch from "../../../../components/ui/IosSwitch";
import FileUpload from "../../../../components/fileUpload/FileUpload";
import { useFormik } from "formik";
import {categorySchema } from "../../../../schemas/category-schema";
import { getCategoriesApi, postSubCategoriesApi, putSubCategoriesApi } from "../../../../services/adminApiRoutes";
import Loading from "../../../../components/ui/Loading";
import { notifyError, notifySuccess } from "../../../../components/ui/Notification";

export default function AddSubCategoryModal({ visible, setVisible, getCategories, editData }) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const initialValues = {
    name: "",
    img_file: null,
    category_id: "",
    is_active: true,
  };

  const formik = useFormik({
    initialValues: editData ? editData : initialValues,
    enableReinitialize: true,
    validationSchema: categorySchema,
    onSubmit: async (values) => {
      if (editData) {
        await updateCategory(values); // PUT or PATCH for edit
      } else {
        await addCategory(values); // POST for new category
      }
    },
  });

  const { values, handleSubmit, resetForm, setValues, errors } = formik;

  async function addCategory(values) {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    if (values.img_file instanceof File) {
      formData.append("img_file", values.img_file);
    }
    formData.append("category_id", values.category_id);
    formData.append("is_active", values.is_active);
    try {
      const response = await postSubCategoriesApi(formData);
      formik.resetForm();
      getCategories();
      setVisible(false);
      notifySuccess("Category Added Successfully");
    } catch (error) {
      throw error;
      notifyError("Failed to add category!");
    } finally {
      setLoading(false);
    }
  }


  async function updateCategory(values) {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values?.name);
    if (values.img_file instanceof File) {
      formData.append("img_file", values.img_file);
    }
    formData.append("category_id", values.category_id);
    formData.append("is_active", values.is_active);

    try {
      const response = await putSubCategoriesApi(editData.id, formData); // Assuming you have a PUT API
      formik.resetForm();
      getCategories();
      setVisible(false);
      notifySuccess("Category Updated Successfully");
    } catch (error) {
      console.error("Failed to update category!", error);
      notifyError("Failed to update category!");
    } finally {
      setLoading(false);
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
  }, []);


  return (
    <div className="card flex justify-content-center">
      <Dialog
        visible={visible}
        style={{ width: "40vw" }}
        className="rounded-20"
        onHide={() => setVisible(false)}
        footer={<FooterContent formik={formik} setVisible={setVisible} />}
        closable={false}
        header={<CustomHeader formik={formik} />}
      >
        {loading ? (
          <Loading />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className="p-fluid">
              <div className="mb-4">
                <FileUpload formik={formik} name="img_file" />
                <p>{errors.img_file}</p>
              </div>
              <div className="mb-4">
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
                        {category?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="mb-4">
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Category Name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values?.name}
                />
                <p>{errors.name}</p>
              </div>
            </div>
          </form>
        )}
      </Dialog>
    </div>
  );
}

function CustomHeader({ formik }) {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between border-bottom pb-3">
        <h5 className="m-0 fs-bold">{formik.values.name ? 'Edit Sub Category' : 'Add Sub Category'}</h5>
        <div>
          <IosSwitch
            checked={formik.values.active}
            onChange={(e) => formik.setFieldValue("is_active", e.target.checked)}
          />
          <span className="fs-6 text-secondary fw-normal">Active</span>
        </div>
      </div>
    </>
  );
}

function FooterContent({ formik, setVisible, loading, editData }) {
  return (
    <>
      <div className="d-inline-flex gap-3">
        <RejectButton lable="Cancel" handleClick={() => setVisible(false)} />
        <YellowButton lable="Save Changes" handleClick={formik.handleSubmit} disabled={loading}/>
      </div>
    </>
  );
}
  