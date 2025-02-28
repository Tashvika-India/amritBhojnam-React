import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import ActiveOrdersTable from "./components/ActiveOrdersTable";
import TabsButtons from "../../../../components/ui/TabsButton";
import NewOrdersTable from "./components/NewOrdersTable";
import { getAdminOrderListApi } from "../../../../services/adminApiRoutes";
import Loading from "../../../../components/ui/Loading";
import { InputText } from "primereact/inputtext";
import { notifyError } from "../../../../components/ui/Notification";
import { Breadcrumbs, Typography } from "@mui/material";

function AdminOrders() {
  const [activeTab, setActiveTab] = useState("Active");
  const [loading, setLoading] = useState(false);

  const [order, setOrder] = useState([]);
  const [search, setSearch] = useState('');

  const getOrderList = async () => {
    setLoading(true);
    try {
      const response = await getAdminOrderListApi(search); 
      
      const filteredData = response?.data?.results?.filter((item) => 
        activeTab === "Active" ? item?.status != "confirmed" : item?.status == "confirmed"
      );
      setOrder(filteredData); 
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      notifyError(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getOrderList();
  }, [search, activeTab]); 
  

  return (
    <>
      <div className="mt-5 mb-3 row">
        <div className="col-md-6">
          <Heading value={"Orders List"} />
        </div>
        <div className="col-12 my-3">
          <Breadcrumbs aria-label="breadcrumb">
            <Typography >Orders</Typography>
            <Typography className="text-orange">Order list</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <div className="">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <TabsButtons
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    labelOne={"Active"}
                    labelTwo={"New Orders"}
                  />
                </div>
              </div>
              <div className="col-md-3 ms-auto text-end mb-4">
                <InputText
                  className="w-100 rounded-2 ps-4"
                  type="text"
                  placeholder="Search Order by Id..."
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="col-12">
                {loading ? (
                  <Loading />
                ) : ( 
                  <NewOrdersTable order={order} getOrderList={getOrderList} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminOrders;
