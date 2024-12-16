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

const ManageReport = () => {
  return (
    <>
      <div className="mt-3 mb-5 row">
        <div className="col-md-6">
          <Heading value={"Report"} />
        </div>
        <div className="col-md-1">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-md-3">
        <div>
        <DateRangePicker size="lg" placeholder="Start Date  -  End Date" style={{fontSize: "1rem"}} />
        </div> 
        </div>
        <div className="col-md-2 text-end">
          <Link to="/add-coupon">
            <YellowButton lable={"Filter"} />
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
              <div className="col-md-3">
                <InputText placeholder="Search Product" />
              </div>
            </div>
            <div className="">
              <ProductTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageReport;
