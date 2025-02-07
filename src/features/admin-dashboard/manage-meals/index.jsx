import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "../../../components/buttons/YellowButton";
import { Link } from "react-router-dom";
import { getCouponApi } from "../../../services/adminApiRoutes";
import Loading from "../../../components/ui/Loading";
import TabsButtons from "../../../components/ui/TabsButton";
import { InputText } from "primereact/inputtext";
import useURLFilters from "../../../custom-compoents/useURLFilters";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs'; 
import MealsTable from "./components/MealsTable";

const ManageMeals = () => {
  const [filter, setFilter] = useState({coupon_code: ""});
  const [loding, setLoding] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [activeTab, setActiveTab] = useState("Active Orders");
  const getCoupons = async () => {
    setLoding(true);
    try {
      const response = await getCouponApi(filter?.coupon_code || "");
      setCoupons(response?.data);
      setLoding(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCoupons();
  }, [filter]);

  return (
    <>
      <div className="mt-5 mb-4 row">
        <div className="col-md-6">
          <Heading value={"Manage Meals"} />
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
                <div>
                  <div className="mb-3">
                    {/* <TabsButtons
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                      labelOne={"Active"}
                      labelTwo={"Inactive"}
                    /> */}
                  </div>
                  {/* {activeTab === "Active Orders" && <ProductTable />}
                  {activeTab === "New Orders" && <ProductTable />} */}
                </div>
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-3"></div>
              <div className="col-md-3 ms-auto text-end">
                <InputText
                  className="w-100 ps-4"
                  sx={{ fontFamily: "Poppins, sans-serif" }}
                  value={filter.coupon_code || ""}
                  onChange={(e) =>
                    setFilter({ ...filter, coupon_code: e.target.value })
                  }
                  placeholder="Search order"
                />
              </div>
            </div>
           <div>
            <MealsTable/>
           </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageMeals;
