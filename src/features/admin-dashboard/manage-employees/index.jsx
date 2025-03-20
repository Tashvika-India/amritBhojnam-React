import React, { useCallback, useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton"; 
import {  getSubCategoriesApi, patchSubCategoriesApi } from "../../../services/adminApiRoutes";
import Loading from "../../../components/ui/Loading";
import CategoriesSubTable from "../manage-sub-categories/components/CategoriesSubTable";
import { debounce } from "@mui/material";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";

function ManageEmployees() {
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');


  async function getCategories() {
    setLoading(true);
    try {
      const response = await getSubCategoriesApi();
      setCategories(response?.data || []);
    } catch (error) {
      console.log("Error on Category List", error);
    } finally {
      setLoading(false);
    }
  }


  const debouncedSearch = useCallback(
    debounce((value) => {
      searchProducts(value); // Call search API after user stops typing
    }, 300),
    [] // Empty dependency array to ensure this is only created once
  );

  // Handle search input change
  const onSearchChange = (e) => {
    const value = e.target.value; // Get value from the search input
    setSearch(value); // Update search state
    debouncedSearch(value); // Trigger the debounced search function
  };

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
      await patchSubCategoriesApi(rowData.id, formData); 
      
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
      <div className="mt-5 mb-5 row">
        <div className="col-md-6">
          <Heading value={"Employees"} />
        </div>
        <div className="col-md-6 text-end">
        <Link to="/admin/add-employee">
          <YellowButton
            handleClick={() => setVisible(true)}
            lable={"+ Add Employee"}
          />
          </Link>
        </div>
      </div>

      <div className="">
        <div className="card">
          <div className="card-body">
          <div className="row mb-3">
              <div className="col-md-5"></div>
              <div className="col-md-2">

              </div>
              <div className="col-md-2">
              </div>
              <div className="col-md-3">
                <InputText
                className="p-2 w-100"
                  value={search} // Bind input value to state
                  onChange={onSearchChange} // Call handler on input change
                  placeholder="Search Product" // Placeholder text
                />
              </div>
            </div>
            {loading ? (
              <Loading />
            ) : (
              <CategoriesSubTable
                categories={categories}
                setEditData={setEditData}
                setVisible={setVisible}
                categoriesStatusChange={categoriesStatusChange} // Pass this function
              />
            )}
          </div>
        </div>
      </div>
      {/* <AddSubCategoryModal
        visible={visible}
        setVisible={setVisible}
        getCategories={getCategories}
        editData={editData}
      /> */}
    </>
  );
}

export default ManageEmployees;
