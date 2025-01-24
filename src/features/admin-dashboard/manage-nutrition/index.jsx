import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import { getBannerApi, getNutritionApi, patchBannerApi } from "../../../services/adminApiRoutes";
import AddNutritionModal from "./components/AddNutritionModal";
import Loading from "../../../components/ui/Loading";
import NutritionTable from "./components/NutritionTable";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

function ManageNutrition() {
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
      <div className="mt-3 mb-5 row">
        <div className="col-md-6">
          <Heading value={"Nutrition"} />
        </div>
        <div className="col-md-6 text-end">
          <YellowButton
            handleClick={() => setVisible(true)}
            lable={"+ Add Nutrition"}
          />
        </div>
        <div className="col-12 mt-3">
          <Breadcrumbs aria-label="breadcrumb">
            <Typography >Products</Typography>
            <Typography className="text-orange">Nutrition</Typography>
          </Breadcrumbs>
        </div>
      </div>

      <div className="">
        <div className="card">
          <div className="card-body">
            {loading ? (
              <Loading />
            ) : (
              <NutritionTable nutrition={nutrition}
                setEditData={setEditData}
                setVisible={setVisible}
                getNutrition={getNutrition} />
            )}
          </div>
        </div>
      </div>

      <AddNutritionModal
        visible={visible}
        setVisible={setVisible}
        editData={editData}
        getNutrition={getNutrition}
      />
    </>
  );
}

export default ManageNutrition;
