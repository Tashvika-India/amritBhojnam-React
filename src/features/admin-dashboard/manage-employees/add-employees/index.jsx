import React, {  useState } from "react";
import Heading from "@/components/ui/Heading";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import ProfileAvatar from "../../../../assets/images/dashboard/profile-avatar.png";  
import { Checkbox } from "primereact/checkbox";

const EmployeeAdd = () => {
  const [checked, setChecked] = useState([]); 
  const isEditMode = false;  

  return (
    <>
      <div className="mt-3 mb-5 row">
        <div className="col-md-6">
          <Heading value={isEditMode ? "Edit Employee" : "Add New Employee"} />
        </div>
      </div>
      <form className="col-md-7">
        <div className="card mb-4 p-3">
          <div className="card-body">
            <h6 className="mb-4">Avatar</h6>
            <div className="d-flex align-items-center">
              <div>
                <img src={ProfileAvatar} alt="logo" className="img-fluid" loading="lazy"/>
              </div>
              <div className="ps-5">
                <button className="button-primary d-block">Upload New</button>
                <button className="button-red d-block mt-2">Delete</button>
              </div>
            </div>
            <h6 className="my-4 mt-5">General</h6>
            <div className="container fb-container">
              <div className="row">
                <div className="col-md-6">
                  <TextField
                    fullWidth
                    className="rounded-20"
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                  />
                </div>
                <div className="col-md-6">
                  <TextField
                    fullWidth
                    className="rounded-20"
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                  />
                </div>
                <div className="col-md-6 mt-4">
                  <TextField
                    fullWidth
                    className="rounded-20"
                    id="outlined-basic"
                    label="Mobile Number"
                    variant="outlined"
                  />
                  <div className="d-flex align-items-center pt-2">
                    <div>
                      <Checkbox
                        onChange={(e) => setChecked(e.checked)}
                        checked={checked}
                      ></Checkbox>
                    </div>
                    <div>
                      <p className="mb-0 ps-3 pt-1">
                        Set mobile number as verified
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-4">
                  <TextField
                    fullWidth
                    className="rounded-20"
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                  />
                  <div className="d-flex align-items-center pt-2">
                    <div>
                      <Checkbox
                        onChange={(e) => setChecked(e.checked)}
                        checked={checked}
                      ></Checkbox>
                    </div>
                    <div>
                      <p className="mb-0 ps-3 pt-1">
                        Set email number as verified
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-4">
                <div className="rounded-20">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value=""
                    label="Discount Type"
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                </div>
                
                </div>
                <div className="col-md-6 mt-4">
                  <TextField
                    fullWidth
                    className="rounded-20"
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                  />
                </div>
                
              </div>
            </div>
          </div>
        </div> 
      </form>
    </>
  );
};

export default EmployeeAdd;
