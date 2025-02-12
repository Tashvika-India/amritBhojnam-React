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
  postMealFoodSensitivity,
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
}) {
  const [loading, setLoading] = useState(false);
  const [selectedFoodPreference, setSelectedFoodPreference] = useState([]);
  const initialValues = {
    food_preference: [],
    food_sensitivity: ""
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log("vales",values);
      
      const payload = {
        ...values,
        food_preference: selectedFoodPreference,
      }
      try {
        await postMealFoodSensitivity(payload);
      } catch (error) {
        console.log("error", error);

      }
    },
  });

  const { values, handleSubmit, resetForm, setValues, errors } = formik;

  const handleCheckboxChange = (type, value) => {
    setSelectedFoodPreference((prev = []) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
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
                <p className="text-black">Food Preference:</p>
                <div className="row">
                  {["Vegan", "Vegetarian", "Eggeterian", "Non-Vegeterian"].map(
                    (item) => (
                      <div className="col-6 mb-4">
                        <div key={item} className="mb-3 d-inline-flex align-items-center">
                          <Checkbox
                            checked={selectedFoodPreference.includes(item)}
                            onChange={() => handleCheckboxChange("food_preference", item)}
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
                    value={formik.values.food_sensitivity} />
                  <p className="text-danger">{errors.food_sensitivity}</p>
                </div>
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
            ? "Edit Food Sensitivity"
            : "Add Food Sensitivity"}
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
