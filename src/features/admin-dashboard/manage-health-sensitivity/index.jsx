import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import { getBannerApi, getNutritionApi, patchBannerApi } from "../../../services/adminApiRoutes";

import Loading from "../../../components/ui/Loading";1  
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import FoodSensitivityTable from "./components/FoodSensitivityTable";
import HealthIssueTable from "./components/HealthIssueTable";

function HealthSensitivity() {
  const [visible, setVisible] = useState(false);
  const [nutrition, setNutrition] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getNutrition() {
    setLoading(true);
    try {
      const response = await getNutritionApi();
      setNutrition(response?.data || []);
    } catch (error) {
      console.log("Error on Nutrition List", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!visible) {
      setEditData(null);
    }
  }, [visible]);


  useEffect(() => {
    getNutrition();
  }, []);



  return (
    <>
      <div className="mt-5 mb-5 row">
        <div className="col-md-6">
          <Heading value={"Health Sensitivity"} />
        </div>
       
        <div className="col-12 mt-3">
          <Breadcrumbs aria-label="breadcrumb">
            <Typography >Products</Typography>
            <Typography className="text-orange">Nutrition</Typography>
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
              <HealthIssueTable/>
          </div>
        </div>
      </div>
       
      </div>

      {/* <AddNutritionModal
        visible={visible}
        setVisible={setVisible}
        editData={editData}
        getNutrition={getNutrition}
      /> */}
    </>
  );
}

export default HealthSensitivity;
