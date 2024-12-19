import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "../../../components/buttons/YellowButton";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import ProductTable from "../manage-products/product-list/components/ProductTable";
import { InputText } from "primereact/inputtext";
import OverviewCardsSection from "../../admin-dashboard/dashboard-home/components/OverviewCardsSection";
import Loading from "../../../components/ui/Loading";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"; 
import { DateRangePicker } from 'rsuite';
import filterIcon from "../../../assets/images/dashboard/filter-icon.png";
import { VscSettings } from "react-icons/vsc";
import ReportTable from "./components/ReportTable";


const ManageReport = () => {
  return (
    <>
      <div className="mt-3 mb-5 row">
        <div className="col-md-6">
          <Heading value={"Report"} />
        </div>
        <div className="col-md-2 text-end">
         <div style={{ width: "70%" }}>
                        <FormControl fullWidth w-50 className="bg-white">
                          <InputLabel id="demo-simple-select-label" size="small">Today</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Monthly"
                            size="small">
                            <MenuItem value={10}>Yesterday</MenuItem>
                            <MenuItem value={20}>Tomorrow</MenuItem>
                            <MenuItem value={30}>Day After Tomorrow</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
        </div>
        <div className="col-md-3 text-end">
        {/* <div>
        <DateRangePicker size="lg" placeholder="Start Date  -  End Date" style={{fontSize: "1rem"}} />
        </div>  */}
        </div>
        <div className="col-md-1 text-end position-relative">
          <Link to="/add-coupon">
          

            <YellowButton lable={<span><img src={filterIcon} className="img-fluid position-absolute" style={{top: "1rem", left: "2rem"}}/> &nbsp; &nbsp; &nbsp;Filter</span>}/>
          </Link>
        </div>
      </div>
      <div className="row mb-5">
        <OverviewCardsSection />
      </div>
      <div className="">
        <div className="card">
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-5"></div>
              <div className="col-md-2"></div>
              <div className="col-md-2"></div>
              <div className="col-md-3 text-end">
                <InputText className="w-100" placeholder="Search...." />
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
