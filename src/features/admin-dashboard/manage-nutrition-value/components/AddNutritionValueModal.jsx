import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import YellowButton from "../../../../components/buttons/YellowButton";
import RejectButton from "../../../../components/buttons/RejectButton";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import IosSwitch from "../../../../components/ui/IosSwitch";
import { useFormik } from "formik";
import { postNutritionValueApi } from "../../../../services/adminApiRoutes";
import Loading from "../../../../components/ui/Loading";
import {
  notifyError,
  notifySuccess,
} from "../../../../components/ui/Notification";

export default function AddNutritionValueModal({
  visible,
  setVisible,
  getNutritionValue,
  nutrition,
}) {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    nutrition_id: "",
    nutrition_value: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      await addNutritionValue(values); // Call to API function
    },
  });

  const { values, handleSubmit, resetForm, setValues, errors } = formik;
  
  
  async function addNutritionValue(values) {
    setLoading(true);
    try {
      await postNutritionValueApi(values); // Ensure this API function works and matches the expected structure
      resetForm(); 
      notifySuccess("Nutrition Value added successfully!");
      getNutritionValue();
      setVisible(false);
    } catch (error) {
      notifyError("Failed to add nutrition value. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card flex justify-content-center">
      <Dialog
        visible={visible}
        style={{ width: "40vw" }}
        className="rounded-20"
        onHide={() => setVisible(false)}
        footer={
          <FooterContent
            formik={formik}
            setVisible={setVisible}
            loading={loading}
          />
        }
        closable={false}
        header={<CustomHeader formik={formik} />}
      >
        {loading ? (
          <Loading />
        ) : (
          <form>
            <div className="p-fluid">
              <div className="mb-4 mt-3">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Nutrition
                  </InputLabel>
                  <Select
                    label="Select Nutrition"
                    name="nutrition_id"
                    value={formik.values?.nutrition_id}
                    onChange={formik.handleChange}
                  >
                    {nutrition?.map((data) => (
                      <MenuItem key={data?.id} value={data?.id}>
                        {data?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="mb-4">
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Nutrition Value"
                  name="nutrition_value"
                  onChange={formik.handleChange}
                  value={values.nutrition_value} // Correct field binding
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
    <div className="d-flex align-items-center justify-content-between border-bottom pb-3">
      <h5 className="m-0 fs-bold">Add Nutrition Value</h5>
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
      <YellowButton
        lable="Save Changes"
        handleClick={formik.handleSubmit}
        disabled={loading}
      />
    </div>
  );
}
