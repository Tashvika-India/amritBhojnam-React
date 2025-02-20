import React, { useState, useEffect } from "react";
import Heading from "@/components/ui/Heading";
import TabsButtons from "../../../../components/ui/TabsButton";
import PendingOrdersTable from "./components/PendingOrdersTable";
import InitiatedModal from "./components/InitiatedModal";
import InitiatedOrdersTable from "./components/InitiatedOrdersTable";

function ReturnRefund() {
  const [activeTab, setActiveTab] = useState("Pending");
  const [visible, setVisible] = useState(false); // ✅ Initially hidden
  const [editData, setEditData] = useState(null);

  // Placeholder function for fetching categories
  const getCategories = () => {
    console.log("Fetching categories...");
  };

  // ✅ Open modal when "Initiated" tab is selected
  useEffect(() => {
    if (activeTab === "Initiated") {
      setVisible(true);
    }
  }, [activeTab]);

  return (
    <>
      <div className="mt-5 mb-5 row">
        <div className="col-md-6">
          <Heading value={"Refund & Return"} />
        </div>
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
            {activeTab === "Pending" && <PendingOrdersTable />}
            {activeTab === "Initiated" && <InitiatedOrdersTable  onClick={() => setVisible(true)} />}
          </div>
        </div>
      </div>

      {/* ✅ Modal opens when "Initiated" is clicked */}
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
