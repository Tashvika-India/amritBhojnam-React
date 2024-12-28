import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import ActiveOrdersTable from "./components/ActiveOrdersTable";
import TabsButtons from "../../../../components/ui/TabsButton";
import NewOrdersTable from "./components/NewOrdersTable";
import { getAdminOrderApi } from "../../../../services/adminApiRoutes";
import Loading from "../../../../components/ui/Loading";

function AdminOrders() {
  const [activeTab, setActiveTab] = useState("Active");
  const [loading, setLoading] = useState(false);

  const [order, setOrder] = useState([]);

  console.log("order", order);
  

  const getOrderList = async (id, name) => {
    setLoading(true);
    try {
      const response = await getAdminOrderApi(id, name);
      setOrder(response?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
            {loading ? (
              <Loading/>
            ) : (
              // <ActiveOrdersTable order={order} />
              <NewOrdersTable order={order}/>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminOrders;
