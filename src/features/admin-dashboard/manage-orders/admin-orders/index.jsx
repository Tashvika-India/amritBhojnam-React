import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import ActiveOrdersTable from "./components/ActiveOrdersTable";
import TabsButtons from "../../../../components/ui/TabsButton";
import NewOrdersTable from "./components/NewOrdersTable";
import { getAdminOrderApi } from "../../../../services/adminApiRoutes";

function AdminOrders() {
  const [activeTab, setActiveTab] = useState("Active");

  const [order, setOrder] = useState([]);

  const getOrderList = async (id, name) => {
    try {
      const response = await getAdminOrderApi(id, name);
      setOrder(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderList();
  }, []);

  return (
    <>
      <div className="mt-3 mb-5 row">
        <div className="col-md-6">
          <Heading value={"Orders"} />
        </div>
      </div>

      <div className="">
        <div className="card">
          <div className="card-body">
          
           <NewOrdersTable order={order} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminOrders;
