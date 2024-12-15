import React, { useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import ActiveOrdersTable from "./components/ActiveOrdersTable";
import TabsButtons from "../../../../components/ui/TabsButton";
import NewOrdersTable from "./components/NewOrdersTable";

function AdminOrders() {
  const [activeTab, setActiveTab] = useState("Active Orders");


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
            <div className="mb-3">
              <TabsButtons
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                labelOne={"Active Orders"}
                labelTwo={"New Orders"}
              />
            </div>
            {activeTab === "Active Orders" && <ActiveOrdersTable />}
            {activeTab === "New Orders" && <NewOrdersTable />}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminOrders;
