import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import { getBannerApi, patchBannerApi } from "../../../services/adminApiRoutes";
import BannerTable from "./components/BannerTable";
import AddBannerModal from "./components/AddBannerModal";
import Loading from "../../../components/ui/Loading";  
function ManageBanner() {
  const [visible, setVisible] = useState(false);
  const [banner, setBanner] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getBanner() {
    setLoading(true);
    try {
      const response = await getBannerApi();
      setBanner(response?.data || []);
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
  }, []);

  async function bannerStatusChange(rowData, updatedIsActive) { 
    try{
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
      <div className="mt-3 mb-5 row">
        <div className="col-md-6">
          <Heading value={"Banners"} />
        </div>
        <div className="col-md-6 text-end">
          <YellowButton
            handleClick={() => setVisible(true)}
            lable={"+ Add New Information"}
          />
        </div>
      </div>

      <div className="">
        <div className="card">
          <div className="card-body">
            {loading ? (
              <Loading />
            ) : (
              <BannerTable banner={banner} 
              setEditData={setEditData} 
              setVisible={setVisible}
              bannerStatusChange={bannerStatusChange}/>
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
