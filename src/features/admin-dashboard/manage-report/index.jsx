import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "../../../components/buttons/YellowButton";
import { Link } from "react-router-dom"; 
import { InputText } from "primereact/inputtext";
import OverviewCardsReport from "./components/OverviewCardsReport"; 
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"; 
import filterIcon from "../../../assets/images/dashboard/filter-icon.png"; 
import ReportTable from "./components/ReportTable";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs'; 
import { DateRangePicker } from "rsuite";


const ManageReport = () => {
  return (
    <>
      <div className="mt-5 mb-4 row">
        <div className="col-md-6">
          <Heading value={"Report"} />
        </div>
        <div className="col-md-2 text-end ms-auto">
          <div style={{ width: "70%" }}>
            <FormControl  sx={{ m: 1 }} fullWidth className="bg-white">
              <InputLabel id="demo-simple-select-label">Today</InputLabel>
              <Select
              autoWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Monthly"
                style={{textAlign: "start"}}
                >
                <MenuItem value={10}>Yesterday</MenuItem>
                <MenuItem value={20}>Tomorrow</MenuItem>
                <MenuItem value={30}>Day After Tomorrow</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        {/* <div className="col-md-3">
          <div>
            <DateRangePicker size="lg" placeholder="Start Date  -  End Date" style={{ fontSize: "1rem" }} />
          </div>
        </div> */}
        <div className="col-md-2 text-end position-relative" style={{width: "10%"}}>
          <Link>
            <YellowButton style={{paddingBlock: "0.4rem"}}  lable={<span><img src={filterIcon} className="img-fluid position-absolute" style={{ top: "1rem", left: "3.5rem" }} /> &nbsp; &nbsp; &nbsp;Filter</span>} />
          </Link>
        </div>
        <div className="col-12 mt-4">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to={"/admin/dashboard"}>Dashboard</Link>
            <Typography className="text-orange">Report</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <div className="row mb-5">
        <OverviewCardsReport />
      </div>
      <div className="">
        <div className="card">
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-5"></div>
              <div className="col-md-2"></div>
              <div className="col-md-2"></div>
              <div className="col-md-3 text-end">
                <InputText className="w-100 ps-4" placeholder="Search...." />
              </div>
            </div>
            <div className="">
              <ReportTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageReport;
