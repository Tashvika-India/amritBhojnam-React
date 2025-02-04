import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import { TabPanel, TabView } from "primereact/tabview";
import ActiveCustomersTable from "./components/ActiveCustomersTable";
import InactiveCustomersTable from "./components/InactiveCustomersTable";
import { getProfile } from "../../../services/adminApiRoutes";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs'; 
import { Link } from "react-router-dom";

function AdminCustomer() {
  const [activeTab, setActiveTab] = useState("Active Orders");
  const [customer, setCustomer] = useState([]);

  

  const getCustomerDetail = async () => {
    try {
      const response = await getProfile();
      setCustomer(response?.data || {});
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    getCustomerDetail();
  }, []);

  return (
    <>
      <div className="mt-5 mb-4 row">
        <div className="col-md-6">
          <Heading value={"Customer"} />
        </div>
        {/* <div className="col-md-6 text-end">
          <YellowButton lable={"+ Add Customers"} />
        </div> */}
        <div className="col-12 mt-4">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to={"/admin/dashboard"}>Dashboard</Link>
            <Typography className="text-orange">Customer</Typography>
          </Breadcrumbs>
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
              <ActiveCustomersTable customer={customer} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCustomer;
