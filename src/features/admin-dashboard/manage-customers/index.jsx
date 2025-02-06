import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import { TabPanel, TabView } from "primereact/tabview";
import ActiveCustomersTable from "./components/ActiveCustomersTable";
import InactiveCustomersTable from "./components/InactiveCustomersTable";
import { getProfile } from "../../../services/adminApiRoutes";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs'; 
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";

function AdminCustomer() {
  const [customer, setCustomer] = useState([]);
  const [filter, setFilter] = useState("");

  const getCustomerDetail = async () => {
    try {
      const response = await getProfile();
      setCustomer(response?.data || []);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    getCustomerDetail();
  }, []);

  // Filter customers based on search input
  const filteredCustomers = customer.filter((cust) =>
    cust.full_name?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <div className="mt-5 mb-4 row">
        <div className="col-md-6">
          <Heading value={"Customer"} />
        </div>
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
            <div className="d-flex justify-content-between align-items-center my-3">
              <div className="col-md-3 ms-auto text-end">
                <InputText
                  className="w-100 ps-4"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Search by name"
                />
              </div>
            </div>
            <ActiveCustomersTable customer={filteredCustomers} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCustomer;
