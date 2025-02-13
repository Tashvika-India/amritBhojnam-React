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
import { postAddMealApi, putMealApi } from "../../../../services/adminApiRoutes";
import { baseURL } from "../../../../utils/constant-variable";
import MultiFileUpload from "../../../../components/fileUpload/MultiFileUpload";
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

  const formik = useFormik({
    initialValues: {
      name: editData?.name || "",
      kcal: editData?.kcal || "",
      protein: editData?.protein || "",
      carbs: editData?.carbs || "",
      fat: editData?.fat || "",
      image: editData?.image || "",
      img_name: editData?.img_name || "",
      food_preference: editData?.food_preference ||[],
      food_sensitivity: editData?.food_sensitivity || [],
      health_issues: editData?.health_issues || [],
      meal_type: editData?.meal_type || []
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Food name is required"),
      kcal: Yup.number().required("Calories are required"),
      protein: Yup.number().required("Protein is required"),
      carbs: Yup.number().required("Carbs are required"),
      fat: Yup.number().required("Fat is required"),
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

  return (
    <>
      <div className="mt-4 mb-5 row">
        <div className="col-md-6">
          <Heading value={editData ? "Edit Meal" : "Add Meal"} />
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          {/* Left Side */}
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body">
                <div className="mb-4">
                  <SingleFileUpload setPre={setPre} pre={pre} formik={formik} name="image" baseURL={baseURL} />
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
                      <div className="d-flex flex-wrap align-items-center" style={{columnGap: "2rem"}}>
                        {["Lunch", "Breakfast", "Dinner"].map(
                          (item) => (
                            <div key={item} className="mb-3 d-inline-flex align-items-center">
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
                      <div className="d-flex flex-wrap align-items-center" style={{columnGap: "2rem"}}>
                        {["Vegan", "Vegetarian", "Eggeterian", "Non-Vegeterian"].map(
                          (item) => (
                            <div key={item} className="mb-3 d-inline-flex align-items-center">
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
            <div className="card p-3 mb-4">
              <div className="card-body">
                <h5 className="fw-500 mb-3">Avoid Due to Food Sensitivities:</h5>
                <div className="d-flex flex-wrap align-items-center" style={{columnGap: "2rem"}}>
                  {["Dairy Sensitivity", "Nut Allergy", "Gluten Sensitivity", "Soy Allergy"].map(
                    (item) => (
                      <div key={item} className="mb-3 d-inline-flex align-items-center">
                        <Checkbox
                          checked={selectedFoodSensitivities.includes(item)}
                          onChange={() => handleCheckboxChange("food_sensitivity", item)}
                        />
                        <span className="ps-3">{item}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="card p-3">
              <div className="card-body">
                <h5 className="fw-500">Avoid Due to Health Issue:</h5>
                <div className="d-flex flex-wrap align-items-center" style={{columnGap: "2rem"}}>
                  {["Diabetes", "High Blood Pressure", "Heart Disease"].map((issue) => (
                    <div key={issue} className="mb-3 d-inline-flex align-items-center">
                      <Checkbox
                        checked={selectedHealthIssues.includes(issue)}
                        onChange={() => handleCheckboxChange("health_issues", issue)}
                      />
                      <span className="ps-3">{issue}</span>
                    </div>
                  ))}
                </div>
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
