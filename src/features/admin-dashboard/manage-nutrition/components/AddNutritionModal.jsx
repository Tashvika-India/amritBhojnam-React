import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import YellowButton from "../../../../components/buttons/YellowButton";
import RejectButton from "../../../../components/buttons/RejectButton";
import { TextField } from "@mui/material";
import IosSwitch from "../../../../components/ui/IosSwitch";
import { useFormik } from "formik";
import { postNutritionApi, putNutritionApi } from "../../../../services/adminApiRoutes";
import Loading from "../../../../components/ui/Loading";
import { notifyError, notifySuccess } from "../../../../components/ui/Notification";
import { get } from "lodash";


export default function AddNutritionModal({ visible, setVisible, getNutrition, editData }) {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    name: "",
    unit: "",
  }; 

  const formik = useFormik({
    initialValues: editData ? editData : initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (editData) {
        await updateNutrition(values)
      } else {
        await addNutrition(values)
      }
    },
  });

  const { values, handleSubmit, resetForm, setValues, errors } = formik;

  async function addNutrition(values) {
    setLoading(true);
    try {
      await postNutritionApi(values);
      resetForm();
      getNutrition();
      setVisible(false);
      notifySuccess("Nutrition added successfully!");
    } catch (error) {
      console.error("Error adding nutrition:", error);
      notifyError(error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  } 
  async function updateNutrition(values) {
    setLoading(true);
    try {
      await putNutritionApi({nutrition_id: editData.id , name: values.name, unit: values.unit});  
      resetForm();
      getNutrition();
      setVisible(false);
      notifySuccess("Nutrition Updated successfully!");
    } catch (error) {
      console.error("Error Updating nutrition:", error);
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
        footer={<FooterContent formik={formik} setVisible={setVisible} loading={loading} />}
        closable={false}
        header={<CustomHeader formik={formik} editData={editData} />}
      >
        {loading ? (
          <Loading />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className="p-fluid">
              <div className="mb-4">
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}  
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Unit"
                  name="unit"
                  onChange={formik.handleChange}
                  value={formik.values.unit}  
                />
              </div>
            </div>
          </form>
        )}
      </Dialog>
    </div>
  );
}

function CustomHeader({ formik,editData }) {
  return (
    <div className="d-flex align-items-center justify-content-between border-bottom pb-3">
      <h5 className="m-0 fs-bold">{(editData) ? 'Edit' : ' Add'} Nutrition</h5>
      <div>
        {/* <IosSwitch
          checked={formik.values.is_active}
          name="is_active"
          onChange={(e) => formik.setFieldValue("is_active", e.target.checked)} // Handle switch toggle
        /> */}
        {/* <span className="fs-6 text-secondary fw-normal">Active</span> */}
      </div>
    </div>
  );
}

function FooterContent({ formik, setVisible, loading }) {
  return (
    <div className="d-inline-flex gap-3">
      <RejectButton lable="Cancel" handleClick={() => setVisible(false)} />
      <YellowButton lable="Save Changes" handleClick={formik.handleSubmit} disabled={loading} />
    </div>
  );
}
