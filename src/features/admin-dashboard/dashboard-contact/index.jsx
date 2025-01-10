import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import { getCategoriesApi, patchCategoriesApi } from "../../../services/adminApiRoutes";
import Loading from "../../../components/ui/Loading";
import ContactTable from "./components/ContactTable";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs'; 
import { Link } from "react-router-dom";

function ManageContact() {
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);

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
      <div className="mt-3 mb-4 row">
        <div className="col-md-6">
          <Heading value={"Contact"} />
        </div>
        <div className="col-md-6 text-end">
          <YellowButton
            handleClick={() => setVisible(true)}
            lable={"+ Add New Contact"}
          />
        </div>
        <div className="col-12 mt-4">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to={"/admin/dashboard"}>Dashboard</Link>
            <Typography className="text-orange">Contact</Typography>
          </Breadcrumbs>
        </div>
      </div>

      <div className="">
        <div className="card">
          <div className="card-body">
            {loading ? (
              <Loading />
            ) : (
              <ContactTable
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageContact;
