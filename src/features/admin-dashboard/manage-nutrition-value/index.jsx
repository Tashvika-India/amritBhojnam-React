import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import { getBannerApi, getNutritionApi, getNutritionValueApi, patchBannerApi } from "../../../services/adminApiRoutes";
import AddNutritionValueModal from "./components/AddNutritionValueModal";
import Loading from "../../../components/ui/Loading";
import NutritionValueTable from "./components/NutritionValueTable"; 


function ManageNutritionValue() {
  const [visible, setVisible] = useState(false);
  const [nutritionValue, setNutritionValue] = useState([]);
  const [nutrition, setNutrition] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);
 
  

  async function getNutritionValue() {
    setLoading(true);
    try {
      const response = await getNutritionValueApi();
      setNutritionValue(response?.data || []);
    } catch (error) {
      console.log("Error on Nutrition List", error);
    } finally {
      setLoading(false);
    }
  }

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
    getNutritionValue();
    getNutrition();
  }, []);

  

  return (
    <>
      <div className="mt-3 mb-5 row">
        <div className="col-md-6">
          <Heading value={"Nutrition Value"} />
        </div>
        <div className="col-md-6 text-end">
          <YellowButton
            handleClick={() => setVisible(true)}
            lable={"+ Add Nutrition value"}
          />
        </div>
      </div>

      <div className="">
        <div className="card">
          <div className="card-body">
            {loading ? (
              <Loading />
            ) : (
              <NutritionValueTable nutritionValue={nutritionValue}/>
            )}
          </div>
        </div>
      </div>

      <AddNutritionValueModal
        visible={visible}
        setVisible={setVisible} 
        nutrition={nutrition}
        setNutritionValue={setNutritionValue}
        editData={editData}
        getNutritionValue={getNutritionValue}
      />
    </>
  );
}

export default ManageNutritionValue;
