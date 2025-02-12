import React  from "react";
import Heading from "@/components/ui/Heading"; 
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import FoodSensitivityTable from "./components/FoodSensitivityTable";
import HealthIssueTable from "./components/HealthIssueTable";

function HealthSensitivity() { 
 
  return (
    <>
      <div className="mt-5 mb-5 row">
        <div className="col-md-6">
          <Heading value={"Health Sensitivity"} />
        </div>
        <div className="col-12 mt-3">
          <Breadcrumbs aria-label="breadcrumb">
            <Typography >Dashboard</Typography>
            <Typography className="text-orange">Health Sensitivity</Typography>
          </Breadcrumbs>
        </div>
      </div> 
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <FoodSensitivityTable />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <HealthIssueTable />
            </div>
          </div>
        </div> 
      </div> 
    </>
  );
}

export default HealthSensitivity;
