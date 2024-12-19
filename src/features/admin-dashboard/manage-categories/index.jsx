import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import CategoriesTable from "./components/CategoriesTable";
import AddCategoryModal from "./components/AddCategoryModal";
import { getCategoriesApi, patchCategoriesApi } from "../../../services/adminApiRoutes";
import Loading from "../../../components/ui/Loading";
import TabsButtons from "../../../components/ui/TabsButton";
import { InputText } from "primereact/inputtext";
import useURLFilters from "../../../custom-compoents/useURLFilters";

function ManageCategories() {
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editData, setEditData] = useState(null);
  const [filter, setFilter] = useURLFilters([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Active Orders");

  async function getCategories() {
    setLoading(true);
    try {
      const response = await getCategoriesApi();
      setCategories(response?.data || []);
    } catch (error) {
      console.log("Error on Category List", error);
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
  }, []);

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
      <div className="mt-3 mb-5 row">
        <div className="col-md-6">
          <Heading value={"Categories"} />
        </div>
        <div className="col-md-6 text-end">
          <YellowButton
            handleClick={() => setVisible(true)}
            lable={"+ Add New Category"}
          />
        </div>
      </div>

      <div className="">
        <div className="card">
          <div className="card-body">
          <div className="row mb-3">
              <div className="col-md-4">
                <div>
                  <div className="mb-3">
                    <TabsButtons
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                      labelOne={"Active Orders"}
                      labelTwo={"New Orders"}
                    />
                  </div>
                  {/* {activeTab === "Active Orders" && <ProductTable />}
                  {activeTab === "New Orders" && <ProductTable />} */}
                </div>
              </div>
              <div className="col-md-2">
              </div>
              <div className="col-md-2 text-end">
              </div>
              <div className="col-md-3 ms-auto text-end">
                <InputText
                className="w-100"
                  value={filter.name}
                  onChange={(e) =>
                    setFilter({ ...filter, name: e.target.value })
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
