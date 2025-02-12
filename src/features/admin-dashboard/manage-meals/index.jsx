import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "../../../components/buttons/YellowButton";
import { Link } from "react-router-dom";
import Loading from "../../../components/ui/Loading";
import TabsButtons from "../../../components/ui/TabsButton";
import { InputText } from "primereact/inputtext";
import useURLFilters from "../../../custom-compoents/useURLFilters";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import MealsTable from "./components/MealsTable";
import { getMealApi } from "../../../services/adminApiRoutes";

const ManageMeals = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const getMealList = async () => {
    setLoading(true)
    try {
      const response = await getMealApi();
      setData(response?.data?.results)
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  useEffect(() => {
    getMealList();
  }, [])

  return (
    <>
      <div className="mt-5 mb-4 row">
        <div className="col-md-6">
          <Heading value={"Manage Meals"} />
        </div>
        <div className="col-md-6 text-end">
          <Link to="/admin/add-meals">
            <YellowButton lable={"+ Add Meal"} />
          </Link>
        </div>
        <div className="col-12 mt-3">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to={"/admin/dashboard"}>Dashboard</Link>
            <Typography className="text-orange">Manage Meals</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <div className="">
        <div className="card">
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-5">
                
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-3"></div>
              <div className="col-md-3 ms-auto text-end">
               
              </div>
            </div>
            <div>
              {loading ? (
                <Loading />
              ) : (
                <MealsTable data={data} getMealList={getMealList} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageMeals;
