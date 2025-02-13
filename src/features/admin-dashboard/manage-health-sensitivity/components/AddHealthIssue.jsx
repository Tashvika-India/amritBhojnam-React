import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import YellowButton from "../../../../components/buttons/YellowButton";
import RejectButton from "../../../../components/buttons/RejectButton";
import { TextField } from "@mui/material"; 
import { useFormik } from "formik"; 
import {
  postMealHealthIssue, 
} from "../../../../services/adminApiRoutes";
import Loading from "../../../../components/ui/Loading";
import {
  notifyError,
  notifySuccess,
} from "../../../../components/ui/Notification"; 

export default function AddCategoryModal({
  visible,
  setVisible,  
  getDataList,
}) {
  const [loading, setLoading] = useState(false); 
  const initialValues = {
    health_issues: "", 
  };

  const formik = useFormik({
    initialValues:  initialValues,
    enableReinitialize: true, 
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await postMealHealthIssue(values); 
        notifySuccess("Health Issue Added Successfully"); 
        setVisible(false);
        getDataList();
        resetForm();
        setLoading(false);
      } catch (error) {
        console.error("Failed to update category!", error);
        notifyError(error.response?.data?.error);
        setLoading(false);
      } 
    },
  });

  const { values, handleSubmit, resetForm, setValues, errors } = formik; 


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
                  placeholder="Enter Issue"
                  name="health_issues"
                  onChange={formik.handleChange}
                  value={formik.values.health_issues}
                /> 
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

function FooterContent({ formik, setVisible, loading }) {
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
