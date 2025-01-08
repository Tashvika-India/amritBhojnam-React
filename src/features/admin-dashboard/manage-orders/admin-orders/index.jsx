import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import ActiveOrdersTable from "./components/ActiveOrdersTable";
import TabsButtons from "../../../../components/ui/TabsButton";
import NewOrdersTable from "./components/NewOrdersTable";
import { getAdminOrderApi } from "../../../../services/adminApiRoutes";
import Loading from "../../../../components/ui/Loading";
import { InputText } from "primereact/inputtext";

function AdminOrders() {
  const [activeTab, setActiveTab] = useState("Active");
  const [loading, setLoading] = useState(false);

  const [order, setOrder] = useState([]);

  const getOrderList = async () => {
    setLoading(true);
    try {
      const response = await getAdminOrderApi();
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
            <div className="row">
              <div className="col-12 mb-4">
                <div className="col-md-3 ms-auto text-end">
                  <InputText
                    className="w-100"
                    placeholder="Search Orders..."
                  />
                </div>
              </div>
              <div className="col-12">
                {loading ? (
                  <Loading />
                ) : (
                  // <ActiveOrdersTable order={order} />
                  <NewOrdersTable order={order} />
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
