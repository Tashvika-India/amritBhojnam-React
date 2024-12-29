import React, { useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import { TabPanel, TabView } from "primereact/tabview";
import ActiveCustomersTable from "./components/ActiveCustomersTable";
import InactiveCustomersTable from "./components/InactiveCustomersTable";

function AdminCustomer() {
  const [activeTab, setActiveTab] = useState("Active Orders");

  return (
    <>
      <div className="mt-3 mb-5 row">
        <div className="col-md-6">
          <Heading value={"Customer"} />
        </div>
        <div className="col-md-6 text-end">
          <YellowButton lable={"+ Add Customers"} />
        </div>
      </div>
      <div className="">
        <div className="card">
          <div className="card-body">
            <div>
              {/* <TabView>
                <TabPanel header="Active">
               
                </TabPanel>
                <TabPanel header="Inactive">
                  <InactiveCustomersTable/>
                </TabPanel>
              </TabView> */}
               <ActiveCustomersTable/>
            </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default AdminCustomer;
