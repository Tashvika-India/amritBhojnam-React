import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import YellowButton from "../../../../components/buttons/YellowButton";
import RejectButton from "../../../../components/buttons/RejectButton";
import { TextField } from "@mui/material";
import IosSwitch from "../../../../components/ui/IosSwitch";
import FileUpload from "../../../../components/fileUpload/FileUpload";
import { useFormik } from "formik";
import { postCategoriesApi } from "../../../../services/adminApiRoutes";

export default function AddCategoryModal({ visible, setVisible }) {
  const initialValues = {
    name: "",
    img_file: null,
    active: true,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      addCategory(values);
    },
  });

  const { values, handleSubmit, resetForm, setValues } = formik;

  async function addCategory(values) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("img_file", values.img_file);
    formik.resetForm();
    try {
      const response = await postCategoriesApi(formData);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {}, []);

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
        <form onSubmit={formik.handleSubmit}>
          <div className="p-fluid">
            <div className="mb-4">
              <FileUpload formik={formik} name="img_file" />
            </div>
            <div className="mb-4">
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Category Name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </div>
          </div>
        </form>
      </Dialog>
    </div>
  );
}

function CustomHeader({ formik }) {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between border-bottom pb-3">
        <h5 className="m-0 fs-bold">Add Category</h5>
        <div>
          <IosSwitch
            checked={formik.values.active}
            onChange={(e) => formik.setFieldValue("active", e.target.checked)}
          />
          <span className="fs-6 text-secondary fw-normal">Active</span>
        </div>
      </div>
    </>
  );
}

function FooterContent({ formik, setVisible }) {
  return (
    <>
      <div className="d-inline-flex gap-3">
        <RejectButton lable="Cancel" handleClick={() => setVisible(false)} />
        <YellowButton lable="+ Add" handleClick={formik.handleSubmit} />
      </div>
    </>
  );
}
