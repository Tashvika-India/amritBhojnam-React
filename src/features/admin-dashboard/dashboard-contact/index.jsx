import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import { getContactApi } from "../../../services/adminApiRoutes";
import Loading from "../../../components/ui/Loading";
import ContactTable from "./components/ContactTable";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs'; 
import { Link } from "react-router-dom";

function ManageContact() { 
  const [contact, setContact] = useState([]);  
  const [loading, setLoading] = useState(false);

  async function getContact() {
    setLoading(true);
    try {
      const response = await getContactApi();
      setContact(response?.data || []);
    } catch (error) {
      console.log("Error on Category List", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getContact();
  }, []);

  return (
    <>
      <div className="mt-3 mb-4 row">
        <div className="col-md-6">
          <Heading value={"Contact"} />
        </div>
        <div className="col-12 mt-4">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to={"/admin/dashboard"}>Dashboard</Link>
            <Typography className="text-orange">Contact</Typography>
          </Breadcrumbs>
        </div>
      </div>

      <div className="">
        <div className="card">
          <div className="card-body">
            {loading ? (
              <Loading />
            ) : (
              <ContactTable  contact={contact}/>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageContact;
