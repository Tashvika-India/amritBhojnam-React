import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Heading from "@/components/ui/Heading";
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Checkbox } from "primereact/checkbox";
import { useLocation, useNavigate } from "react-router-dom";
import YellowButton from "../../../../components/buttons/YellowButton";
import { getMealFoodSensitivityApi, getMealHealthIssueApi, postAddMealApi, putMealApi } from "../../../../services/adminApiRoutes";
import { baseURL } from "../../../../utils/constant-variable";
import SingleFileUpload from "../../../../components/fileUpload/SingleFileUpload";
import { notifyError, notifySuccess } from "../../../../components/ui/Notification";

const AddMeals = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location?.state;
  const [selectedFoodSensitivities, setSelectedFoodSensitivities] = useState([]);
  const [selectedHealthIssues, setSelectedHealthIssues] = useState([]);
  const [selectedFoodPreference, setSelectedFoodPreference] = useState([]);
  const [selectedMealType, setSelectedMealType] = useState([]);
  const [pre, setPre] = useState("");
  const [issue, setIssue] = useState([]);
  const [sens, setSens] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: editData?.name || "",
      kcal: editData?.kcal || "",
      protein: editData?.protein || "",
      carbs: editData?.carbs || "",
      fat: editData?.fat || "",
      image: editData?.image || "",
      img_name: editData?.img_name || "",
      food_preference: editData?.food_preference || [],
      food_sensitivity: editData?.food_sensitivity || [],
      health_issues: editData?.health_issues || [],
      meal_type: editData?.meal_type || []
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Food name is required"),
      kcal: Yup.number()
        .typeError("Calories must be a number")
        .positive("Calories must be a positive number")
        .required("Calories are required"),
      protein: Yup.number()
        .typeError("Protein must be a number")
        .positive("Protein must be a positive number")
        .required("Protein is required"),
      carbs: Yup.number()
        .typeError("Carbs must be a number")
        .positive("Carbs must be a positive number")
        .required("Carbs are required"),
      fat: Yup.number()
        .typeError("Fat must be a number")
        .positive("Fat must be a positive number")
        .required("Fat is required"),
    }),

    onSubmit: async (values) => {
      const payload = {
        ...values,
        food_sensitivity: selectedFoodSensitivities,
        health_issues: selectedHealthIssues,
        food_preference: selectedFoodPreference,
        meal_type: selectedMealType,
      };
      try {
        if (editData) {
          await putMealApi(editData.id, payload);
          notifySuccess("Meal updated successfully!");
        } else {
          await postAddMealApi(payload);
          notifySuccess("Meal added successfully!");
        }
        navigate("/admin/manage-meals");
      } catch (error) {
        alert("Failed to submit meal.");
        notifyError(error.response?.data?.error);
      }
    },
  });

  const { values, handleSubmit, resetForm, setValues, errors } = formik;

  useEffect(() => {
    if (editData) {
      setSelectedFoodSensitivities(editData?.food_sensitivity || []);
      setSelectedHealthIssues(editData?.health_issues || []);
      setSelectedFoodPreference(editData?.food_preference || []);
      setSelectedMealType(editData?.meal_type || []);
      setPre(editData?.image);
    }
  }, [editData]);

  const handleCheckboxChange = (type, value) => {
    if (type === "food_sensitivity") {
      setSelectedFoodSensitivities((prev = []) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
    } else if (type === "health_issues") {
      setSelectedHealthIssues((prev = []) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
    } else if (type === "food_preference") {
      setSelectedFoodPreference((prev = []) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
    } else if (type === "meal_type") {
      setSelectedMealType((prev = []) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
    }
  };

  async function getHealthIssue() {
    try {
      const response = await getMealHealthIssueApi();
      setIssue(response?.data?.results);
    } catch (error) {
      console.log("Error on health issue list", error);
    }
  }

  async function getMealFoodSensitivity() {
    try {
      const response = await getMealFoodSensitivityApi();
      setSens(response?.data?.results)
    } catch (error) {
      console.log("Error on Food Sensitivity list", error);
    }
  }


  useEffect(() => {
    getMealFoodSensitivity();
    getHealthIssue();
  }, []);

  return (
    <>
      <div className="mt-4 mb-5 row">
        <div className="col-md-6">
          <Heading value={editData ? "Edit Meal" : "Add Meal"} />
        </div>
      </div>
      <form onSubmit={formik.handleSubmit} className="add-meal">
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body p-3">
                <div className="mb-4">
                  <SingleFileUpload setPre={setPre} pre={pre} formik={formik} style={{height: "10rem"}} name="image" baseURL={baseURL} />
                  {formik.touched.image && formik.errors.image && (
                    <Alert severity="error">{formik.errors.image}</Alert>
                  )}
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Enter Food Name"
                      placeholder="Enter Food Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <TextField
                      fullWidth
                      id="kcal"
                      name="kcal"
                      label="Calories"
                      value={formik.values.kcal}
                      onChange={formik.handleChange}
                      error={formik.touched.kcal && Boolean(formik.errors.kcal)}
                      helperText={formik.touched.kcal && formik.errors.kcal}
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField
                      fullWidth
                      id="protein"
                      name="protein"
                      label="Protein"
                      value={formik.values.protein}
                      onChange={formik.handleChange}
                      error={formik.touched.protein && Boolean(formik.errors.protein)}
                      helperText={formik.touched.protein && formik.errors.protein}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <TextField
                      fullWidth
                      id="carbs"
                      name="carbs"
                      label="Carbs"
                      value={formik.values.carbs}
                      onChange={formik.handleChange}
                      error={formik.touched.carbs && Boolean(formik.errors.carbs)}
                      helperText={formik.touched.carbs && formik.errors.carbs}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <TextField
                      fullWidth
                      id="fat"
                      name="fat"
                      label="Fat"
                      value={formik.values.fat}
                      onChange={formik.handleChange}
                      error={formik.touched.fat && Boolean(formik.errors.fat)}
                      helperText={formik.touched.fat && formik.errors.fat}
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="p-2 ">
                      <p className="fw-400">Meal Type :</p>
                      <div className="row">
                        {["Lunch", "Breakfast", "Dinner"].map(
                          (item) => (
                            <div key={item} className="col-md-3 mb-3 d-inline-flex align-items-center">
                              <Checkbox
                                checked={selectedMealType.includes(item)}
                                onChange={() => handleCheckboxChange("meal_type", item)}
                              />
                              <span className="ps-3">{item}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="p-2">
                      <p className="fw-400">Food Preference:</p>
                      <div className="row">
                        {["Vegan", "Vegetarian", "Eggeterian", "Non-Vegeterian"].map(
                          (item) => (
                            <div key={item} className="col-md-3 mb-3 d-inline-flex align-items-center">
                              <Checkbox
                                checked={selectedFoodPreference.includes(item)}
                                onChange={() => handleCheckboxChange("food_preference", item)}
                              />
                              <span className="ps-3">{item}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card p-3 mb-5">
              <div className="card-body">
                <h5 className="fw-500 mb-3">Avoid Due to Food Sensitivities:</h5>
                <div className="row mt-4 pt-2">
                  {sens?.map(
                    (item) => (
                      <div key={item?.id} className="col-md-4 mb-3">
                        <Checkbox
                          checked={selectedFoodSensitivities.includes(item?.food_sensitivity)}
                          onChange={() => handleCheckboxChange("food_sensitivity", item?.food_sensitivity)}
                        />
                        <span className="ps-3">{item?.food_sensitivity}</span>
                      </div>
                    )
                  )}
                </div>
                <Alert severity="warning" style={{backgroundColor: "#FFF6DA"}} className="mt-3 px-2 py-0"><span className="fw-500 text-black">Warning:</span> Selecting an option means avoiding foods that may trigger allergies or intolerances.</Alert>
              </div>
            </div>
            <div className="card p-3 mt-5">
              <div className="card-body">
                <h5 className="fw-500 mb-3">Avoid Due to Health Issue:</h5>
                <div className="row mt-4 pt-2">
                  {issue.map((item) => (
                    <div key={item?.id} className="col-md-4 mb-3 pe-0">
                      <Checkbox
                        checked={selectedHealthIssues.includes(item?.health_issues)}
                        onChange={() => handleCheckboxChange("health_issues", item?.health_issues)}
                      />
                      <span className="ps-3">{item?.health_issues}</span>
                    </div>
                  ))}
                </div>
                <Alert severity="warning" style={{backgroundColor: "#FFF6DA"}} className="mt-3 px-2 py-0"><span className="fw-500 text-black">Warning:</span> Selecting an option means avoiding foods that may trigger allergies or intolerances.</Alert>
              </div>
            </div>
          </div>
        </div>
        <div className="text-end mt-4">
          <YellowButton type="submit" lable={`${editData ? "Update Meal" : "+ Add Meal"}`} />
        </div>
      </form>
    </>
  );
};

export default AddMeals;
