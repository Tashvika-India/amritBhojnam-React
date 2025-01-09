import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import CategoriesTable from "./components/CategoriesTable";
import AddCategoryModal from "./components/AddCategoryModal";
import { getAdminCategoriesApi, getCategoriesApi, patchCategoriesApi } from "../../../services/adminApiRoutes";
import Loading from "../../../components/ui/Loading";
import TabsButtons from "../../../components/ui/TabsButton";
import { InputText } from "primereact/inputtext";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';


function ManageCategories() {
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editData, setEditData] = useState(null);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Active");

  async function getCategories() {
    setLoading(true);
    try {
      const response = await getAdminCategoriesApi(filter.category_name || "");
      const data = response?.data || [];
      const filteredData = data.filter(
        (item) => item.is_active === (activeTab === "Active")
      );
      setCategories(filteredData);
    } catch (error) {
      console.error("Error on Category List:", error);
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
    getCategories();
  }, [activeTab, filter.category_name]);


  // This function will update the category status in real-time
  async function categoriesStatusChange(rowData, updatedIsActive) {
    try {
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === rowData.id
            ? { ...category, is_active: updatedIsActive }
            : category
        )
      );
      const formData = new FormData();
      formData.append("is_active", updatedIsActive);
      await patchCategoriesApi(rowData.id, formData);

    } catch (error) {
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === rowData.id
            ? { ...category, is_active: !updatedIsActive }
            : category
        )
      );
      console.error("Failed to update category status!", error);
    }
  }


  return (
    <>
      <div className="mt-3 mb-4 row">
        <div className="col-md-6">
          <Heading value={"Categories"} />
        </div>
        <div className="col-md-6 text-end">
          <YellowButton
            handleClick={() => setVisible(true)}
            lable={"+ Add New Category"}
          />
        </div>
        <div className="col-12 mt-3">
          <Breadcrumbs aria-label="breadcrumb">
            <Typography className="text-black">Category</Typography>
            <Typography className="text-orange">Categorie list</Typography>
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
              <div className="col-md-3 ms-auto text-end">
                <InputText
                  className="w-100 ps-4"
                  sx={{ fontFamily: "Poppins, sans-serif" }}
                  value={filter.category_name || ""}
                  onChange={(e) =>
                    setFilter({ ...filter, category_name: e.target.value })
                  }
                  placeholder="Search Categories"
                />
              </div>
            </div>
            {loading ? (
              <Loading />
            ) : (
              <CategoriesTable
                categories={categories}
                setEditData={setEditData}
                setVisible={setVisible}
                categoriesStatusChange={categoriesStatusChange} // Pass this function
              />
            )}
          </div>
        </div>
      </div>
      <AddCategoryModal
        visible={visible}
        setVisible={setVisible}
        getCategories={getCategories}
        editData={editData}
      />
    </>
  );
}

export default ManageCategories;
