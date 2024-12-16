import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "../../../components/buttons/YellowButton";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import ProductTable from "../manage-products/product-list/components/ProductTable";
import { InputText } from "primereact/inputtext";
import OverviewCardsSection from "../../admin-dashboard/dashboard-home/components/OverviewCardsSection";
import Loading from "../../../components/ui/Loading";

const ManageReport = () => {

  return (
    <>
      <div className="mt-3 mb-5 row">
        <div className="col-md-6">
          <Heading value={"Report"} />
        </div>
        <div className="col-md-6 text-end">
          <Link to="/add-coupon">
            <YellowButton lable={"+ Add New Coupons"} />
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
                <InputText
                  value={filter.name}
                  onChange={(e)=>setFilter({...filter,name:e.target.value})}
                  placeholder="Search Product" 
                />
              </div>
            </div>
            <div className="">
              {loading ? (
                <Loading />
              ) : (
                <ProductTable
                  products={products}
                  getProductList={getProductList}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageReport;
