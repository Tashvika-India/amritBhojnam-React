import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import YellowButton from "../../../../components/buttons/YellowButton";
import RejectButton from "../../../../components/buttons/RejectButton";
import { TextField } from "@mui/material";
import IosSwitch from "../../../../components/ui/IosSwitch";
import FileUpload from "../../../../components/fileUpload/FileUpload";
import { useFormik } from "formik";
import axios from "axios";

export default function AddCategoryModal({ visible, setVisible }) {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3Mjg2Mjc3LCJpYXQiOjE3MjcwNzAyNzcsImp0aSI6IjE5YzM3NzkwYjUxNzQwYTdhYjQ0OWNjMTJlNDFlZTE5IiwidXNlcl9pZCI6IjgwY2QxZjE2LTkzYTEtNDMyNi1iOWExLTAwOTdjZmE2YmU2NCJ9.QBFbcDNst64U6oPwsrDIju1oSYqrkmz8H0Nbu3_URr4";
  const apiUrl = "https://dev-env.amritbhojanam.com/api/categories/";

  const initialValues = {
    name: "",
    img_file: null,
    active: true,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("img_file", values.img_file);
      try {
        const response = await axios.post(apiUrl, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Category added successfully", response.data);
        setVisible(false);
      } catch (error) {
        console.error("Error adding category", error);
      }
    },
  });

  const testGetApi = async () => {
    try {
      const response = await axios.get(
        "https://dev-env.amritbhojanam.com/api/categories/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response data:", response.data);
    } catch (error) {
      if (error.response) {
        console.log("Error Status:", error.response.status);
        console.log("Error Data:", error.response.data);
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  };

  const footerContent = (
    <div className="d-inline-flex gap-3">
      <RejectButton lable="Cancel" handleClick={() => setVisible(false)} />
      <YellowButton lable="+ Add" handleClick={formik.handleSubmit} />
    </div>
  );

  const customHeader = (
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
  );

  useEffect(() => {
    testGetApi();
  }, []);

  return (
    <div className="card flex justify-content-center">
      <Dialog
        visible={visible}
        style={{ width: "40vw" }}
        className="rounded-20"
        onHide={() => setVisible(false)}
        footer={footerContent}
        closable={false}
        header={customHeader}
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
