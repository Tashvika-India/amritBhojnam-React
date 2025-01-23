import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "../../../components/buttons/YellowButton";
import CouponTable from "./components/CouponTable";
import { Link } from "react-router-dom";
import { getCouponApi } from "../../../services/adminApiRoutes";
import Loading from "../../../components/ui/Loading";
import TabsButtons from "../../../components/ui/TabsButton";
import { InputText } from "primereact/inputtext";
import useURLFilters from "../../../custom-compoents/useURLFilters";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs'; 

const AdminCoupon = () => {
  const [filter, setFilter] = useURLFilters([]);
  const [loding, setLoding] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [activeTab, setActiveTab] = useState("Active Orders");
  const getCoupons = async () => {
    setLoding(true);
    try {
      const response = await getCouponApi();
      setCoupons(response?.data);
      setLoding(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCoupons();
  }, []);

  return (
    <>
      <div className="mt-3 mb-4 row">
        <div className="col-md-6">
          <Heading value={"Coupons"} />
        </div>
        <div className="col-md-6 text-end">
          <Link to="/admin/add-coupon">
            <YellowButton lable={"+ Add New Coupons"} />
          </Link>
        </div>
        <div className="col-12 mt-3">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to={"/admin/dashboard"}>Dashboard</Link>
            <Typography className="text-orange">Coupon</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <div className="">
        <div className="card">
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-5">
                <div>
                  <div className="mb-3">
                    {/* <TabsButtons
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                      labelOne={"Active"}
                      labelTwo={"Inactive"}
                    /> */}
                  </div>
                  {/* {activeTab === "Active Orders" && <ProductTable />}
                  {activeTab === "New Orders" && <ProductTable />} */}
                </div>
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-3"></div>
              <div className="col-md-3 ms-auto text-end">
                <InputText
                  className="w-100"
                  value={filter.name}
                  onChange={(e) =>
                    setFilter({ ...filter, name: e.target.value })
                  }
                  placeholder="Search Coupon"
                />
              </div>
            </div>
            <div>
              {loding ? <Loading /> : <CouponTable coupons={coupons} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCoupon;
