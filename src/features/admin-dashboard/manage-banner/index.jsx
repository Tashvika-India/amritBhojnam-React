import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";  
import { getBannerApi } from "../../../services/adminApiRoutes";
import BannerTable from "./components/BannerTable";
import AddBannerModal from "./components/AddBannerModal";

function ManageBanner() {
  const [visible, setVisible] = useState(false);
  const [banner, setBanner] = useState([]);
  const [editData, setEditData] = useState(null); 

  async function getBanner() {
    try {
      const response = await getBannerApi();
      setBanner(response?.data || []);
    } catch (error) {
      console.log("Error on Category List", error);
    }
  }

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <>
      <div className="mt-3 mb-5 row">
        <div className="col-md-6">
          <Heading value={"Banners"} />
        </div>
        <div className="col-md-6 text-end">
          <YellowButton
            handleClick={() => setVisible(true)}
            lable={"+ Add New Banner"}
          />
        </div>
      </div> 
      <div className="">
        <div className="card">
          <div className="card-body">
            <BannerTable banner={banner} setEditData={setEditData} />
          </div>
        </div>
      </div>
      <AddBannerModal visible={visible} setVisible={setVisible} setBanner={setBanner} editData={editData} />
    </>
  );
}

export default ManageBanner;
