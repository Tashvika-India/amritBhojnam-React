import React, { useCallback, useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import { Link } from "react-router-dom";
import { getProductApi } from "../../../services/adminApiRoutes";
import ProductTable from "../manage-products/product-list/components/ProductTable";
import RolesTable from "./components/RolesTable";
import Loading from "../../../components/ui/Loading";
import { InputText } from "primereact/inputtext";
import useURLFilters from "../../../custom-compoents/useURLFilters";
import TabsButtons from "../../../components/ui/TabsButton"; 
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs'; 
 

function Roles() {
  const [activeTab, setActiveTab] = useState("Active Orders");
  const [loading, setLoading] = useState(false)

  return (
    <>
      <div className="mt-3 mb-4  row">
        <div className="col-md-6 ps-4">
          <Heading value={"Roles"} />
        </div>
        <div className="col-md-6 text-end">
          <Link to="/admin/add-roles">
            <YellowButton lable={"+ Add New"} />
          </Link>
        </div>
        <div className="col-12 mt-3">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to={"/admin/dashboard"}>Dashboard</Link>
            <Typography className="text-orange">Roles</Typography>
          </Breadcrumbs>
        </div>
      </div>

      <div className="">
        <div className="card">
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-5">
                <div>
                  {/* <div className="mb-3">
                    <TabsButtons
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                      labelOne={"Active Orders"}
                      labelTwo={"New Orders"}
                    />
                  </div> */}
                  {/* {activeTab === "Active Orders" && <ProductTable />}
                  {activeTab === "New Orders" && <ProductTable />} */}
                </div>
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-3"></div>
              <div className="col-md-3 ms-auto text-end">
                <InputText
                className="w-100"
                  placeholder="Search Roles..."
                />
              </div>
            </div>
            <div className="">
              {loading ? (
                <Loading />
              ) : (
                <RolesTable
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Roles;
