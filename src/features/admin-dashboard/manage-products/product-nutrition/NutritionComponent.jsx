import { MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

const NutritionComponent = ({ nutritionList, formik, isUpdate }) => {
  const { values, setFieldValue } = formik;

  // Ensure initial data for update
  useEffect(() => {
    if (isUpdate && values.nutritions?.length === 0) {
      setFieldValue('nutritions', [
        { nutrition_id: '', nutrition_value: 0 }, // Default row if none exist
      ]);
    }
  }, [isUpdate, setFieldValue, values.nutritions]);

  const handleAddRow = () => {
    setFieldValue('nutritions', [
      ...values.nutritions,
      { nutrition_id: '', nutrition_value: 0 },
    ]);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = values.nutritions.filter((_, rowIndex) => rowIndex !== index);
    setFieldValue('nutritions', updatedRows);
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...values.nutritions];
    updatedRows[index][field] = value;
    setFieldValue('nutritions', updatedRows);
  };

  return (
    <div className="nutrition-component mb-4">
      <div className="row">
        <div className="col-md-10 d-flex flex-column">
          {values?.nutritions.map((row, index) => (
            <div key={index} className="row nutrition-component-row mb-3">
              <div className="col-md-5">
                <Select
                  value={row.nutrition_id}
                  onChange={(e) => handleRowChange(index, 'nutrition_id', e.target.value)}
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select Nutrition
                  </MenuItem>
                  {nutritionList.map((nutrition) => (
                    <MenuItem key={nutrition.id} value={nutrition.id}>
                      {nutrition.name} ({nutrition.unit})
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="col-md-5">
                <TextField
                  type="number"
                  value={row.nutrition_value}
                  onChange={(e) => handleRowChange(index, 'nutrition_value', e.target.value)}
                  placeholder="Enter value"
                  fullWidth
                  InputProps={{
                    inputProps: { min: 0 }, // Prevent negative values
                  }}
                />
              </div>
              <div className="col-md-2">
                <button type='button'
                  className="btn btn-outline-danger w-100 h-100 rounded-3"
                  disabled={values.nutritions.length === 1} // Keep at least one row
                  onClick={() => handleRemoveRow(index)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-2">
          <button
            className="button-primary align-self-start my-0 px-5"
            onClick={handleAddRow}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default NutritionComponent;
