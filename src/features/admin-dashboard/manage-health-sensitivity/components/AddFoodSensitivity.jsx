import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import YellowButton from "../../../../components/buttons/YellowButton";
import RejectButton from "../../../../components/buttons/RejectButton";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import {
  postMealFoodSensitivity,
  putMealFoodSensitivity,
} from "../../../../services/adminApiRoutes";
import {
  notifyError,
  notifySuccess,
} from "../../../../components/ui/Notification";
import { Checkbox } from "primereact/checkbox";

export default function AddCategoryModal({ visible, setVisible, editData,getMealFoodSensitivity }) {
  const [selectedFoodPreference, setSelectedFoodPreference] = useState([]);

  useEffect(() => {
    if (editData?.food_preference) {
      setSelectedFoodPreference(editData.food_preference);
    }
  }, [editData]);

  const formik = useFormik({
    initialValues: {
      food_preference: editData?.food_preference || [],
      food_sensitivity: editData?.food_sensitivity || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const payload = {
        ...values,
        food_preference: selectedFoodPreference,
      };
      try {
        if (editData) {
          await putMealFoodSensitivity(editData.id, payload);
          notifySuccess("Food Sensitivity Updated Successfully");
          getMealFoodSensitivity();
        } else {
          await postMealFoodSensitivity(payload);
          notifySuccess("Food Sensitivity Added Successfully");
          getMealFoodSensitivity();
        }
        handleClose();
      } catch (error) {
        console.log("error", error);
        notifyError(error.response?.data?.error);
      }
    },
  });

  const { values, handleSubmit, resetForm, setValues, errors } = formik; 

  const handleCheckboxChange = (value) => {
    setSelectedFoodPreference((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleClose = () => {
    setVisible(false);
    resetForm();
    setSelectedFoodPreference([]);  
  };


  return (
    <div className="card flex justify-content-center">
      <Dialog
        visible={visible}
        style={{ width: "40vw" }}
        className="rounded-20 overflow-hidden"
        onHide={handleClose}  
        footer={<FooterContent formik={formik} handleClose={handleClose} />}
        closable={false}
        header={<CustomHeader formik={formik} />}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="p-fluid">
            <div className="mb-4">
              <p className="text-black">Food Preference:</p>
              <div className="row mt-4">
                {["Vegan", "Vegetarian", "Eggeterian", "Non-Vegeterian"].map(
                  (item) => (
                    <div key={item} className="col-6 mb-4">
                      <div className=" d-inline-flex align-items-center">
                        <Checkbox
                          checked={selectedFoodPreference.includes(item)}
                          onChange={() => handleCheckboxChange(item)}
                        />
                        <span className="ps-3">{item}</span>
                      </div>
                    </div>
                  )
                )}
              </div>
              <div>
                <TextField
                  fullWidth
                  className="mt-2"
                  variant="outlined"
                  placeholder="Enter Sensitivity"
                  name="food_sensitivity"
                  onChange={formik.handleChange}
                  value={formik.values.food_sensitivity}
                />
                <p className="text-danger">{errors.food_sensitivity}</p>
              </div>
            </div>
          </div>
        </form>
      </Dialog>
    </div>
  );
}

function CustomHeader({ formik }) {
  return (
    <div className="d-flex align-items-center justify-content-between border-bottom pb-3">
      <h5 className="m-0 fs-bold fw-600">
        {formik.values.food_sensitivity ? "Edit Food Sensitivity" : "Add Food Sensitivity"}
      </h5>
    </div>
  );
}

function FooterContent({ formik, handleClose, loading }) {
  return (
    <div className="d-inline-flex gap-3">
      <RejectButton lable="Cancel" handleClick={handleClose} />
      <YellowButton lable={formik.values.food_sensitivity ? "Update" : "+ Add"} handleClick={formik.handleSubmit} disabled={loading} />
    </div>
  );
}
