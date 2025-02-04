import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import Loading from "../../../components/ui/Loading";
import TabsButtons from "../../../components/ui/TabsButton";
import { InputText } from "primereact/inputtext";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from "react-router-dom";
import NotificationTable from "./components/NotificationTable";


function ManageNotifications() {
     const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="mt-5 mb-4 row">
        <div className="col-md-6">
          <Heading value={"Notifications"} />
        </div>
        <div className="col-md-6 text-end">
         
        </div>
        <div className="col-12 mt-3">
          <Breadcrumbs aria-label="breadcrumb">
           <Link to={"/admin/dashboard"} >
                        Dashboard
                      </Link>
            <Typography className="text-orange">Notifications</Typography>
          </Breadcrumbs>
        </div>
      </div>

      <div className="">
        <div className="card">
          <div className="card-body">
          <div className="d-flex justify-content-between align-items-center py-2">
            <p className="fb-fs-18 fw-bold text-dark-grey">Notification(2)</p>
            <p className="text-orange fw-500">Mark all as read</p>
          </div>
            { loading ? ( <Loading />) :  <NotificationTable /> }
          </div>
        </div>
      </div>
      
    </>
  );
}

export default ManageNotifications;
