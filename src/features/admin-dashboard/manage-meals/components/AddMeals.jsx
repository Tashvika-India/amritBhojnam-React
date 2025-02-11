import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import YellowButton from "../../../../components/buttons/YellowButton";
import FileUpload from "../../../../components/fileUpload/FileUpload";
import { postAddMealApi } from "../../../../services/adminApiRoutes";

const AddMeals = () => {
  const navigate = useNavigate();
  const [selectedFoodSensitivities, setSelectedFoodSensitivities] = useState([]);
  const [selectedHealthIssues, setSelectedHealthIssues] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      kcal: "",
      protein: "",
      carbs: "",
      fat: "",
      image: "",
      img_name: "",
      food_preference: "",
      food_sensitivity: [],
      health_issues: [],
      meal_type: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Food name is required"),
      kcal: Yup.number().required("Calories are required"),
      protein: Yup.number().required("Protein is required"),
      carbs: Yup.number().required("Carbs are required"),
      fat: Yup.number().required("Fat is required"),
      food_preference: Yup.string().required("Food preference is required"),
      // meal_type: Yup.string().required("Meal type is required"),
    }),
    onSubmit: async (values) => {      
      const payload = {
        ...values,
        food_sensitivity: selectedFoodSensitivities,
        health_issues: selectedHealthIssues,
      };
      try {
        await postAddMealApi(payload); 
        navigate("/admin/manage-meals");
      } catch (error) {
        alert("Failed to add meal.");
      }
    },
  });

  const { values, resetForm, setValues, errors, touched } = formik; 

  const handleCheckboxChange = (type, value) => {
    if (type === "food_sensitivity") {
      setSelectedFoodSensitivities((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
    } else {
      setSelectedHealthIssues((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
    }
  };

  return (
    <>
      <div className="mt-4 mb-5 row">
        <div className="col-md-6">
          <Heading value="Add Meal" />
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          {/* Left Side */}
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body">
                <div className="mb-4">
                  <FileUpload formik={formik} name="image" />
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
                  <div className="col-md-6">
                    <FormControl fullWidth>
                      <InputLabel>Food Preference</InputLabel>
                      <Select
                        id="food_preference"
                        name="food_preference"
                        value={formik.values.food_preference}
                        onChange={formik.handleChange}
                        error={formik.touched.food_preference && Boolean(formik.errors.food_preference)}
                      >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="Veg">Veg</MenuItem>
                      <MenuItem value="Non-Veg">Non-Veg</MenuItem>
                      </Select>
                      {formik.touched.food_preference && formik.errors.food_preference && (
                        <Alert severity="error">{formik.errors.food_preference}</Alert>
                      )}
                    </FormControl>
                  </div>
                  <div className="col-md-6 mb-3">
                    <TextField
                      fullWidth
                      id="kcal"
                      name="kcal"
                      label="Calories"
                      type="number"
                      value={formik.values.kcal}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField
                      fullWidth
                      id="protein"
                      name="protein"
                      label="Protein"
                      type="number"
                      value={formik.values.protein}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <TextField
                      fullWidth
                      id="carbs"
                      name="carbs"
                      label="Carbs"
                      type="number"
                      value={formik.values.carbs}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField
                      fullWidth
                      id="fat"
                      name="fat"
                      label="Fat"
                      type="number"
                      value={formik.values.fat}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-md-6">
            <div className="card p-3 mb-4">
              <div className="card-body">
                <p className="fw-500">Food Sensitivities:</p>
                {["Dairy Sensitivity", "Nut Allergy", "Gluten Sensitivity", "Soy Allergy"].map(
                  (item) => (
                    <div key={item} className="mb-3">
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
            <div className="card p-3">
              <div className="card-body">
                <p className="fw-500">Health Issues:</p>
                {["Diabetes", "High Blood Pressure", "Heart Disease"].map((issue) => (
                  <div key={issue} className="mb-3">
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
        <div className="text-end mt-4">
        <YellowButton type="submit" lable={"+ Add Meal"} />
        </div>
      </form>
    </>
  );
};

export default AddMeals;
