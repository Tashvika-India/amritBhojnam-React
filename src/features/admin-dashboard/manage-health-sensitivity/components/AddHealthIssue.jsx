import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import YellowButton from "../../../../components/buttons/YellowButton";
import RejectButton from "../../../../components/buttons/RejectButton";
import { TextField } from "@mui/material";
import IosSwitch from "../../../../components/ui/IosSwitch";
import FileUpload from "../../../../components/fileUpload/FileUpload";
import { useFormik } from "formik";
import { categorySchema } from "../../../../schemas/category-schema";
import {
  postCategoriesApi,
  putCategoriesApi,
} from "../../../../services/adminApiRoutes";
import Loading from "../../../../components/ui/Loading";
import {
  notifyError,
  notifySuccess,
} from "../../../../components/ui/Notification";
import { Checkbox } from "primereact/checkbox";

export default function AddCategoryModal({
  visible,
  setVisible,
  getCategories,
  editData,
}) {
  const [loading, setLoading] = useState(false);
  const [isFirstOrder, setIsFirstOrder] = useState(false);
  const initialValues = {
    name: "",
    img_file: null,
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

    formData.append("is_active", values.is_active);
    try {
      const response = await postCategoriesApi(formData);
      formik.resetForm();
      getCategories();
      setVisible(false);
      notifySuccess("Category Added Successfully");
    } catch (error) {
      notifyError(error.response?.data?.error);
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

    formData.append("is_active", values.is_active);

    try {
      const response = await putCategoriesApi(editData.id, formData); // Assuming you have a PUT API
      formik.resetForm();
      getCategories();
      setVisible(false);
      notifySuccess("Category Updated Successfully");
    } catch (error) {
      console.error("Failed to update category!", error);
      notifyError(error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card flex justify-content-center">
      <Dialog
        visible={visible}
        style={{ width: "40vw" }}
        className="rounded-20 overflow-hidden"
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
             
              <div>
                <TextField
                  fullWidth
                  className="mt-2"
                  variant="outlined"
                  placeholder="Enter Name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <p className="text-danger">{errors.name}</p>
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
        <h5 className="m-0 fs-bold fw-600">
          {formik.values.name
            ? "Edit Health Issue"
            : "Add Health Issue"}
        </h5>
      </div>
    </>
  );
}

function FooterContent({ formik, setVisible, loading, editData }) {
  return (
    <>
      <div className="d-inline-flex gap-3">
        <RejectButton lable="Cancel" handleClick={() => setVisible(false)} />
        <YellowButton
          lable="+ Add"
          handleClick={formik.handleSubmit}
          disabled={loading}
        />
      </div>
    </>
  );
}
