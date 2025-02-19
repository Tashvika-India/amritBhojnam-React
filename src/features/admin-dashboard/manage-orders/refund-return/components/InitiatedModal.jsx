import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import Loading from "../../../../../components/ui/Loading";
import { notifyError, notifySuccess } from "../../../../../components/ui/Notification";

export default function InitiatedModal() {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    name: "",
    img_file: null,
    is_active: true,
  };

  
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
              <div className="mb-4">
                <p className="text-danger">{errors.img_file}</p>
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Category Name"
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
        <h5 className="m-0 fs-bold">{formik.values.name ? 'Edit Category' : 'Add Category'}</h5>
        <div>
         
          <span className="fs-6 text-secondary fw-normal">Active</span>
        </div>
      </div>
    </>
  );
}

function FooterContent({ formik, setVisible, loading, editData }) {
  return (
    <>
    
    </>
  );
}
