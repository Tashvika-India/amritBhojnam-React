import React, { useState } from "react";
import Heading from "@/components/ui/Heading";
import TabsButtons from "../../../../components/ui/TabsButton";
import PendingOrdersTable from "./components/PendingOrdersTable";
import InitiatedModal from "./components/InitiatedModal";
import InitiatedOrdersTable from "./components/InitiatedOrdersTable";

function ReturnRefund() {
  const [activeTab, setActiveTab] = useState("Active Orders");


  return (
    <>
      <div className="mt-5 mb-5 row">
        <div className="col-md-6">
          <Heading value={"Refund & Return"} />
        </div>
        {/* <div className="col-md-6 text-end">
          <YellowButton lable={"+ Add Orders"} />
        </div> */}
      </div>

      <div className="">
        <div className="card">
          <div className="card-body">
            <div className="mb-3">
              <TabsButtons
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                labelOne={"Pending"}
                labelTwo={"Initiated"}
              />
            </div>
            {activeTab === "Active Orders" && <PendingOrdersTable />}
            {activeTab === "New Orders" && <InitiatedOrdersTable />}
          </div>
        </div>
      </div>
      <InitiatedModal
        visible={visible}
        setVisible={setVisible}
        getCategories={getCategories}
        editData={editData}
      />
    </>
  );
}

export default ReturnRefund;
