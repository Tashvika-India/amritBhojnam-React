import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import { getBannerApi, patchBannerApi } from "../../../services/adminApiRoutes";
import BannerTable from "./components/BannerTable";
import AddBannerModal from "./components/AddBannerModal";
import Loading from "../../../components/ui/Loading"; 
import TabsButtons from "../../../components/ui/TabsButton";
import Typography from '@mui/material/Typography';
import { InputText } from "primereact/inputtext";
import Breadcrumbs from '@mui/material/Breadcrumbs'; 
import { Link } from "react-router-dom";

function ManageBanner() {
  const [visible, setVisible] = useState(false);
  const [banner, setBanner] = useState([]);
  const [editData, setEditData] = useState(null); 
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Active");

  async function getBanner() {
    setLoading(true);
    try {
      const response = await getBannerApi();
      const data = response?.data || [];
      
      // Filter banners based on activeTab
      const filteredData = data.filter(
        (item) => item.is_active === (activeTab === "Active")
      );

      setBanner(filteredData);
    } catch (error) {
      console.log("Error on Banner List", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!visible) {
      setEditData(null); 
    }
  }, [visible]);

  useEffect(() => {
    getBanner();
  }, [activeTab]); // Fetch banners when activeTab changes

  async function bannerStatusChange(rowData, updatedIsActive) { 
    try {
      setBanner((prevBanners) =>
        prevBanners.map((banner) =>
          banner.id === rowData.id
            ? { ...banner, is_active: updatedIsActive }
            : banner
        )
      );

      const formData = new FormData();
      formData.append("is_active", updatedIsActive);
      await patchBannerApi(rowData.id, formData);

    } catch (error) {
      setBanner((prevBanners) =>
        prevBanners.map((banner) =>
          banner.id === rowData.id
            ? { ...banner, is_active: !updatedIsActive }
            : banner
        )
      );
      console.log("Error on Banner Status Change", error);
    }
  }

  return (
    <>
      <div className="mt-5 mb-4 row">
        <div className="col-md-6">
          <Heading value={"Banners"} />
        </div>
        <div className="col-md-6 text-end">
          <YellowButton
            handleClick={() => setVisible(true)}
            lable={"+ Add New Banner"}
          />
        </div>
        <div className="col-12 mt-3">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to={"/admin/dashboard"} >
              Dashboard
            </Link>
            <Typography className="text-orange">Banner</Typography>
          </Breadcrumbs>
        </div>
      </div>

      <div className="">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center my-3">
              <div className="col-md-4">
                <div className="mb-3">
                  <TabsButtons
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    labelOne={"Active"}
                    labelTwo={"Inactive"}
                  />
                </div>
              </div>
            </div>
            {loading ? (
              <Loading />
            ) : (
              <BannerTable 
                banner={banner} 
                setEditData={setEditData} 
                setVisible={setVisible}
                bannerStatusChange={bannerStatusChange}
              />
            )}
          </div>
        </div>
      </div>

      <AddBannerModal
        visible={visible}
        setVisible={setVisible} 
        setBanner={setBanner}
        editData={editData}
        getBanner={getBanner}
      />
    </>
  );
}

export default ManageBanner;
