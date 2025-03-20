import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Loading from "../../../../../components/ui/Loading";
import {
  notifyError,
  notifySuccess,
} from "../../../../../components/ui/Notification";
import RejectButton from "../../../../../components/buttons/RejectButton";
import YellowButton from "../../../../../components/buttons/YellowButton";
import { Input, InputGroup } from "rsuite";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";

export default function InitiatedModal() {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [refundType, setRefundType] = useState("full refund"); // State to track selected radio button
  const [ingredients, setIngredients] = useState([]);

  const onIngredientsChange = (e) => {
    let _ingredients = [...ingredients];

    if (e.checked) _ingredients.push(e.value);
    else _ingredients.splice(_ingredients.indexOf(e.value), 1);

    setIngredients(_ingredients);
  };

  const initialValues = {
    name: "",
    img_file: null,
    is_active: true,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log("Submitted values:", values);
    },
  });

  return (
    <div className="card flex justify-content-center">
      <button className="btn btn-primary" onClick={() => setVisible(true)}>
        Open Modal
      </button>

      <Dialog
        visible={visible}
        style={{ width: "30vw" }}
        className="rounded-20 overflow-hidden"
        onHide={() => setVisible(false)}
        closable={false}
        header={<CustomHeader formik={formik} />}
      >
        {loading ? (
          <Loading />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className="p-fluid">
              <FormControl>
                <RadioGroup
                  aria-labelledby="refund-type"
                  value={refundType}
                  onChange={(e) => setRefundType(e.target.value)}
                  name="refund-type-group"
                >
                  <FormControlLabel
                    value="full refund"
                    control={<Radio />}
                    label="Full Refund"
                  />
                  <FormControlLabel
                    value="partial refund"
                    control={<Radio />}
                    label="Partial Refund"
                  />
                </RadioGroup>
              </FormControl>

              {refundType === "partial refund" && (
                <div
                
                >
                <div   className="p-inputgroup flex-1 mt-3"
                  style={{ height: "50px" }}>
                  <span className="p-inputgroup-addon">
                    <p className="mb-0 px-2">Rs.</p>
                  </span>
                  <InputText
                    className="text-mid-grey"
                    placeholder="Enter Amount"
                    style={{ height: "100%", fontSize: "16px" }}
                  />
                  </div>
                  <div className="pt-4 mt-3 mb-2 d-flex align-items-center justify-content-between">
                    <div className="flex align-items-center">
                      <Checkbox
                        inputId="ingredient1"
                        name="pizza"
                        value="Cheese"
                        onChange={onIngredientsChange}
                        checked={ingredients.includes("Cheese")}
                      />
                      <label htmlFor="ingredient1" className="ms-3 text-black fw-500">
                      Convince Fee <span className="text-orange fw-600 fb-fs-18"> (Rs. 25)</span>
                      </label>
                    </div>
                    <div className="flex align-items-center">
                      <Checkbox
                        inputId="ingredient1"
                        name="pizza"
                        value="Cheese"
                        onChange={onIngredientsChange}
                        checked={ingredients.includes("Cheese")}
                      />
                      <label htmlFor="ingredient1" className="ms-3 text-black fw-500">
                      Platform Fee <span className="text-orange fw-600 fb-fs-18"> (Rs. 20)</span>
                      </label>
                    </div> 
                  </div>
                </div>
              )}

              <TextField
                fullWidth
                multiline
                className="rounded-20 me-5 mt-4 w-100"
                id="remark"
                label="Remark"
                name="remark"
                minRows={4}
                variant="outlined"
              />

              <div className="d-flex justify-content-between align-items-center mt-5">
                <div>
                  <p className="mb-0" style={{ color: "#9A9A9A" }}>
                    Final Amount
                  </p>
                  <p
                    className="text-orange fw-600"
                    style={{ fontSize: "1.875rem" }}
                  >
                    Rs. 250
                  </p>
                </div>
                <div className="d-inline-flex gap-3">
                  <RejectButton
                    className="rounded-1"
                    lable="Cancel"
                    handleClick={() => setVisible(false)}
                  />
                  <YellowButton
                    lable="Initiate"
                    handleClick={formik.handleSubmit}
                    disabled={loading}
                  />
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
    <div className="d-flex align-items-center justify-content-between border-bottom pb-3">
      <p className="fw-600 fw-fs-18">Initiate Refund</p>
    </div>
  );
}
